import {PageContainer} from '@ant-design/pro-components';
import {history, useParams} from "@@/exports";
import React, {useEffect, useState} from "react";
import {Button, Card, Col, Flex, message, Row, Tag} from "antd";

const SysMenu: React.FC = () => {
  //获取到路由
  const params = useParams();
  const id = Number(params.id);
  //筛查列表
  const [data, setData] = useState<any[]>();
  //根据id查询是否筛查
  const getScaleData = async () => {
    // const res = await getScaleUsingGet({scaleId: id})
    // setData(res.data)
    // console.log(res.data)
  }

  useEffect(() => {
    getScaleData()
    message.success("首次进行筛查，推荐全量筛查！")
  }, [])
  //返回的是筛查列表
  return (
    <>
      <PageContainer
        header={{breadcrumb: {}}}
        // 控制页容器的宽度和高度
        token={{
          paddingInlinePageContainerContent: 0,
          paddingBlockPageContainerContent: 0,
        }}
        title={false}
      >
        <Flex justify={'space-between'}>
          <p style={{fontSize: '16px', marginBottom: '16px' ,fontWeight: 'bold'}}>筛查内容</p>
          <Button type={'primary'} onClick={() => history.push('/list')}>上次评估内容</Button>
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
            </Card>
          </Col>
        </Row>

      </PageContainer>
    </>
  );
};

export default SysMenu;
