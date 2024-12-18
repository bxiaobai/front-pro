import {type ActionType, ModalForm, ProColumns, ProFormSelect, ProTable} from '@ant-design/pro-components';
import '@umijs/max';
import {Button, message, Popconfirm, Space, Tag, Typography} from 'antd';
import React, {useRef, useState} from 'react';
import {addDeptRoomUsingPost, deleteDeptRoomUsingGet} from "@/services/swagger/deptController";
import {listByDeptIdUsableUsingGet, listDeptDockerUsingGet} from "@/services/swagger/roomController";
import {PlusOutlined} from "@ant-design/icons";

interface Props {
  visible: boolean;
  onCancel: () => void;
  deptId: number
}

/**
 * 创建弹窗
 * @param props
 * @constructor
 */
const CreateModal: React.FC<Props> = (props) => {
  const {visible, onCancel, deptId} = props;
  const actionRef = useRef<ActionType>();
  const [addRoomModal, setAddRoomModal] = useState<boolean>(false)
  const columns: ProColumns<API.RoomVO>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      valueType: 'text',
      hideInForm: true,
      hideInSearch: true,
      hideInTable: true
    },
    {
      title: '输液室名称',
      dataIndex: 'irName',
      copyable: true,
      ellipsis: true,
      tooltip: '标题过长会自动收缩',
      render: (_, record) => (
        <Space>
          <Tag color={'blue'}>
            {record.irName}
          </Tag>
        </Space>
      ),
    },

    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record) => [
        <Popconfirm
          title="删除输液室"
          key={record.id}
          description="确认删除改输液室？"
          onConfirm={async () => {
            const res = await deleteDeptRoomUsingGet({roomId: record.id as number, deptId: deptId})
            if (res.code === 0) {
              message.success('删除成功');
              actionRef.current?.reload()
            }
          }}
          onCancel={() => message.info('取消删除')}
          okText="是"
          cancelText="否"
        >
          <Typography.Link type="danger">
            删除
          </Typography.Link>
        </Popconfirm>
      ],
    },
  ];

  //初始化输液室内容
  return (
    <ModalForm<{
      name: string;
      company: string;
    }>
      title="分配输液室"
      open={visible}
      modalProps={{
        destroyOnClose: true,
        onCancel: () => onCancel?.(),
      }}
      submitTimeout={2000}
      onFinish={async () => {
        onCancel?.()
      }}
    >
      <ProTable<API.RoomVO>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async () => {
          const res = await listDeptDockerUsingGet({deptId: deptId})
          return {
            data: res?.data ?? [],
            success: res?.code === 0,
          }
        }}
        editable={{
          type: 'multiple',
        }}
        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
          defaultValue: {
            option: {fixed: 'right', disable: true},
          },
          onChange(value) {
            console.log('value: ', value);
          },
        }}
        rowKey="id"
        search={false}
        pagination={{
          pageSize: 5,
          onChange: (page) => console.log(page),
        }}
        options={false}
        dateFormatter="string"
        headerTitle="可用输液室"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined/>}
            onClick={() => {
              setAddRoomModal(true)
            }}
            type="primary"
          >
            添加输液室
          </Button>,
        ]}
      />
      <ModalForm<API.RoomVO>
        title="选择输液室"
        width={'600px'}
        open={addRoomModal}
        autoFocusFirstInput
        modalProps={{
          destroyOnClose: true,
          onCancel: () => setAddRoomModal(false),
        }}
        onFinish={async (values) => {
          const res = await addDeptRoomUsingPost({
            deptId: deptId,
            roomId: [values.id as number]
          })
          if (res.code === 0) {
            message.success('添加成功');
            setAddRoomModal(false)
          }
          actionRef.current?.reload()
          return true;
        }}
      >
        <ProFormSelect
          name="id"
          label="选择输液室"
          request={async () => {
            const res = await listByDeptIdUsableUsingGet({deptId: deptId});
            // 确保 res.data 不为 undefined，并且正确映射 label 和 value
            return (res.data || []).map(item => ({
              label: item.irName || '', // 确保 label 是字符串
              value: item.id || 0,      // 确保 value 是数字
            }));
          }}
          placeholder="选择输液室"
        />

      </ModalForm>
    </ModalForm>
  );
};
export default CreateModal;
