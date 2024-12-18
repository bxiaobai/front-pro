import {PlusOutlined} from '@ant-design/icons';
import type {ActionType, ProColumns, ProFormInstance} from '@ant-design/pro-components';
import {PageContainer, ProTable} from '@ant-design/pro-components';
import '@umijs/max';
import {Button, message, Popconfirm, Popover, Space, Tag, Typography} from 'antd';
import React, {useEffect, useRef, useState} from 'react';
import CreateModal from "@/pages/Appts/Template/components/CreateModal";
import UpdateModal from "@/pages/Appts/Template/components/UpdateModal";
import InfoModal from "@/pages/Appts/Template/components/InfoModal";
import {deleteTemplateUsingGet} from "@/services/swagger/templateController";
import {listRoomAllUsingGet} from "@/services/swagger/roomController";
import CreateSource from "@/pages/Appts/Template/components/CreateSource";
import {listDetailsPageUsingPost, removeDetailsUsingGet} from "@/services/swagger/detailsController";
import {history} from "@umijs/max";
import {formatDateToYYYYMMDD} from "@/utils/date";

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
  //from变得那
  const formRef = useRef<ProFormInstance>();
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
   * @param row
   */
  const handleDelete = async (row: API.DetailsVO) => {
    const hide = message.loading('正在删除');
    if (!row) return true;
    try {
      await removeDetailsUsingGet({
        id: row.id as any,
      });
      hide();
      message.success('取消成功');
      actionRef?.current?.reload();
      return true;
    } catch (error: any) {
      hide();
      message.error('取消失败，' + error.message);
      return false;
    }
  };

  /**
   * 表格列配置
   */
  const columns: ProColumns<API.DetailsVO>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      valueType: 'text',
      hideInForm: true,
      hideInSearch: true,
      hideInTable: true
    },
    {
      title: '患者姓名',
      dataIndex: 'patName',
      order: 1,
      width: 100,
      fixed: 'left',
    },
    {
      title: '卡号',
      dataIndex: 'card',
      order: 2,
      width: 100,
      //展示？

      fixed: 'left',
    },
    {
      title: '预约日期',
      dataIndex: 'date',
      valueType: 'date',
      //默认获取转换时间
      initialValue: formatDateToYYYYMMDD(new Date()),
      fieldProps: {
        format: 'YYYY-MM-DD',
        onChange: (date: any, dateString: any) => {
          formRef.current?.setFieldValue("date", dateString)
          actionRef.current?.reload()
        }
      },
      order: 3,
      width: 100,
      fixed: 'left',
    },
    {
      title: '医生登记时间',
      sorter: true,
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInSearch: true,
      hideInForm: true,
      fixed: 'left',
      width: 150
    },
    {
      title: '预约时间',
      dataIndex: 'time',
      valueType: 'dateTime',
      hideInSearch: true,
      //排序为第一个
      render: (_, record) => (
        <Tag color={'blue'}>{record?.time?.split(",")[0]}</Tag>
      ),
      fixed: 'left',
      width: 100
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
        <span>
          {allRoom?.find(item => item.id === record.irId)?.irName}
        </span>
      ),
      width: 150
    },
    {
      title: '座位号',
      dataIndex: 'seatNum',
      hideInSearch: true,
      fixed: 'left',
      render: (_, record) => (
        <Tag color={record.seatNum ? 'green' : 'red'}>{record.seatNum ? record.seatNum : '未分配座位'}</Tag>
      ),
      width: 100
    },
    {
      title: '状态',
      sorter: true,
      dataIndex: 'status',
      valueType: 'select',
      fixed: 'left',
      valueEnum: {
        //   状态(0未分配座位,1已分配座位,2已完成,3进行中)
        0: {
          text: '已预约',
          status: 'Success',
        },
        1: {
          text: '已到诊',
          status: 'Success',
        },
        2: {
          text: '已提交药品',
          status: 'Success',
        },
        3: {
          text: '已保存药品',
          status: 'Success',
        },
        4: {
          text: '进行中',
          status: 'Processing',
        },
        5: {
          text: '已完成',
          status: 'Success',
        },
        6: {
          text: '已取消',
          status: 'Error',
        },
      },
      hideInForm: true,
      width: 100
    },
    {
      title: '操作',
      dataIndex: 'option',
      width: 300,
      fixed: 'right',
      valueType: 'option',
      render: (_, record) => (
        <Space size="middle">
          {/*如果状态等于0显示预约*/}
          {record.status === 0 ? (
            <Typography.Link
              onClick={() => {
                history.push(`/list/add `, {id: record.id});
              }}
            >
              预约
            </Typography.Link>
          ) : <></>}
          {record.status === 1 ? (
            <Popover
              content={'到诊后显示打印按钮'}
              placement="top"
            >
              <Typography.Link
                onClick={() => {
                  history.push(`/appointment/list/scale/` + record.id);
                }}
              >
                打印
              </Typography.Link>
            </Popover>
          ) : <></>}
          <Typography.Link
            onClick={() => {
              history.push(`/appointment/list/scale/` + record.id);
            }}
          >
            筛查
          </Typography.Link>
          <Typography.Link
            onClick={() => {
              setCurrentRow(record);
              setUpdateModalVisible(true);
            }}
          >
            分配座位
          </Typography.Link>
          {record.status !== 1 || 4 || 5 || 6 || 7 ? (
            <Popconfirm
              title="取消预约？"
              description="确认取消预约？"
              onConfirm={() => handleDelete(record)}
              onCancel={() => message.info('取消操作')}
              okText="是"
              cancelText="否"
            >
              <Typography.Link type="danger">
                取消
              </Typography.Link>
            </Popconfirm>
          ) : <></>}


        </Space>
      ),
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.DetailsVO>
        headerTitle={'预约列表'}
        actionRef={actionRef}
        rowKey="id"

        formRef={formRef}
        search={{
          span: 6,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              history.push('/list/add')
            }}
          >
            <PlusOutlined/> 新建预约
          </Button>,

        ]}
        scroll={{x: 'max-content'}}
        request={async (params, sort, filter) => {
          const sortField = Object.keys(sort)?.[0];
          const sortOrder = sort?.[sortField] ?? undefined;
          const {data, code} = await listDetailsPageUsingPost({
            ...params,
            sortField,
            sortOrder,
            ...filter,
            date: formRef.current?.getFieldValue("date")
          } as API.DetailsQueryRequest);
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
