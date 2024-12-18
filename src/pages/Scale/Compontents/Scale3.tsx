import {FooterToolbar, PageContainer, ProForm, ProFormCheckbox, ProFormInstance} from '@ant-design/pro-components';
import {useParams} from "@@/exports";
import React, {useRef} from "react";
import {useLocation} from "@umijs/max";
import {Button, Card, message, Tag} from "antd";
import {addUsingPost} from "@/services/swagger/appointmentScaleController";

const SysMenu: React.FC = () => {
  const location = useLocation();
  const params = useParams();
  const id = Number(params.id);

  // 定义问题数组
  const questions = [
    {
      id: 1,
      question: "年龄",
      options: [
        {value: '年龄≥70岁', score: 1},
      ],
    },
    {
      id: 2,
      question: "疾病",
      options: [
        {value: '骨盆骨折、肝硬化、慢性阻塞性肺病、长期血液透析、糖尿病、肿瘤', score: 1},
        {value: '腹部重大手术、中风、重症肺炎、血液系统肿瘤', score: 2},
        {value: '颅脑损伤、骨髓移植', score: 3},
      ],
    },
    {
      id: 3,
      question: "营养受损",
      options: [
        {value: '3个月内体重减轻>5%或最近1个星期进食量（与需要量相比）减少25%~50%', score: 1},
        {value: '2个月内体重减轻>5%或BMI18.5~20.5或最近1个星期进食量（与需要量相比）减少50%~75%。', score: 2},
        {
          value: '1个月内体重减轻>5%（或3个月内减轻>15%）或BMI＜18.5（或血清白蛋白＜30g/L）或最近1个星期进食量（与需要量相比）减少70%~100%。',
          score: 3
        },
      ],
    },
  ];
  //选中的数组
  const selectedOptions = location.state as any
  //字符串转为对象
  // @ts-ignore
  let json = {}
  if (selectedOptions !== null) {
    json = JSON.parse(selectedOptions?.scaleJson)
  }

  //提交方法
  const formRef = useRef<ProFormInstance>();

  const handleSubmit = async (values) => {
    try {
      const res = await addUsingPost({resId: id, tag: 3, scaleJson: JSON.stringify(values)});
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
          <div style={{textAlign: 'center', fontSize: '20px', fontWeight: 'bold', marginBottom: '32px'}}>营养筛查</div>
          <div style={{textAlign: 'center', marginBottom: '32px'}}>
            {selectedOptions?.scaleSuggest && (
              <Tag color={'blue'} style={{fontSize: '14px'}}>{selectedOptions.scaleSuggest}</Tag>
            )}
          </div>
          <ProForm
            initialValues={json}
            formRef={formRef}
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
          >
            <ProFormCheckbox.Group
              name="sex"
              layout="vertical"
              label="年龄"
              options={['年龄≥70岁;(1分)']}
            />
            <ProFormCheckbox.Group
              name="jb"
              layout="vertical"
              label="疾病"
              options={['骨盆骨折、肝硬化、慢性阻塞性肺病、长期血液透析、糖尿病、肿瘤;(1分)', '腹部重大手术、中风、重症肺炎、血液系统肿瘤;(2分)', '颅脑损伤、骨髓移植;(3分)']}
            />
            <ProFormCheckbox.Group
              name="yyss"
              layout="vertical"
              label="营养受损"
              options={['3个月内体重减轻>5%或最近1个星期进食量（与需要量相比）减少25%~50%;(1分)', '2个月内体重减轻>5%或BMI18.5~20.5或最近1个星期进食量（与需要量相比）减少50%~75%;(2分)', '1个月内体重减轻>5%（或3个月内减轻>15%）或BMI＜18.5（或血清白蛋白＜30g/L）或最近1个星期进食量（与需要量相比）减少70%~100%;(3分)']}
            />
          </ProForm>
        </Card>
      </PageContainer>
    </>
  );
};

export default SysMenu;
