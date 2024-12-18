import {PlusOutlined} from '@ant-design/icons';
import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {PageContainer, ProTable} from '@ant-design/pro-components';
import '@umijs/max';
import {Button, message, Popconfirm, Space, Tag, Typography} from 'antd';
import React, {useEffect, useRef, useState} from 'react';
import CreateModal from "@/pages/Appts/Template/components/CreateModal";
import UpdateModal from "@/pages/Appts/Template/components/UpdateModal";
import InfoModal from "@/pages/Appts/Template/components/InfoModal";
import {deleteTemplateUsingGet, listTemplatePageUsingPost} from "@/services/swagger/templateController";
import {listRoomAllUsingGet} from "@/services/swagger/roomController";
import CreateSource from "@/pages/Appts/Template/components/CreateSource";

/**
 * 用户管理页面
 *
 * @constructor
 */
const UserAdminPage: React.FC = () => {
  // 是否显示新建窗口
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  // 是否显示更新窗口
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  //详情窗口
  const [infoModalVisible, setInfoModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  // 当前用户点击的数据
  const [currentRow, setCurrentRow] = useState<API.RoomUpdateRequest>();
  //生成号源模态框
  const [createSoucceModalVisible, setCreateSourceModalVisible] = useState<boolean>(false);
  //查询全部输液室
  const [allRoom, setAllRoom] = useState<API.RoomVO[]>([])

  //初始获取输液室列表
  useEffect(() => {
    listRoomAllUsingGet().then(res => {
      if (res.data) {
        setAllRoom(res.data)
      } else {
        setAllRoom([])
      }
    })
  }, [])

  /**
   * 删除节点
   *
   * @param row
   */
  const handleDelete = async (row: API.TemplateVO) => {
    const hide = message.loading('正在删除');
    if (!row) return true;
    try {
      await deleteTemplateUsingGet({
        id: row.id as any,
      });
      hide();
      message.success('删除成功');
      actionRef?.current?.reload();
      return true;
    } catch (error: any) {
      hide();
      message.error('删除失败，' + error.message);
      return false;
    }
  };

  /**
   * 表格列配置
   */
  const columns: ProColumns<API.TemplateVO>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      valueType: 'text',
      hideInForm: true,
      hideInSearch: true,
      hideInTable: true
    },
    {
      title: '开始时间',
      dataIndex: 'startTime',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '输液室名称',
      dataIndex: 'irId',
      valueType: 'select',
      fieldProps: {
        options: allRoom.map(item => ({
          label: item.irName,
          value: item.id
        })),
      },
      render: (_, record) => (
        <Tag color={'blue'}>
          {allRoom?.find(item => item.id === record.irId)?.irName}
        </Tag>
      ),
    },
    {
      title: '可接待患者类型',
      dataIndex: 'patType',
      valueType: 'text',
      hideInSearch: true,
      valueEnum: {
        0: {
          text: '急诊',
          status: 'Success',
        },
        1: {
          text: '门诊',
          status: 'Error',
        },
      },
    },

    {
      title: '正常号源总量',
      dataIndex: 'normalNum',
      hideInSearch: true,
      render: (_, record) => (
        <Tag color={'blue'}>{record.normalNum}</Tag>
      )
    },
    {
      title: '临时号源总量',
      dataIndex: 'tempNum',
      hideInSearch: true,
      render: (_, record) => (
        <Tag color={'blue'}>{record.tempNum}</Tag>
      )
    },
    {
      title: '创建时间',
      sorter: true,
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 240,
      render: (_, record) => (
        <Space size="middle">
          <Typography.Link
            onClick={() => {
              setCurrentRow(record);
              setUpdateModalVisible(true);
            }}
          >
            修改
          </Typography.Link>
          <Popconfirm
            title="删除输液室"
            description="确认删除该输液室？"
            onConfirm={() => handleDelete(record)}
            onCancel={() => message.info('取消删除')}
            okText="是"
            cancelText="否"
          >
            <Typography.Link type="danger">
              删除
            </Typography.Link>
          </Popconfirm>

        </Space>
      ),
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.TemplateVO>
        headerTitle={'查询表格'}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: "auto",
          span: 6,
        }}
        toolBarRender={() => [
          <Button
            color={'#1890ff'}
            key="primary"
            onClick={() => {
              setCreateSourceModalVisible(true);
            }}
          >
            <PlusOutlined/> 生成号源
          </Button>,
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setCreateModalVisible(true);
            }}
          >
            <PlusOutlined/> 新建模板
          </Button>,

        ]}
        request={async (params, sort, filter) => {
          const sortField = Object.keys(sort)?.[0];
          const sortOrder = sort?.[sortField] ?? undefined;

          const {data, code} = await listTemplatePageUsingPost({
            ...params,
            sortField,
            sortOrder,
            ...filter,
          } as API.TemplateQueryRequest);
          return {
            success: code === 0,
            data: data?.list || [],
            total: Number(data?.total) || 0,
          };
        }}
        columns={columns}
      />
      <CreateModal
        visible={createModalVisible}
        onSubmit={() => {
          setCreateModalVisible(false);
          actionRef.current?.reload();
        }}
        onCancel={() => {
          setCreateModalVisible(false);
        }}
      />
      <UpdateModal
        visible={updateModalVisible}
        oldData={currentRow}
        onSubmit={() => {
          setUpdateModalVisible(false);
          setCurrentRow(undefined);
          actionRef.current?.reload();
        }}
        onCancel={() => {
          setUpdateModalVisible(false);
        }}
      />
      <InfoModal
        visible={infoModalVisible}
        oldData={currentRow}
        onCancel={() => {
          setInfoModalVisible(false);
        }}
      />
      <CreateSource
        visible={createSoucceModalVisible}
        onSubmit={() => {
          setCreateSourceModalVisible(false);
          actionRef.current?.reload();
        }}
        onCancel={() => {
          setCreateSourceModalVisible(false);
        }}
      />
    </PageContainer>
  );
};
export default UserAdminPage;
