import {PlusOutlined} from '@ant-design/icons';
import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {PageContainer, ProTable} from '@ant-design/pro-components';
import '@umijs/max';
import {Button, message, Popconfirm, Space, Tag, Typography} from 'antd';
import React, {useRef, useState} from 'react';
import {deleteDictTypeUsingGet, listDictTypePageUsingPost} from "@/services/swagger/dictTypeController";
import CreateModal from "@/pages/System/Dict/components/CreateModal";
import UpdateModal from "@/pages/System/Dict/components/UpdateModal";

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
  const actionRef = useRef<ActionType>();
  // 当前用户点击的数据
  const [currentRow, setCurrentRow] = useState<API.DictTypeUpdateRequest>();

  /**
   * 删除节点
   *
   * @param row
   */
  const handleDelete = async (row: API.DictTypeVO) => {
    const hide = message.loading('正在删除');
    if (!row) return true;
    try {
      await deleteDictTypeUsingGet({
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
  const columns: ProColumns<API.DictTypeVO>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      valueType: 'text',
      hideInForm: true,
      hideInSearch: true,
      hideInTable: true
    },

    {
      title: '字典名称',
      dataIndex: 'dictName',
      valueType: 'text',
    },
    {
      title: '字典类型',
      dataIndex: 'dictType',
      valueType: 'text',
    },
    {
      title: '字典状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: {
        0: {
          text: '正常',
          status: 'Success',
        },
        1: {
          text: '禁用',
          status: 'Error',
        },
      },
      render: (_, record) => (
        <Space>
          <Tag color={record.status === 0 ? 'blue' : 'red'}>
            {record.status === 0 ? '启用' : '禁用'}
          </Tag>
        </Space>
      ),
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
            数据
          </Typography.Link>
          <Typography.Link
            onClick={() => {
              setCurrentRow(record);
              setUpdateModalVisible(true);
            }}
          >
            修改
          </Typography.Link>
          <Popconfirm
            title="删除字典"
            description="确认删除该字典？"
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
      <ProTable<API.User>
        headerTitle={'查询表格'}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: "auto",
          span: 6,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setCreateModalVisible(true);
            }}
          >
            <PlusOutlined/> 新建
          </Button>,
        ]}
        request={async (params, sort, filter) => {
          const sortField = Object.keys(sort)?.[0];
          const sortOrder = sort?.[sortField] ?? undefined;

          const {data, code} = await listDictTypePageUsingPost({
            ...params,
            sortField,
            sortOrder,
            ...filter,
          } as API.UserQueryRequest);
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
    </PageContainer>
  );
};
export default UserAdminPage;