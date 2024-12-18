import {PageContainer, type ProColumns, ProTable} from '@ant-design/pro-components';
import {history, useParams} from "@@/exports";
import React, {useEffect, useState} from "react";
import {Button, Card, Col, Divider, Flex, Row, Tag, Tooltip} from "antd";
import {getScaleByCardIdUsingGet, getScaleUsingGet} from "@/services/swagger/scaleController";

const SysMenu: React.FC = () => {
  //获取到路由
  const params = useParams();
  const id = Number(params.id);
  //筛查列表
  const [data, setData] = useState<API.Scale[]>();
  //根据id查询是否筛查
  const getScaleData = async () => {
    const res = await getScaleUsingGet({scaleId: id})
    setData(res.data)

  }

  //获取到当前id的筛查结果
  function getScaleByCardIdData(id) {
    //如果是1返回心理评估
    switch (id) {
      case '1':
        return '心理评估';
      case '2':
        return '疼痛评估';
      case '3':
        return '营养评估';
      case '4':
        return '皮肤评估';
      case '5':
        return '体力评估';
      default:
        return '其他';
    }
  }

  /**
   * 表格列配置
   */
  const columns: ProColumns<API.Scale>[] = [
    {
      title: 'id',
      dataIndex: 'detailsId',
      valueType: 'text',
      hideInForm: true,
      hideInSearch: true,
      hideInTable: true
    },
    {
      title: '标签',
      dataIndex: 'scaleId',
      valueType: 'text',
      width : 200,
      render: (_, record) =>
        <Tag color={'blue'}>{getScaleByCardIdData(record.scaleId)}</Tag>
    },
    {
      title: '建议',
      dataIndex: 'scaleSuggest',
      valueType: 'text',
      //长文本省略，鼠标移入提示
      ellipsis: {
        showTitle: false,
      },
      //鼠标移入用气泡框展示全部
      renderText: (text) => <Tooltip placement="topLeft" title={text}>{text}</Tooltip>,
    },
    {
      title: '创建日期',
      dataIndex: 'createDate',
      valueType: 'text',
      width : 200
    },
  ];

  useEffect(() => {
    getScaleData()
  }, [])
  //返回的是筛查列表
  return (
    <>
      <PageContainer
        title={false}
      >
        <Flex justify={'space-between'}>
          <p style={{fontSize: '16px', marginBottom: '16px', fontWeight: 'bold'}}>筛查内容</p>
        </Flex>
        <Row gutter={16}>
          <Col span={6} style={{marginBottom: '16px'}}>
            <Card title="心理筛查" key={1} bordered={false} onClick={() => {
              history.push(`/appointment/list/scale1/` + id, data?.find(item => item.tag === 1));
            }}>
              <Flex justify={"space-between"} align={"center"}>
                {data?.find(item => item.tag === 1) ? <Tag color="blue">已筛查</Tag> : <Tag color="red">未筛查</Tag>}
                {/* 查看建议*/}
                {data?.find(item => item.tag === 1) ? <Button type={'link'} color="primary">查看</Button> :
                  <Button type={'link'} color="primary">筛查</Button>}
              </Flex>
              <Flex justify={"space-between"} align={"center"} style={{marginTop: 8}}>
                {data?.find(item => item.tag === 1)?.scaleSuggest}
              </Flex>
            </Card>
          </Col>
          <Col span={6} style={{marginBottom: '16px'}}>
            <Card title="疼痛筛查" key={2} bordered={false} onClick={() => {
              history.push(`/appointment/list/scale2/` + id, data?.find(item => item.tag === 2));
            }}>
              <Flex justify={"space-between"} align={"center"}>
                {data?.find(item => item.tag === 2) ? <Tag color="blue">已筛查</Tag> : <Tag color="red">未筛查</Tag>}
                {/* 查看建议*/}
                {data?.find(item => item.tag === 2) ? <Button type={'link'} color="primary">查看</Button> :
                  <Button type={'link'} color="primary">筛查</Button>}
              </Flex>
              <Flex justify={"space-between"} align={"center"} style={{marginTop: 8}}>
                {data?.find(item => item.tag === 2)?.scaleSuggest}
              </Flex>
            </Card>
          </Col>
          <Col span={6} style={{marginBottom: '16px'}}>
            <Card title="营养筛查" key={3} bordered={false} onClick={() => {
              history.push(`/appointment/list/scale3/` + id, data?.find(item => item.tag === 3));
            }}>
              <Flex justify={"space-between"} align={"center"}>
                {data?.find(item => item.tag === 3) ? <Tag color="blue">已筛查</Tag> : <Tag color="red">未筛查</Tag>}
                {/* 查看建议*/}
                {data?.find(item => item.tag === 3) ? <Button type={'link'} color="primary">查看</Button> :
                  <Button type={'link'} color="primary">筛查</Button>}
              </Flex>
              <Flex justify={"space-between"} align={"center"} style={{marginTop: 8}}>
                {data?.find(item => item.tag === 3)?.scaleSuggest}
              </Flex>
            </Card>
          </Col>
          <Col span={6} style={{marginBottom: '16px'}}>
            <Card title="皮肤筛查" key={4} bordered={false} onClick={() => {
              history.push(`/appointment/list/scale4/` + id, data?.find(item => item.tag === 4));
            }}>
              <Flex justify={"space-between"} align={"center"}>
                {data?.find(item => item.tag === 4) ? <Tag color="blue">已筛查</Tag> : <Tag color="red">未筛查</Tag>}
                {/* 查看建议*/}
                {data?.find(item => item.tag === 4) ? <Button type={'link'} color="primary">查看</Button> :
                  <Button type={'link'} color="primary">筛查</Button>}
              </Flex>
              <Flex justify={"space-between"} align={"center"} style={{marginTop: 8}}>
                {data?.find(item => item.tag === 4)?.scaleSuggest}
              </Flex>
            </Card>
          </Col>
          <Col span={6} style={{marginBottom: '16px'}} onClick={() => {
            history.push(`/appointment/list/scale5/` + id, data?.find(item => item.tag === 5));
          }}>
            <Card title="体力评分" key={3} bordered={false}>
              <Flex justify={"space-between"} align={"center"}>
                {data?.find(item => item.tag === 5) ? <Tag color="blue">已筛查</Tag> : <Tag color="red">未筛查</Tag>}
                {/* 查看建议*/}
                {data?.find(item => item.tag === 5) ? <Button type={'link'} color="primary">查看</Button> :
                  <Button type={'link'} color="primary">筛查</Button>}
              </Flex>
              <Flex justify={"space-between"} align={"center"} style={{marginTop: 8}}>
                {data?.find(item => item.tag === 5)?.scaleSuggest}
              </Flex>
            </Card>
          </Col>
          <Col span={6} style={{marginBottom: '16px'}} onClick={() => {
            history.push(`/appointment/list/scale6/` + id, data?.find(item => item.tag === 6));
          }}>
            <Card title="恶心呕吐筛查" key={3} bordered={false}>
              <Flex justify={"space-between"} align={"center"}>
                {data?.find(item => item.tag === 6) ? <Tag color="blue">已筛查</Tag> : <Tag color="red">未筛查</Tag>}
                {/* 查看建议*/}
                {data?.find(item => item.tag === 6) ? <Button type={'link'} color="primary">查看</Button> :
                  <Button type={'link'} color="primary">筛查</Button>}
              </Flex>
              <Flex justify={"space-between"} align={"center"} style={{marginTop: 8}}>
                {data?.find(item => item.tag === 6)?.scaleSuggest}
              </Flex>
            </Card>
          </Col>
          <Col span={6} style={{marginBottom: '16px'}} onClick={() => {
            history.push(`/appointment/list/scale7/` + id, data?.find(item => item.tag === 7));
          }}>
            <Card title="VTE筛查" key={3} bordered={false}>
              <Flex justify={"space-between"} align={"center"}>
                {data?.find(item => item.tag === 7) ? <Tag color="blue">已筛查</Tag> : <Tag color="red">未筛查</Tag>}
                {/* 查看建议*/}
                {data?.find(item => item.tag === 7) ? <Button type={'link'} color="primary">查看</Button> :
                  <Button type={'link'} color="primary">筛查</Button>}
              </Flex>
              <Flex justify={"space-between"} align={"center"} style={{marginTop: 8}}>
                {data?.find(item => item.tag === 7)?.scaleSuggest}
              </Flex>
            </Card>
          </Col>
          <Col span={6} style={{marginBottom: '16px'}} onClick={() => {
            history.push(`/appointment/list/scale5/` + id, data?.find(item => item.tag === 5));
          }}>
            <Card title="运动疲乏筛查" key={3} bordered={false}>
              <Flex justify={"space-between"} align={"center"}>
                {data?.find(item => item.tag === 5) ? <Tag color="blue">已筛查</Tag> : <Tag color="red">未筛查</Tag>}
                {/* 查看建议*/}
                {data?.find(item => item.tag === 5) ? <Button type={'link'} color="primary">查看</Button> :
                  <Button type={'link'} color="primary">筛查</Button>}
              </Flex>
              <Flex justify={"space-between"} align={"center"} style={{marginTop: 8}}>
                {data?.find(item => item.tag === 5)?.scaleSuggest}
              </Flex>
            </Card>
          </Col>
        </Row>
        <Divider/>
        <Card title={'历史筛查列表'}>
          <ProTable
            search={false}
            //右侧工具不要
            toolBarRender={false}
            request={async (params: any) => {
              const res = await getScaleByCardIdUsingGet({scaleId: id})
              console.log(res.data)
              return {
                data: res?.data ?? [],
                success: res?.code === 0,
              }
            }}
            columns={columns}
            rowKey={'id'}
            pagination={false}
          />
        </Card>
      </PageContainer>
    </>
  );
};

export default SysMenu;
