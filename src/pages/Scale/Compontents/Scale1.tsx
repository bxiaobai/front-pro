import {FooterToolbar, PageContainer, ProForm, ProFormRadio} from '@ant-design/pro-components';
import {useParams} from "@@/exports";
import React from "react";
import {useLocation} from "@umijs/max";
import {Button, Card, message, Tag} from "antd";
import {addUsingPost} from "@/services/swagger/scaleController";

const SysMenu: React.FC = () => {
  const location = useLocation();
  const params = useParams();
  const id = Number(params.id);

  // 定义问题数组
  const questions = [
    {
      id: 1,
      question: "过去一个月，你有多少时候感到无法解释的筋疲力尽？",
      options: [
        {value: '全部时间', score: 5},
        {value: '大部分时间', score: 4},
        {value: '一部分时间', score: 3},
        {value: '偶尔', score: 2},
        {value: '无', score: 1},
      ],
    },
    {
      id: 2,
      question: "过去一个月，你有多少时候感到紧张？",
      options: [
        {value: '全部时间', score: 5},
        {value: '大部分时间', score: 4},
        {value: '一部分时间', score: 3},
        {value: '偶尔', score: 2},
        {value: '无', score: 1},
      ],
    },
    {
      id: 3,
      question: "过去一个月，你有多少时候感到太紧张以至于什么都不能让你平静下来？",
      options: [
        {value: '全部时间', score: 5},
        {value: '大部分时间', score: 4},
        {value: '一部分时间', score: 3},
        {value: '偶尔', score: 2},
        {value: '无', score: 1},
      ],
    },
    {
      id: 4,
      question: "过去一个月，你有多少时候感到绝望？",
      options: [
        {value: '全部时间', score: 5},
        {value: '大部分时间', score: 4},
        {value: '一部分时间', score: 3},
        {value: '偶尔', score: 2},
        {value: '无', score: 1},
      ],
    },
    {
      id: 5,
      question: "过去一个月，你有多少时候感到不安或烦躁？",
      options: [
        {value: '全部时间', score: 5},
        {value: '大部分时间', score: 4},
        {value: '一部分时间', score: 3},
        {value: '偶尔', score: 2},
        {value: '无', score: 1},
      ],
    },
    {
      id: 6,
      question: "过去一个月，你有多少时候感到太过不安以至于静坐不能？",
      options: [
        {value: '全部时间', score: 5},
        {value: '大部分时间', score: 4},
        {value: '一部分时间', score: 3},
        {value: '偶尔', score: 2},
        {value: '无', score: 1},
      ],
    },
    {
      id: 7,
      question: "过去一个月，你有多少时候感到沮丧？",
      options: [
        {value: '全部时间', score: 5},
        {value: '大部分时间', score: 4},
        {value: '一部分时间', score: 3},
        {value: '偶尔', score: 2},
        {value: '无', score: 1},
      ],
    },
    {
      id: 8,
      question: "过去一个月，你有多少时候感到太沮丧以至于什么都不能让你愉快起来？",
      options: [
        {value: '全部时间', score: 5},
        {value: '大部分时间', score: 4},
        {value: '一部分时间', score: 3},
        {value: '偶尔', score: 2},
        {value: '无', score: 1},
      ],
    },
    {
      id: 9,
      question: "过去一个月，你有多少时候感到做每一件事情都很费劲？",
      options: [
        {value: '全部时间', score: 5},
        {value: '大部分时间', score: 4},
        {value: '一部分时间', score: 3},
        {value: '偶尔', score: 2},
        {value: '无', score: 1},
      ],
    },
    {
      id: 10,
      question: "过去一个月，你有多少时候感到自己无价值？",
      options: [
        {value: '全部时间', score: 5},
        {value: '大部分时间', score: 4},
        {value: '一部分时间', score: 3},
        {value: '偶尔', score: 2},
        {value: '无', score: 1},
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
  const handleSubmit = async (values) => {
    try {
      const res = await addUsingPost({detailsId: id, tag: 1, scaleJson: JSON.stringify(values)});
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
        title={false}
      >
        <Card style={{width: '80%', margin: '0 auto' , height : '100%'}}>
          <div style={{textAlign: 'center', fontSize: '20px', fontWeight: 'bold', marginBottom: '32px'}}>心理筛查</div>
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
            {questions.map((question, index) => (
              <ProForm.Group key={index} title={question.question}>
                <ProFormRadio.Group
                  rules={[{required: true, message: '请选择'}]}
                  name={question.question}
                  options={question.options.map((option) => ({
                    label: option.value,
                    value: option.score, // 确保 value 是字符串
                  }))}
                />
              </ProForm.Group>
            ))}

          </ProForm>
        </Card>
      </PageContainer>
    </>
  );
};

export default SysMenu;
