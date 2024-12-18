import {FooterToolbar, PageContainer, ProForm, ProFormInstance} from '@ant-design/pro-components';
import {useParams} from "@@/exports";
import React, {useEffect, useRef, useState} from "react";
import {useLocation} from "@umijs/max";
import {Button, Card, Col, message, Row, Tag} from "antd";
import {ProFormSlider} from "@ant-design/pro-form";
import {addUsingPost} from "@/services/swagger/scaleController";

const SysMenu: React.FC = () => {
  const location = useLocation();
  const params = useParams();
  const id = Number(params.id);

  // 定义问题数组
//选中的数组
  const selectedOptions = location.state as any
  //字符串转为对象
  // @ts-ignore
  let json = {}as any
  if (selectedOptions !== null) {
    json = JSON.parse(selectedOptions?.scaleJson)
  }
  //提交方法
  const handleSubmit = async (values) => {
    try {
      const res = await addUsingPost({detailsId: id, tag: 2, scaleJson: JSON.stringify(values)});
      if (res.data) {
        message.success('提交成功');
        history.back()
      }
    } catch (e) {
      message.error('提交失败');
    }
  }

  const back = () => {
    history.back()
  }

  //根据选择的范围显示不同的值
  const formRef = useRef<ProFormInstance>();
  //当前值
  const [currentValue, setCurrentValue] = useState(json.slider === null ? 0 : json.slider);
  const [text, setText] = useState('#d9f7be');
  /**
   * 结果+建议：
   * 您的疼痛评分为0，不存在疼痛；
   * 您的疼痛评分为1-3，存在轻度疼痛，遵医嘱可选用非阿片类药物解热镇痛抗炎药(非甾体类抗炎药NSAIDs)阿司匹林，布洛芬，双氯芬酸，塞来昔布，依托考昔，对乙酰氨基酚；
   * 您的疼痛评分为3-5，存在中度疼痛，遵医嘱可选用弱阿片类药物曲马多，布桂嗪，可待因；
   * 您的疼痛评分为5-7，存在重度疼痛，遵医嘱可选用强阿片类药物(尽量用纯激动剂)吗啡，哌替啶(度冷丁)，羟考酮，芬太尼，美沙酮；
   * 您的疼痛评分为7-9，存在剧烈疼痛，建议去疼痛科就诊；
   * 您的疼痛评分为9-10分，建议去疼痛科就诊。
   */
  const getValue = () => {
    const slider = formRef.current.getFieldValue("slider")
    setCurrentValue(slider)
  }
  useEffect(() => {
    if (currentValue === 0) {
      setText('您的疼痛评分为0，不存在疼痛')
    } else if (currentValue >= 1 && currentValue < 3) {
      {
        setText('存在轻度疼痛，遵医嘱可选用非阿片类药物解热镇痛抗炎药(非甾体类抗炎药NSAIDs)阿司匹林，布洛芬，双氯芬酸，塞来昔布，依托考昔，对乙酰氨基酚；')
      }
    } else if (currentValue >= 4 && currentValue < 5) {
      setText('存在中度疼痛，遵医嘱可选用弱阿片类药物曲马多，布桂嗪，可待因；')
    } else if (currentValue >= 5 && currentValue < 7) {
      setText('存在重度疼痛，遵医嘱可选用强阿片类药物(尽量用纯激动剂)吗啡，哌替啶(度冷丁)，羟考酮，芬太尼，美沙酮')
    } else if (currentValue >= 7 && currentValue < 9) {
      setText('存在重度疼痛，建议去疼痛科就诊；')
    } else {
      setText('建议去疼痛科就诊。')
    }
  }, [currentValue])
  return (
    <>
      <PageContainer
        header={{breadcrumb: {}}}
        token={{
          paddingInlinePageContainerContent: 0,
          paddingBlockPageContainerContent: 0,
        }}
        title={false}
      >
        <Card style={{width: '80%', margin: '0 auto'}}>
          <div style={{textAlign: 'center', fontSize: '20px', fontWeight: 'bold', marginBottom: '32px'}}>疼痛筛查</div>
          <div style={{textAlign: 'center', marginBottom: '32px'}}>
            {selectedOptions?.scaleSuggest && (
              <Tag color={'blue'} style={{fontSize: '14px'}}>{selectedOptions.scaleSuggest}</Tag>
            )}
          </div>
          <ProForm
            formRef={formRef}
            initialValues={json}
            submitter={{
              render: (_, dom) => (
                <FooterToolbar>
                  <Button type="default" danger onClick={back}>
                    返回
                  </Button>
                  {dom}</FooterToolbar>
              ),
            }}
            onFinish={async (values) => {
              handleSubmit(values)
            }}
          >
            <ProFormSlider
              name="slider"
              max={10}
              fieldProps={{
                onChange: () => {
                  getValue()
                }
              }}
              marks={{
                0: {
                  style: {color: '#000'},
                  label: <span>0</span>,
                },
                1: '1',
                2: '2',
                3: '3',
                4: '4',
                5: '5',
                6: '6',
                7: '7',
                8: '8',
                9: '9',
                10: '10',
              }}
            />
          </ProForm>
          <Row gutter={20} align="middle">
            <Col span={3} style={{textAlign: 'center', backgroundColor: '#d9f7be', color: '#333', height: '50px',}}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                padding: 16
              }}>
                无痛
              </div>
            </Col>
            <Col span={4} style={{textAlign: 'center', backgroundColor: '#ffd8bf', color: '#333', height: '50px',}}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%'
              }}>
                轻度疼痛，可以忍受，能正常生活睡眠
              </div>
            </Col>
            <Col span={4} style={{textAlign: 'center', backgroundColor: '#ffd591', color: '#333', height: '50px',}}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%'
              }}>
                中度疼痛，适当影响睡眠，常用止痛药
              </div>
            </Col>
            <Col span={4} style={{textAlign: 'center', backgroundColor: '#ffccc7', color: '#333', height: '50px',}}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%'
              }}>
                重度疼痛，影响睡眠，需用麻醉止痛剂
              </div>
            </Col>
            <Col span={4} style={{textAlign: 'center', backgroundColor: '#ff4d4f', color: '#fff', height: '50px',}}>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%'
              }}>
                剧烈疼痛，影响睡眠较重，伴有其他症状
              </div>
            </Col>
            <Col span={4} style={{textAlign: 'center', backgroundColor: '#5c0011', color: '#fff', height: '50px',}}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%'
              }}>
                无法忍受，严重影响睡眠，伴有其他症状或被动体位
              </div>
            </Col>
          </Row>
          <div style={{
            fontWeight: 'bold',
            marginBottom: '32px',
            marginTop: '32px'
          }}>建议: <Tag color={'blue'}>{text}</Tag>
          </div>
        </Card>

      </PageContainer>
    </>
  );
};

export default SysMenu;
