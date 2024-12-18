import {FooterToolbar, PageContainer, ProForm, ProFormCheckbox} from '@ant-design/pro-components';
import {useParams} from "@@/exports";
import React, {useState} from "react";
import {useLocation} from "@umijs/max";
import {Button, Card, message, Tag} from "antd";
import {addUsingPost} from "@/services/swagger/appointmentScaleController";

const SysMenu: React.FC = () => {
  const location = useLocation();
  const params = useParams();
  const id = Number(params.id);

  //选中的数组
  const selectedOptions = location.state as any
  //字符串转为对象
  // @ts-ignore
  let json = {}
  if (selectedOptions !== null) {
    json = JSON.parse(selectedOptions?.scaleJson)
  }
  //提交方法
  const [selectedLength, setSelectedLength] = useState(0);

  const handleSubmit = async (values) => {

    try {
      const res = await addUsingPost({
        resId: id,
        tag: 6,
        scaleJson: JSON.stringify(values),
        scaleSuggest: selectedLength < 2 || selectedLength === 0 ? '您不存在呕吐风险；' : '您属于呕吐高危患者，遵医嘱在每次抗肿瘤药物开始前使用止吐药且覆盖整个风险期。'
      });
      if (res.data) {
        message.success('提交成功');
        history.back()
      }
    } catch (e) {
      message.error('提交失败');
    }
  }

  // 选择的checkbox长度

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
          <div style={{textAlign: 'center', fontSize: '20px', fontWeight: 'bold', marginBottom: '32px'}}>恶心呕吐筛查
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
                  setSelectedLength(e.length)
                }
              }}
              label="恶心呕吐筛查"
              options={['女性', '年轻患者（年龄小于55岁）', '低酒精摄入（每周饮酒少于5次）', '既往有晕动症（既往有就算）', '怀孕期间有妊娠反应（既往有就算）', '既往化疗出现呕吐', '有焦虑等情绪因素', '预期会发生严重反应']}
            />
            {selectedLength < 2 || selectedLength === 0 ?
              <div style={{color: 'red'}}>
                <span>结果+建议: </span><span style={{marginLeft: 8}}>您不存在呕吐风险；</span>
              </div> :
              <div style={{color: 'red'}}>
                <span>结果+建议: </span><span
                style={{marginLeft: 8}}>您属于呕吐高危患者，遵医嘱在每次抗肿瘤药物开始前使用止吐药且覆盖整个风险期。</span>
              </div>}
          </ProForm>
        </Card>
      </PageContainer>
    </>
  );
};

export default SysMenu;
