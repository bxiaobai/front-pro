import {FooterToolbar, PageContainer, ProForm, ProFormCheckbox} from '@ant-design/pro-components';
import {useParams} from "@@/exports";
import React, {useState} from "react";
import {useLocation} from "@umijs/max";
import {Button, Card, message, Tag} from "antd";
import {addUsingPost} from "@/services/swagger/scaleController";

const SysMenu: React.FC = () => {
    const location = useLocation();
    const params = useParams();
    const id = Number(params.id);
    //返回字符串
    const [result, setResult] = useState('');
    //选中的数组
    const selectedOptions = location.state as any
    //字符串转为对象
    // @ts-ignore
    let json = {}
    if (selectedOptions !== null) {
      json = JSON.parse(selectedOptions?.scaleJson)
    }
    //提交方法
    const handleSubmit = async (values) => {
      try {
        const res = await addUsingPost({detailsId: id, tag: 7, scaleJson: JSON.stringify(values), scaleSuggest: result});
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
    //返回字符串
    const getText = (value) => {
      if (value === 0) {
        setResult('0分为低危VTE风险')
      } else if (value === 1) {
        setResult('1分为中危VTE风险')
      } else if (value === 2) {
        setResult('2分为高危VTE风险')
      } else {
        setResult('3分为极高危VTE风险')
      }
    }
    //计算分数
    const checkboxChange = (checkedValues) => {
      let sum = 0;
      for (let i = 0; i < checkedValues.length; i++) {
        //获取字符串分数
        const score = checkedValues[i].split(";")
        const number = parseInt(score[1].substring(1, 2))
        sum += number
      }
      getText(sum)
    }
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
            <div style={{textAlign: 'center', fontSize: '20px', fontWeight: 'bold', marginBottom: '32px'}}>VTE筛查
            </div>
            <div style={{textAlign: 'center', marginBottom: '32px'}}>
              {selectedOptions?.scaleSuggest && (
                <Tag color={'blue'} style={{fontSize: '14px'}}>{selectedOptions.scaleSuggest}</Tag>
              )}
            </div>
            <ProForm
              submitter={{
                render: (_, dom) => (
                  <FooterToolbar>
                    <Button type="default" danger onClick={back}>
                      返回
                    </Button>
                    {dom}</FooterToolbar>
                ),
              }}
              onFinish={async (values) => handleSubmit(values)}
              initialValues={json}
            >
              <ProFormCheckbox.Group
                name="checkbox"
                layout="vertical"
                fieldProps={{
                  onChange: (e) => {
                    checkboxChange(e)
                  }
                }}
                label="VTE筛查"
                options={['极高危的原发癌症类型: 胃癌、胰腺癌、脑癌;（2分）',
                  '高危的原发癌症类型: 肺癌、淋巴瘤、妇科肿瘤、膀胱癌、睾丸癌、肾癌;（1分）'
                  , '治疗前血小板计数≥ 350 ×109/L ;（1分）',
                  '血红蛋白水平 <100g/L 或者正在采用一种红细胞生长因子治疗;（1分）',
                  '治疗前白细胞计数 >11 × 109/L;（1分）',
                  '体重指数（BMI）≥ 35;（1分）']}
              />
              <div style={{color: 'red'}}>
                <span>结果+建议: </span>
                <span style={{marginLeft: 8}}>{result}</span>
              </div>
            </ProForm>
          </Card>
        </PageContainer>
      </>
    );
  }
;

export default SysMenu;
