import {FooterToolbar, PageContainer, ProForm, ProFormRadio} from '@ant-design/pro-components';
import {useParams} from "@@/exports";
import React, {useEffect, useState} from "react";
import {useLocation} from "@umijs/max";
import {Button, Card, message, Tag} from "antd";
import {addUsingPost} from "@/services/swagger/appointmentScaleController";

const SysMenu: React.FC = () => {
  const location = useLocation();
  const params = useParams();
  const id = Number(params.id);

  // 定义问题数组
  //脱发
  const [question1, setQuestion1] = useState('');
  const [question2, setQuestion2] = useState('');
  const [question3, setQuestion3] = useState('');
  const [question4, setQuestion4] = useState('');
  const [question7, setQuestion7] = useState('');
  const [question8, setQuestion8] = useState('');
  const [question9, setQuestion9] = useState('');
  const [question10, setQuestion10] = useState('');
  const [question11, setQuestion11] = useState('');
  const [question12, setQuestion12] = useState('');
  const [question13, setQuestion13] = useState('');
  const [question14, setQuestion14] = useState('');
  const [question15, setQuestion15] = useState('');


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
      const res = await addUsingPost({resId: id, tag: 4, scaleJson: JSON.stringify(values)});
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
  // 更新反馈信息
  const updateFeedback = (value, id) => {
    switch (id) {
      case 1:
        switch (value) {
          case '1级:个体脱发小于50%，远距离观察无明显区别，但近距离观察可见。':
            setQuestion1('您属于1级脱发，可改变发型来掩饰头发丢失；')
            break;
          case '2级:个体脱发大于等于50%，症状明显；伴心理影响':
            setQuestion1('您属于2级脱发，可能需要假发或假发簇')
            break;
          default:
            setQuestion1('您不存在脱发')
        }
        break
      case 2:
        switch (value) {
          case '1级:女性中，在雄激素依赖区域出现毛发增长、增粗、增密，可':
            setQuestion2('您属于多毛症1级，可通过周期性削刮，漂白或脱毛进行掩饰；')
            break;
          case '2级:女性中，在雄激素依赖区域出现毛发增长、增粗、增密；伴有心理影响':
            setQuestion2('您属于多毛症2级：需要每天削刮或持续性除毛手段进行掩饰')
            break;
          default:
            setQuestion2('您不存在多毛症')
        }
        break
      case 3:
        switch (value) {
          case '1级:覆盖小于10% 的体表面积，但是不伴红斑和瘙痒':
            setQuestion3('您属于1级皮肤干燥，注意做好皮肤保湿工作，每日涂抹保湿霜；')
            break;
          case '2级: 覆盖10～30% 的体表面积，伴有红斑和瘙痒；影响借助于工具的日常生活活动':
            setQuestion3('您属于2-3级皮肤干燥，建议于皮肤科就诊')
            break;
          case '3级: 覆盖超过30% 的体表面积，伴有瘙痒；影响自理性日常生活活动':
            setQuestion3('您属于2-3级皮肤干燥，建议于皮肤科就诊')
            break;
          default:
            setQuestion3('您不存在皮肤干燥；')
        }
        break
      case 4:
        switch (value) {
          case '1级:无症状或轻度症状；':
            setQuestion4('您属于湿疹1级，无需基线以外的额外治疗；')
            break;
          case '2级:中度；需要局部或口服治疗； ':
            setQuestion4('您属于湿疹2级，需要基线以外的额外治疗；')
            break;
          case '3级:重度或有医学意义，但不立即危及生命；':
            setQuestion4('您属于湿疹3级，需要静脉注射药物治疗。')
            break;
          default:
            setQuestion4('您不存在湿疹')
        }
        break
      case 7:
        switch (value) {
          case '1级:无症状，甲床与甲板分离或指甲丢失':
            setQuestion7('您属于指甲丢失2级，请做好指甲保护，避免感染或出血等情况，建议就诊')
            break;
          case '2级:有症状，甲床与甲板分离或指甲丢失；影响工具性日常生活活动':
            setQuestion7('您属于指甲丢失1级，无需额外治疗；')
            break;
          default:
            setQuestion7(' 您不存在指甲丢失；')
        }
        break
      case 8:
        switch (value) {
          case '无':
            setQuestion8('您不存在指甲隆起，')
            break;
          default:
            setQuestion8('您属于1级指甲隆起，无需治疗')
        }
        break
      case 9:
        switch (value) {
          case '无':
            setQuestion9('您不存在手足综合征；')
            break;
          case '1级:无痛性轻微皮肤改变或皮炎（如红斑，水肿或过度角化）':
            setQuestion9('您属于1级手足综合征，请注意保湿；')
            break;
          case '2级:痛性皮肤改变（如剥落，水泡，出血，皲裂，水肿，过度角化）；影响工具性日常生活活动':
            setQuestion9('您属于2级手足综合征，建议皮肤科就诊；')
            break;
          default:
            setQuestion9('您属于3级手足综合征，建议皮肤科就诊。')
        }
        break
      case 10:
        switch (value) {
          case '无':
            setQuestion10('您不存在光敏感性')
            break;
          case '1级:无痛性红斑，红斑覆盖小于10% 体表面积':
            setQuestion10('您存在1级光敏感性，请做好防晒工作')
            break;
          case '2级:触痛性红斑，覆盖10～30%体表面积':
            setQuestion10('您存在2级光敏感性，请做好防晒工作')
            break;
          default:
            setQuestion10('您存在3级光敏感性，需要口服激素治疗，需要止痛治疗（如麻醉剂和甾体类）')
        }
        break
      case 11:
        switch (value) {
          case '无':
            setQuestion11('您不存在瘙痒症；')
            break;
          case '1级:轻度或局部；需要局部的治疗':
            setQuestion11('您属于1级斑丘疹，请保持皮肤清洁，注意保湿；')
            break;
          case '2级:广泛分布且间歇性发作；搔抓引起皮肤改变（如水肿，丘疹，抓痕，苔藓样变，渗出/痂皮）；影响工具性日常生活活动':
            setQuestion11('您属于2级瘙痒症，需要口服药治疗；')
            break;
          default:
            setQuestion11('您属于3级瘙痒症，需要全身性糖皮质激素或免疫抑制剂治疗。')
        }
        break
      case 12:
        switch (value) {
          case '无':
            setQuestion12('您不存在斑丘疹；')
            break;
          case '1级: 丘疹和/ 或脓疱<10% 体表面积，伴或不伴有瘙痒或压痛症状':
            setQuestion12('您属于1级痤疮样皮疹：保持皮肤清洁，注意保湿，避免挤压患处；')
            break;
          case '2级: 丘疹和/或脓疱覆盖10%～30% 的体表面积，可能伴有/不伴有瘙痒和压痛；伴心理影响；影响':
            setQuestion12('您属于2级痤疮样皮疹，保持皮肤清洁，注意保湿，避免挤压患处；')
            break;
          case '3级: 丘疹和/或脓疱覆盖大于30%体表面积伴有中到重度症状；影响自理性日常生活活动':
            setQuestion12('您属于3级痤疮样皮疹，若伴局部二重感染，需要口服抗生素治疗；')
            break;
          default:
            setQuestion12('您属于4级痤疮样皮疹，若伴局部二重感染，需要静脉给予抗生素治疗。')
        }
        break
      case 13:
        switch (value) {
          case '无':
            setQuestion13('您不存在斑丘疹；')
            break;
          case '1级: 斑丘疹覆盖小于10% 体表面积，伴有/不伴有症状（如：瘙痒，灼烧感，紧绷感）':
            setQuestion13('您属于1级斑丘疹，请保持皮肤清洁，注意保湿；')
            break;
          case '2级:斑丘疹覆盖体表面积10～30%，伴有/不伴有症状（如：瘙痒，灼烧感，紧绷感）；影响工具性日常生活活动; 皮疹覆盖体表面积大于30% 体表面积伴或不伴有轻微症状':
            setQuestion13('您属于2级斑丘疹，请保持皮肤清洁，注意保湿；')
            break;
          default:
            setQuestion13('您属于3级斑丘疹，建议于皮肤科就诊。')
        }
        break
      case 14:
        switch (value) {
          case '无':
            setQuestion14('您属于1级皮肤硬结，建议于皮肤科就诊；')
            break;
          case '1级: 硬结，能够滑动皮肤至同一平面（滑行）和垂直移动（捏起）':
            setQuestion14('您属于1级皮肤硬结，建议于皮肤科就诊；')
            break;
          case '2级: 中等硬结，能够滑动皮肤，不能够捏起；影响工具性日常生活活动':
            setQuestion14('您属于2级皮肤硬结，建议于皮肤科就诊；')
            break;
          case '3级: 重度硬结，不能滑动或捏皮肤；限制关节或解剖开口活动（如：口和肛门）；影响自理性日常生活活动':
            setQuestion14('您属于3级皮肤硬结，建议于皮肤科就诊；')
            break;
          default:
            setQuestion14('您属于4级皮肤硬结，建议于皮肤科就诊。')
        }
        break
      case 15:
        switch (value) {
          case '无':
            setQuestion15('您不存在皮肤溃疡；')
            break;
          case '1级: 溃疡区域小于1cm；红斑不发白，皮肤完整，伴有发热和水肿':
            setQuestion15('您属于1级皮肤溃疡，请注意保持皮肤清洁，避免感染，建议于皮肤科就诊；')
            break;
          case '2级: 溃疡区域在1～2cm；皮肤层部分缺失，涉及到皮下组织或皮下脂肪组织':
            setQuestion15('您属于2级皮肤溃疡，请注意保持皮肤清洁，避免感染，建议于皮肤科就诊；')
            break;
          case '3级: 溃疡区域大于2cm；皮肤全层缺失，涉及到皮下组织破坏或坏死，可能会延伸到筋膜层':
            setQuestion15('您属于3级皮肤溃疡，请注意保持皮肤清洁，避免感染，建议于皮肤科就诊；')
            break;
          default:
            setQuestion15('您属于4级皮肤溃疡，请注意保持皮肤清洁，避免感染，建议于皮肤科就诊。')
        }
        break
    }
  }
  // 在组件加载和更新时，根据初始值更新反馈
  useEffect(() => {
    Object.keys(json).forEach((key) => {
      const value = json[key];
      const questionId = parseInt(key.replace('question', ''));
      updateFeedback(value, questionId);
    });
  }, [json]);

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
          <div style={{textAlign: 'center', fontSize: '20px', fontWeight: 'bold', marginBottom: '32px'}}>皮肤筛查
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
            <div style={{marginBottom: '24px'}}>
              <ProFormRadio.Group
                label={<span style={{fontWeight: 'bold'}}>脱发</span>}
                name={'脱发'}
                layout={'vertical'}
                fieldProps={{
                  onChange: (e) => {
                    updateFeedback(e.target.value, 1)
                  }
                }}
                options={['无', "1级:个体脱发小于50%，远距离观察无明显区别，但近距离观察可见。", '2级:个体脱发大于等于50%，症状明显；伴心理影响']}
              />

              {{question1} ? <div style={{color: 'red'}}>
                <span>结果+建议: </span><span style={{marginLeft: 8}}>{question1}</span>
              </div> : null}
            </div>
            <div style={{marginBottom: '24px'}}>
              <ProFormRadio.Group
                label={<span style={{fontWeight: 'bold'}}>多毛症</span>}
                name={'多毛症'}
                layout={'vertical'}
                fieldProps={{
                  onChange: (e) => {
                    updateFeedback(e.target.value, 2)
                  }
                }}
                options={['无', "1级:女性中，在雄激素依赖区域出现毛发增长、增粗、增密，可", '2级:女性中，在雄激素依赖区域出现毛发增长、增粗、增密；伴有心理影响']}
              />
              {{question2} ? <div style={{color: 'red'}}>
                <span>结果+建议: </span><span style={{marginLeft: 5}}>{question2}</span>
              </div> : null}
            </div>
            <div style={{marginBottom: '24px'}}>
              <ProFormRadio.Group
                label={<span style={{fontWeight: 'bold'}}>皮肤干燥</span>}
                name={'皮肤干燥'}
                layout={'vertical'}
                fieldProps={{
                  onChange: (e) => {
                    updateFeedback(e.target.value, 3)
                  }
                }}
                options={['无', "1级:覆盖小于10% 的体表面积，但是不伴红斑和瘙痒", '2级: 覆盖10～30% 的体表面积，伴有红斑和瘙痒；影响借助于工具的日常生活活动', '3级: 覆盖超过30% 的体表面积，伴有瘙痒；影响自理性日常生活活动']}
              />
              {{question3} ? <div style={{color: 'red'}}>
                <span>结果+建议: </span><span style={{marginLeft: 5}}>{question3}</span>
              </div> : null}
            </div>
            <div style={{marginBottom: '24px'}}>
              <ProFormRadio.Group
                label={<span style={{fontWeight: 'bold'}}>湿疹</span>}
                name={'湿疹'}
                layout={'vertical'}
                fieldProps={{
                  onChange: (e) => {
                    updateFeedback(e.target.value, 4)
                  }
                }}
                options={['无', "1级:无症状或轻度症状；", '2级:中度；需要局部或口服治疗； ', '3级:重度或有医学意义，但不立即危及生命；']}
              />
              {{question4} ? <div style={{color: 'red'}}>
                <span>结果+建议: </span><span style={{marginLeft: 5}}>{question4}</span>
              </div> : null}
            </div>
            <div style={{marginBottom: '24px'}}>
              <ProFormRadio.Group
                label={<span style={{fontWeight: 'bold'}}>脱发</span>}
                name={'指甲改变'}
                layout={'vertical'}
                options={['无', '有']}
              />
            </div>
            <div style={{marginBottom: '24px'}}>
              <ProFormRadio.Group
                label={<span style={{fontWeight: 'bold'}}>甲变色</span>}
                name={'甲变色'}
                layout={'vertical'}
                options={['无', '1级:无症状；仅为临床或诊断所见']}
              />
            </div>
            <div style={{marginBottom: '24px'}}>
              <ProFormRadio.Group
                label={<span style={{fontWeight: 'bold'}}>指甲丢失</span>}
                name={'指甲丢失'}
                layout={'vertical'}
                fieldProps={{
                  onChange: (e) => {
                    updateFeedback(e.target.value, 7)
                  }
                }}
                options={['无', '1级:无症状，甲床与甲板分离或指甲丢失', '2级:有症状，甲床与甲板分离或指甲丢失；影响工具性日常生活活动']}
              />
              {{question7} ? <div style={{color: 'red'}}>
                <span>结果+建议: </span><span style={{marginLeft: 7}}>{question7}</span>
              </div> : null}
            </div>
            <div style={{marginBottom: '24px'}}>
              <ProFormRadio.Group
                label={<span style={{fontWeight: 'bold'}}>指甲丢失</span>}
                name={'指甲隆起'}
                layout={'vertical'}
                fieldProps={{
                  onChange: (e) => {
                    updateFeedback(e.target.value, 8)
                  }
                }}
                options={['无', '1级:无症状；仅为临床或诊断所见；']}
              />
              {{question8} ? <div style={{color: 'red'}}>
                <span>结果+建议: </span><span style={{marginLeft: 7}}>{question8}</span>
              </div> : null}
            </div>
            <div style={{marginBottom: '24px'}}>
              <ProFormRadio.Group
                label={<span style={{fontWeight: 'bold'}}>指甲丢失</span>}
                name={'手足综合征'}
                layout={'vertical'}
                fieldProps={{
                  onChange: (e) => {
                    updateFeedback(e.target.value, 9)
                  }
                }}
                options={['无', '1级:无痛性轻微皮肤改变或皮炎（如红斑，水肿或过度角化）', '2级:痛性皮肤改变（如剥落，水泡，出血，皲裂，水肿，过度角化）；影响工具性日常生活活动', '3级:重度皮肤改变（剥落，水泡，出血，皲裂，水肿，角化过度），伴疼痛；影响自理性日常生活活动']}
              />
              {{question9} ? <div style={{color: 'red'}}>
                <span>结果+建议: </span><span style={{marginLeft: 7}}>{question9}</span>
              </div> : null}
            </div>
            <div style={{marginBottom: '24px'}}>
              <ProFormRadio.Group
                label={<span style={{fontWeight: 'bold'}}>指甲丢失</span>}
                name={'光敏感性'}
                layout={'vertical'}
                fieldProps={{
                  onChange: (e) => {
                    updateFeedback(e.target.value, 10)
                  }
                }}
                options={['无', '1级:无痛性红斑，红斑覆盖小于10% 体表面积', '2级:触痛性红斑，覆盖10～30%体表面积', '3级:红疹大于30% 体表面积，伴有水泡；光敏感']}
              />
              {{question10} ? <div style={{color: 'red'}}>
                <span>结果+建议: </span><span style={{marginLeft: 7}}>{question10}</span>
              </div> : null}
            </div>
            <div style={{marginBottom: '24px'}}>
              <ProFormRadio.Group
                label={<span style={{fontWeight: 'bold'}}>瘙痒症</span>}
                name={'瘙痒症'}
                layout={'vertical'}
                fieldProps={{
                  onChange: (e) => {
                    updateFeedback(e.target.value, 11)
                  }
                }}
                options={['无', '1级:轻度或局部；需要局部的治疗', '2级:广泛分布且间歇性发作；搔抓引起皮肤改变（如水肿，丘疹，抓痕，苔藓样变，渗出/痂皮）；影响工具性日常生活活动', '3级:广泛分布且持续性发作；影响自理性日常生活活动或睡眠；']}
              />
              {{question11} ? <div style={{color: 'red'}}>
                <span>结果+建议: </span><span style={{marginLeft: 7}}>{question11}</span>
              </div> : null}
            </div>
            <div style={{marginBottom: '24px'}}>
              <ProFormRadio.Group
                label={<span style={{fontWeight: 'bold'}}>痤疮样皮疹</span>}
                name={'痤疮样皮疹'}
                layout={'vertical'}
                fieldProps={{
                  onChange: (e) => {
                    updateFeedback(e.target.value, 12)
                  }
                }}
                options={['无', '1级: 丘疹和/ 或脓疱<10% 体表面积，伴或不伴有瘙痒或压痛症状', '2级:  丘疹和/或脓疱覆盖10%～30% 的体表面积，可能伴有/不伴有瘙痒和压痛；伴心理影响；影响', '3级: 丘疹和/或脓疱覆盖大于30%体表面积伴有中到重度症状；影响自理性日常生活活动', '4级:危及生命；丘疹和/或脓疱遍布全身表面，可能伴有/不伴有瘙痒和压痛；伴广泛的二重感染，']}
              />
              {{question12} ? <div style={{color: 'red'}}>
                <span>结果+建议: </span><span style={{marginLeft: 7}}>{question12}</span>
              </div> : null}
            </div>

            <div style={{marginBottom: '24px'}}>
              <ProFormRadio.Group
                label={<span style={{fontWeight: 'bold'}}>斑丘疹</span>}
                name={'斑丘疹'}
                layout={'vertical'}
                fieldProps={{
                  onChange: (e) => {
                    updateFeedback(e.target.value, 13)
                  }
                }}
                options={['无', '1级: 斑丘疹覆盖小于10% 体表面积，伴有/不伴有症状（如：瘙痒，灼烧感，紧绷感）', '2级:斑丘疹覆盖体表面积10～30%，伴有/不伴有症状（如：瘙痒，灼烧感，紧绷感）；影响工具性日常生活活动; 皮疹覆盖体表面积大于30% 体表面积伴或不伴有轻微症状', '3级: 丘疹和/或脓疱覆盖大于30%体表面积伴有中到重度症状；影响自理性日常生b活活动']}
              />
              {{question13} ? <div style={{color: 'red'}}>
                <span>结果+建议: </span><span style={{marginLeft: 7}}>{question13}</span>
              </div> : null}
            </div>
            <div style={{marginBottom: '24px'}}>
              <ProFormRadio.Group
                label={<span style={{fontWeight: 'bold'}}>皮肤硬结</span>}
                name={'皮肤硬结'}
                layout={'vertical'}
                fieldProps={{
                  onChange: (e) => {
                    updateFeedback(e.target.value, 14)
                  }
                }}
                options={['无', '1级: 硬结，能够滑动皮肤至同一平面（滑行）和垂直移动（捏起）', '2级: 中等硬结，能够滑动皮肤，不能够捏起；影响工具性日常生活活动', '3级: 重度硬结，不能滑动或捏皮肤；限制关节或解剖开口活动（如：口和肛门）；影响自理性日常生活活动', '4级: 全身性硬结；呼吸困难或不易进食相关症状或体征']}
              />
              {{question14} ? <div style={{color: 'red'}}>
                <span>结果+建议: </span><span style={{marginLeft: 7}}>{question14}</span>
              </div> : null}
            </div>
            <div style={{marginBottom: '24px'}}>
              <ProFormRadio.Group
                label={<span style={{fontWeight: 'bold'}}>皮肤溃疡</span>}
                name={'皮肤溃疡'}
                layout={'vertical'}
                fieldProps={{
                  onChange: (e) => {
                    updateFeedback(e.target.value, 15)
                  }
                }}
                options={['无', '1级: 溃疡区域小于1cm；红斑不发白，皮肤完整，伴有发热和水肿', '2级: 溃疡区域在1～2cm；皮肤层部分缺失，涉及到皮下组织或皮下脂肪组织', '3级: 溃疡区域大于2cm；皮肤全层缺失，涉及到皮下组织破坏或坏死，可能会延伸到筋膜层', '4级:任何尺寸溃疡，伴广泛的组织破坏，组织坏死或损害到肌肉，骨头或支撑组织，伴有/不伴有全层皮肤缺失']}
              />
              {{question15} ? <div style={{color: 'red'}}>
                <span>结果+建议: </span><span style={{marginLeft: 7}}>{question15}</span>
              </div> : null}
            </div>
          </ProForm>
        </Card>
      </PageContainer>
    </>
  );
};

export default SysMenu;
