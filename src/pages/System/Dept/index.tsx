import {PlusOutlined} from '@ant-design/icons';
import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {PageContainer, ProTable} from '@ant-design/pro-components';
import '@umijs/max';
import {Button, Flex, message, Popconfirm, Space, Tag, Typography} from 'antd';
import React, {useEffect, useRef, useState} from 'react';
import useStyle from "@/pages/System/Dept/index.style";
import {
  deleteDeptUsingGet,
  listDeptPageUsingPost,
  listDeptTreeCourtyardUsingGet
} from "@/services/swagger/deptController";
import UpdateModal from "@/pages/System/Dept/components/UpdateModal";
import CreateModal from "@/pages/System/Dept/components/CreateModal";
import CreateRoomModal from "@/pages/System/Dept/components/CreateRoomModal";

/**
 * 用户管理页面
 *
 * @constructor
 */
const DeptVOAdminPage: React.FC = () => {
  // 是否显示新建窗口
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  // 是否显示更新窗口
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  //分配输液室窗口
  const [addRoomModalVisible, setAddRoomModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  // 当前用户点击的数据
  const [currentRow, setCurrentRow] = useState<API.DeptUpdateRequest>();
  //样式
  const {styles} = useStyle();
  //院区列表
  const [courtyard, setCourtyard] = useState<API.DeptTreeVO[]>([]);
  // 选中的项目
  const [selectedItem, setSelectedItem] = useState<number>(101);
  //获取院区列表

  const fetchData = async () => {
    try {
      const res = await listDeptTreeCourtyardUsingGet();
      setCourtyard(res.data ?? [])
    } catch (error: any) {
      message.error('获取数据失败，' + error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [])
  /**
   * 删除节点
   *
   * @param row
   */
  const handleDelete = async (row: API.DeptVO) => {
    const hide = message.loading('正在删除');
    if (!row) return true;
    try {
      await deleteDeptUsingGet({
        id: row.id as any,
      });
      hide();
      message.success('删除成功');
      actionRef?.current?.reload();
      fetchData()
      return true;
    } catch (error: any) {
      hide();
      message.error('删除失败，' + error.message);
      return false;
    }
  };
  //单机事件
  // 处理单击事件
  const handleItemClick = (value: number) => {
    setSelectedItem(value);
    actionRef?.current?.reload(); // 触发表格重新加载
  };
  /**
   * 表格列配置
   */
  const columns: ProColumns<API.DeptVO>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      valueType: 'text',
      hideInForm: true,
      hideInSearch: true,
      hideInTable: true
    },

    {
      title: '科室名称',
      dataIndex: 'deptName',
      valueType: 'text',
    },
    {
      title: '所属院区',
      dataIndex: 'parentId',
      valueType: 'text',
    },
    {
      title: '科室状态',
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
            {record.status === 0 ? '正常' : '禁用'}
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
              setAddRoomModalVisible(true);
            }}
          >
            分配输液室
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
            title="删除科室"
            description="确认删除该科室？"
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
      <Flex gap="middle" justify="space-between">
        <div className={styles.left}>
          <Flex vertical>
            {courtyard.map((item) => (
              <div key={item.value}>
                <div className={styles.title}>所有院区</div>
                {item?.children?.map((item2) => (
                  <Flex
                    key={item2.value}
                    className={`${styles.menuItem} ${Number(selectedItem) === Number(item2.value) ? styles.selected : ''}`}
                  >
                    <div
                      className={styles.item}
                      onClick={() => handleItemClick(item2.value)}
                    >
                      {item2.label}
                    </div>
                    <div className={styles.delete}>
                      <Popconfirm
                        title="删除科室"
                        description="确认删除该科室？"
                        onConfirm={() => handleDelete({id : item2.value})}
                        onCancel={() => message.info('取消删除')}
                        okText="是"
                        cancelText="否"
                      >
                        <Typography.Link type="danger">
                          删除
                        </Typography.Link>
                      </Popconfirm>
                    </div>

                  </Flex>
                ))}
              </div>
            ))}
          </Flex>
        </div>
        <div className={styles.right}>
          <ProTable<API.DeptVO>
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
              const {data, code} = await listDeptPageUsingPost({
                ...params,
                sortField,
                sortOrder,
                ...filter,
                parentId: selectedItem,
              } as API.DeptQueryRequest);
              return {
                success: code === 0,
                data: data?.list || [],
                total: Number(data?.total) || 0,
              };
            }}
            columns={columns}
          />
        </div>
      </Flex>
      <CreateModal
        visible={createModalVisible}
        onSubmit={() => {
          setCreateModalVisible(false);
          actionRef.current?.reload();
          fetchData()
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
          fetchData()
        }}
        onCancel={() => {
          setUpdateModalVisible(false);
        }}
      />
      <CreateRoomModal
        visible={addRoomModalVisible}
        deptId={currentRow?.id as number}
        onCancel={() => {
          setAddRoomModalVisible(false);
        }}
      />
    </PageContainer>
  );
};
export default DeptVOAdminPage;
