import {FooterToolbar, PageContainer, ProForm, ProFormRadio} from '@ant-design/pro-components';
import {useParams} from "@@/exports";
import React, {useState} from "react";
import {useLocation} from "@umijs/max";
import {Button, Card, Flex, message, Tag} from "antd";
import {addUsingPost} from "@/services/swagger/appointmentScaleController";
import {ProFormSlider} from "@ant-design/pro-form";

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
      const res = await addUsingPost({resId: id, tag: 5, scaleJson: JSON.stringify(values)});
      if (res.data) {
        message.success('提交成功');
        history.back()
      }
    } catch (e) {
      message.error('提交失败');
    }
  }
  //是否显示滑块
  const [showSlider, setShowSlider] = useState(true);
  //是否显示性生活滑块
  const [showSexualSlider, setShowSexualSlider] = useState(false);
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
          <div style={{textAlign: 'center', fontSize: '20px', fontWeight: 'bold', marginBottom: '32px'}}>体力评分</div>
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
            <ProFormRadio.Group
              label={<span style={{fontWeight: 'bold'}}>您现在感到疲乏吗？</span>}
              name={'您现在感到疲乏吗？'}
              fieldProps={{
                onChange: (e) => {
                  setShowSlider(e.target.value === '有;（1分）')
                }
              }}
              options={['有;（1分）', '没有;（2分）']}
            />
            {showSlider ? <div>
              <ProFormRadio.Group
                label={<span style={{fontWeight: 'bold'}}>您现在所感到的疲乏维持多久了？</span>}
                name={'您现在所感到的疲乏维持多久了？'}
                options={['分钟;（1分）', '小时;（2分）', '星期;（3分）', '月;（4分）']}
              />
              <div>
                <div style={{marginBottom: '8px'}}>
                  <span style={{fontWeight: 'bold'}}>您现在感到的疲乏，为您带来多大程度的忧虑？</span>
                </div>
                <Flex justify={'space-between'}>
                  <p>毫不忧虑</p>
                  <p>非常忧虑</p>
                </Flex>
                <ProFormSlider
                  name={'您现在感到的疲乏，为您带来多大程度的忧虑？'}
                  max={10}
                  marks={{
                    0: '0',
                    1: '1',
                    2: '2',
                    3: '3',
                    4: '4',
                    5: '5',
                    6: '6',
                    7: '7',
                    8: '8:',
                    9: '9',
                    10: '10',
                  }}
                />
              </div>
              <div>
                <div style={{marginBottom: '8px'}}>
                <span
                  style={{fontWeight: 'bold'}}>您现在感到的疲乏，有没有妨碍您完成工作或学习活动的能力？影响有多大？ </span>
                </div>
                <Flex justify={'space-between'}>
                  <p>毫无影响</p>
                  <p>影响非常大</p>
                </Flex>
                <ProFormSlider
                  name={'您现在感到的疲乏，有没有妨碍您完成工作或学习活动的能力？影响有多大？'}
                  max={10}
                  marks={{
                    0: '0',
                    1: '1',
                    2: '2',
                    3: '3',
                    4: '4',
                    5: '5',
                    6: '6',
                    7: '7',
                    8: '8:',
                    9: '9',
                    10: '10',
                  }}
                />
              </div>

              <div>
                <div style={{marginBottom: '8px'}}>
                <span
                  style={{fontWeight: 'bold'}}>您现在感到的疲乏，有没有妨碍您探望朋友或与朋友的社交活动？影响有多大？ </span>
                </div>
                <Flex justify={'space-between'}>
                  <p>毫无影响</p>
                  <p>影响非常大</p>
                </Flex>
                <ProFormSlider
                  name={'您现在感到的疲乏，有没有妨碍您探望朋友或与朋友的社交活动？影响有多大？'}
                  max={10}
                  marks={{
                    0: '0',
                    1: '1',
                    2: '2',
                    3: '3',
                    4: '4',
                    5: '5',
                    6: '6',
                    7: '7',
                    8: '8:',
                    9: '9',
                    10: '10',
                  }}
                />
              </div>
              <div>
                <div style={{marginBottom: '8px'}}>
                <span
                  style={{fontWeight: 'bold'}}>您现在感到的疲乏，有没有影响您的性生活？ </span>
                </div>
                <ProFormRadio.Group
                  name={'您现在感到的疲乏，有没有影响您的性生活？'}
                  fieldProps={{
                    onChange: (e) => {
                      setShowSexualSlider(e.target.value === '有（1分）')
                    }
                  }}
                  options={['有（1分）', '没有（2分）' ,'不适用（3分）']}
                />
                {showSexualSlider ? <div>
                  <Flex justify={'space-between'}>
                    <p>毫无影响</p>
                    <p>影响非常大</p>
                  </Flex>
                  <ProFormSlider
                    name={'您现在感到的疲乏，有没有影响您的性生活？'}
                    max={10}
                    marks={{
                      0: '0',
                      1: '1',
                      2: '2',
                      3: '3',
                      4: '4',
                      5: '5',
                      6: '6',
                      7: '7',
                      8: '8:',
                      9: '9',
                      10: '10',
                    }}
                  />
                </div> : null}
              </div>
              <div>
                <div style={{marginBottom: '8px'}}>
                <span
                  style={{fontWeight: 'bold'}}>总体而言，您现在感到的疲乏，有没有妨碍您自己喜欢的事？影响又有多大？</span>
                </div>
                <Flex justify={'space-between'}>
                  <p>毫无影响</p>
                  <p>影响非常大</p>
                </Flex>
                <ProFormSlider
                  name={'总体而言，您现在感到的疲乏，有没有妨碍您自己喜欢的事？影响又有多大？'}
                  max={10}
                  marks={{
                    0: '0',
                    1: '1',
                    2: '2',
                    3: '3',
                    4: '4',
                    5: '5',
                    6: '6',
                    7: '7',
                    8: '8:',
                    9: '9',
                    10: '10',
                  }}
                />
              </div>
              <div>
                <div style={{marginBottom: '8px'}}>
                <span
                  style={{fontWeight: 'bold'}}>您如何形容您现在感到的疲乏？您所感到的疲乏有多大程度是</span>
                </div>
                <Flex justify={'space-between'}>
                  <p>令自己愉快的</p>
                  <p>令自己不愉快的</p>
                </Flex>
                <ProFormSlider
                  name={'您如何形容您现在感到的疲乏？您所感到的疲乏有多大程度是1'}
                  max={10}
                  marks={{
                    0: '0',
                    1: '1',
                    2: '2',
                    3: '3',
                    4: '4',
                    5: '5',
                    6: '6',
                    7: '7',
                    8: '8:',
                    9: '9',
                    10: '10',
                  }}
                />
              </div>
              <div>
                <div style={{marginBottom: '8px'}}>
                <span
                  style={{fontWeight: 'bold'}}>您如何形容您现在感到的疲乏？您所感到的疲乏有多大程度是</span>
                </div>
                <Flex justify={'space-between'}>
                  <p>并不惹自己讨厌</p>
                  <p>惹自己讨厌</p>
                </Flex>
                <ProFormSlider
                  name={'您如何形容您现在感到的疲乏？您所感到的疲乏有多大程度是2'}
                  max={10}
                  marks={{
                    0: '0',
                    1: '1',
                    2: '2',
                    3: '3',
                    4: '4',
                    5: '5',
                    6: '6',
                    7: '7',
                    8: '8:',
                    9: '9',
                    10: '10',
                  }}
                />
              </div>
              <div>
                <div style={{marginBottom: '8px'}}>
                <span
                  style={{fontWeight: 'bold'}}>您如何形容您现在感到的疲乏？您所感到的疲乏有多大程度是</span>
                </div>
                <Flex justify={'space-between'}>
                  <p>没有破坏性的</p>
                  <p>有破坏性的</p>
                </Flex>
                <ProFormSlider
                  name={'您如何形容您现在感到的疲乏？您所感到的疲乏有多大程度是3'}
                  max={10}
                  marks={{
                    0: '0',
                    1: '1',
                    2: '2',
                    3: '3',
                    4: '4',
                    5: '5',
                    6: '6',
                    7: '7',
                    8: '8:',
                    9: '9',
                    10: '10',
                  }}
                />
              </div>
              <div>
                <div style={{marginBottom: '8px'}}>
                <span
                  style={{fontWeight: 'bold'}}>您如何形容您现在感到的疲乏？您所感到的疲乏有多大程度是</span>
                </div>
                <Flex justify={'space-between'}>
                  <p>正面的</p>
                  <p>负面的</p>
                </Flex>
                <ProFormSlider
                  name={'您如何形容您现在感到的疲乏？您所感到的疲乏有多大程度是4'}
                  max={10}
                  marks={{
                    0: '0',
                    1: '1',
                    2: '2',
                    3: '3',
                    4: '4',
                    5: '5',
                    6: '6',
                    7: '7',
                    8: '8:',
                    9: '9',
                    10: '10',
                  }}
                />
              </div>
              <div>
                <div style={{marginBottom: '8px'}}>
                <span
                  style={{fontWeight: 'bold'}}>您如何形容您现在感到的疲乏？您所感到的疲乏有多大程度是</span>
                </div>
                <Flex justify={'space-between'}>
                  <p>正常的</p>
                  <p>异常的</p>
                </Flex>
                <ProFormSlider
                  name={'您如何形容您现在感到的疲乏？您所感到的疲乏有多大程度是5'}
                  max={10}
                  marks={{
                    0: '0',
                    1: '1',
                    2: '2',
                    3: '3',
                    4: '4',
                    5: '5',
                    6: '6',
                    7: '7',
                    8: '8:',
                    9: '9',
                    10: '10',
                  }}
                />
              </div>
              <div>
                <div style={{marginBottom: '8px'}}>
                <span
                  style={{fontWeight: 'bold'}}>您现在有多大程度感受到</span>
                </div>
                <Flex justify={'space-between'}>
                  <p>身体强壮</p>
                  <p>身体虚弱</p>
                </Flex>
                <ProFormSlider
                  name={'您现在有多大程度感受到'}
                  max={10}
                  marks={{
                    0: '0',
                    1: '1',
                    2: '2',
                    3: '3',
                    4: '4',
                    5: '5',
                    6: '6',
                    7: '7',
                    8: '8:',
                    9: '9',
                    10: '10',
                  }}
                />
              </div>
              <div>
                <div style={{marginBottom: '8px'}}>
                <span
                  style={{fontWeight: 'bold'}}>您现在有多大程度感受到</span>
                </div>
                <Flex justify={'space-between'}>
                  <p>清醒</p>
                  <p>有睡意</p>
                </Flex>
                <ProFormSlider
                  name={'您现在有多大程度感受到1'}
                  max={10}
                  marks={{
                    0: '0',
                    1: '1',
                    2: '2',
                    3: '3',
                    4: '4',
                    5: '5',
                    6: '6',
                    7: '7',
                    8: '8:',
                    9: '9',
                    10: '10',
                  }}
                />
              </div>
              <div>
                <div style={{marginBottom: '8px'}}>
                <span
                  style={{fontWeight: 'bold'}}>您现在有多大程度感受到</span>
                </div>
                <Flex justify={'space-between'}>
                  <p>有冲动</p>
                  <p>懒洋洋</p>
                </Flex>
                <ProFormSlider
                  name={'您现在有多大程度感受到2'}
                  max={10}
                  marks={{
                    0: '0',
                    1: '1',
                    2: '2',
                    3: '3',
                    4: '4',
                    5: '5',
                    6: '6',
                    7: '7',
                    8: '8:',
                    9: '9',
                    10: '10',
                  }}
                />
              </div>
              <div>
                <div style={{marginBottom: '8px'}}>
                <span
                  style={{fontWeight: 'bold'}}>您现在有多大程度感受到</span>
                </div>
                <Flex justify={'space-between'}>
                  <p>有精神</p>
                  <p>疲倦</p>
                </Flex>
                <ProFormSlider
                  name={'您现在有多大程度感受到3'}
                  max={10}
                  marks={{
                    0: '0',
                    1: '1',
                    2: '2',
                    3: '3',
                    4: '4',
                    5: '5',
                    6: '6',
                    7: '7',
                    8: '8:',
                    9: '9',
                    10: '10',
                  }}
                />
              </div>
              <div>
                <div style={{marginBottom: '8px'}}>
                <span
                  style={{fontWeight: 'bold'}}>您现在有多大程度感受到</span>
                </div>
                <Flex justify={'space-between'}>
                  <p>有活力</p>
                  <p>无活力</p>
                </Flex>
                <ProFormSlider
                  name={'您现在有多大程度感受到4'}
                  max={10}
                  marks={{
                    0: '0',
                    1: '1',
                    2: '2',
                    3: '3',
                    4: '4',
                    5: '5',
                    6: '6',
                    7: '7',
                    8: '8:',
                    9: '9',
                    10: '10',
                  }}
                />
              </div>
              <div>
                <div style={{marginBottom: '8px'}}>
                <span
                  style={{fontWeight: 'bold'}}>您现在有多大程度感受到</span>
                </div>
                <Flex justify={'space-between'}>
                  <p>不耐烦</p>
                  <p>有耐性</p>
                </Flex>
                <ProFormSlider
                  name={'您现在有多大程度感受到5'}
                  max={10}
                  marks={{
                    0: '0',
                    1: '1',
                    2: '2',
                    3: '3',
                    4: '4',
                    5: '5',
                    6: '6',
                    7: '7',
                    8: '8:',
                    9: '9',
                    10: '10',
                  }}
                />
              </div>
              <div>
                <div style={{marginBottom: '8px'}}>
                <span
                  style={{fontWeight: 'bold'}}>您现在有多大程度感受到</span>
                </div>
                <Flex justify={'space-between'}>
                  <p>轻松</p>
                  <p>紧张</p>
                </Flex>
                <ProFormSlider
                  name={'您现在有多大程度感受到6'}
                  max={10}
                  marks={{
                    0: '0',
                    1: '1',
                    2: '2',
                    3: '3',
                    4: '4',
                    5: '5',
                    6: '6',
                    7: '7',
                    8: '8:',
                    9: '9',
                    10: '10',
                  }}
                />
              </div>
              <div>
                <div style={{marginBottom: '8px'}}>
                <span
                  style={{fontWeight: 'bold'}}>您现在有多大程度感受到</span>
                </div>
                <Flex justify={'space-between'}>
                  <p>开心</p>
                  <p>抑郁</p>
                </Flex>
                <ProFormSlider
                  name={'您现在有多大程度感受到7'}
                  max={10}
                  marks={{
                    0: '0',
                    1: '1',
                    2: '2',
                    3: '3',
                    4: '4',
                    5: '5',
                    6: '6',
                    7: '7',
                    8: '8:',
                    9: '9',
                    10: '10',
                  }}
                />
              </div>
              <div>
                <div style={{marginBottom: '8px'}}>
                <span
                  style={{fontWeight: 'bold'}}>您现在有多大程度感受到</span>
                </div>
                <Flex justify={'space-between'}>
                  <p>能够集中精神</p>
                  <p>难以集中精神</p>
                </Flex>
                <ProFormSlider
                  name={'您现在有多大程度感受到8'}
                  max={10}
                  marks={{
                    0: '0',
                    1: '1',
                    2: '2',
                    3: '3',
                    4: '4',
                    5: '5',
                    6: '6',
                    7: '7',
                    8: '8:',
                    9: '9',
                    10: '10',
                  }}
                />
              </div>
              <div>
                <div style={{marginBottom: '8px'}}>
                <span
                  style={{fontWeight: 'bold'}}>您现在有多大程度感受到</span>
                </div>
                <Flex justify={'space-between'}>
                  <p>记忆力良好</p>
                  <p>无记性</p>
                </Flex>
                <ProFormSlider
                  name={'您现在有多大程度感受到9'}
                  max={10}
                  marks={{
                    0: '0',
                    1: '1',
                    2: '2',
                    3: '3',
                    4: '4',
                    5: '5',
                    6: '6',
                    7: '7',
                    8: '8:',
                    9: '9',
                    10: '10',
                  }}
                />
              </div>

              <div>
                <div style={{marginBottom: '8px'}}>
                <span
                  style={{fontWeight: 'bold'}}>您现在有多大程度感受到</span>
                </div>
                <Flex justify={'space-between'}>
                  <p>能够清晰的思考</p>
                  <p>不能够清晰的思考</p>
                </Flex>
                <ProFormSlider
                  name={'您现在有多大程度感受到10'}
                  max={10}
                  marks={{
                    0: '0',
                    1: '1',
                    2: '2',
                    3: '3',
                    4: '4',
                    5: '5',
                    6: '6',
                    7: '7',
                    8: '8:',
                    9: '9',
                    10: '10',
                  }}
                />
              </div>
            </div> : null}
          </ProForm>
        </Card>
      </PageContainer>
    </>
  );
};

export default SysMenu;
