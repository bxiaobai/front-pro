import {FooterToolbar, PageContainer, ProForm, ProFormRadio} from '@ant-design/pro-components';
import {useParams} from "@@/exports";
import React, {useState} from "react";
import {useLocation} from "@umijs/max";
import {Button, Card, Flex, message, Tag} from "antd";
import {ProFormSlider} from "@ant-design/pro-form";
import {addUsingPost} from "@/services/swagger/scaleController";

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
  const handleSubmit = async (values) => {
    try {
      const res = await addUsingPost({detailsId: id, tag: 5, scaleJson: JSON.stringify(values)});
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
