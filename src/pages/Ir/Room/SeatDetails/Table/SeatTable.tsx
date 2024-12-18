import {PlusOutlined} from '@ant-design/icons';
import {ActionType, ProColumns, ProTable} from '@ant-design/pro-components';
import '@umijs/max';
import {Button, message, Popconfirm, Space, Tag, Typography} from 'antd';
import React, {useRef, useState} from 'react';

import {useLocation} from "@umijs/max";
import {deleteSeatUsingGet, listSeatPageUsingPost} from "@/services/swagger/seatController";
import InfoModal from "@/pages/Ir/Room/SeatDetails/components/InfoModal";
import UpdateModal from "@/pages/Ir/Room/SeatDetails/components/UpdateModal";
import CreateModal from "@/pages/Ir/Room/SeatDetails/components/CreateModal";

/**
 * 用户管理页面
 *
 * @constructor
 */
const SeatTable: React.FC = () => {
  // 是否显示新建窗口
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  // 是否显示更新窗口
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  //详情窗口
  const [infoModalVisible, setInfoModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  // 当前用户点击的数据
  const [currentRow, setCurrentRow] = useState<API.SeatVO>();
  const location = useLocation()
  const state = location.state as { id: number };


  /**
   * 删除节点
   *
   * @param row
   */
  const handleDelete = async (row: API.SeatVO) => {
    const hide = message.loading('正在删除');
    if (!row) return true;
    try {
      await deleteSeatUsingGet({
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
  const columns: ProColumns<API.SeatVO>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      valueType: 'text',
      hideInForm: true,
      hideInSearch: true,
      hideInTable: true
    },

    {
      title: '座位号',
      dataIndex: 'seatNumber',
      valueType: 'text',
      render: (_, record) =>
        <Typography.Link
          onClick={() => {
            setCurrentRow(record);
            setInfoModalVisible(true)
          }}
        >
          {record.seatNumber}
        </Typography.Link>
    },
    {
      title: '可接待患者类型',
      dataIndex: 'patType',
      valueType: 'text',
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
      title: '输液室状态',
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
      title: '区域',
      sorter: true,
      dataIndex: 'area',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '标签',
      sorter: true,
      dataIndex: 'flag',
      hideInSearch: true,
      hideInForm: true,
      render: (_, record) => (
        <Tag color={record.flag === 'vip' ? 'blue' : record.flag === 'common' ? 'green' : 'yellow'}>
          {record.flag === 'vip' ? 'VIP' : record.flag === 'common' ? '普通' : '床位'}
        </Tag>
      )
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
    <>
      <ProTable<API.SeatVO>
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
          const {data, code} = await listSeatPageUsingPost({
            ...params,
            sortField,
            sortOrder,
            ...filter,
            irId: state.id
          } as API.SeatQueryRequest);
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
    </>
  );
};
export default SeatTable;
