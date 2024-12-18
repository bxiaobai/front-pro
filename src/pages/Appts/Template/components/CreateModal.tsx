import {ModalForm, ProFormDigit, ProFormSelect, ProFormTimePicker} from '@ant-design/pro-components';
import '@umijs/max';
import {Form, message} from 'antd';
import React from 'react';
import {listRoomAllUsingGet} from "@/services/swagger/roomController";
import {addTemplateUsingPost} from "@/services/swagger/templateController";

interface Props {
  visible: boolean;
  onSubmit: (values: API.TemplateAddRequest) => void;
  onCancel: () => void;
}

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.TemplateAddRequest) => {
  const hide = message.loading('正在添加');
  try {
    await addTemplateUsingPost(fields);
    hide();
    message.success('创建成功');
    return true;
  } catch (error: any) {
    hide();
    message.error('创建失败，' + error.message);
    return false;
  }
};

/**
 * 创建弹窗
 * @param props
 * @constructor
 */
const CreateModal: React.FC<Props> = (props) => {
  const {visible, onSubmit, onCancel} = props;
  const [form] = Form.useForm<{ name: string; company: string }>();
  return (
    <ModalForm<{
      name: string;
      company: string;
    }>
      title="创建输液室"
      open={visible}
      form={form}
      grid={true}
      modalProps={{
        destroyOnClose: true,
        onCancel: () => onCancel?.(),

      }}
      submitTimeout={2000}
      onFinish={async (values: API.TemplateAddRequest) => {
        const success = await handleAdd({
          ...values,
        });
        if (success) {
          onSubmit?.(values);
        }
      }}
    >
      <ProFormSelect
        colProps={{span: 24}}
        name="irId"
        label="所属输液室"
        request={async () => {
          const res = await listRoomAllUsingGet();
          return (res.data || []).map((item) => ({
            label: item.irName,
            value: item.id
          }));
        }}
        rules={[
          {
            required: true, message: '输液室必填',
          }
        ]}
      />
      <ProFormTimePicker
        colProps={{span: 12}}
        name={'startTime'}
        width={'lg'}
        rules={[
          {
            required: true, message: '开始时间必填',
          }
        ]}
        label="开始时间"
      />
      <ProFormTimePicker
        width={'lg'}
        colProps={{span: 12}}
        name={'endTime'}
        rules={[
          {
            required: true, message: '结束时间必填',
          }
        ]}
        label="结束时间"
      />
      {/*数字类型输入框*/}
      <ProFormDigit
        colProps={{span: 12}}
        label="正常号源数量"
        rules={[
          {
            required: true, message: '请输入正常号源数量',
          }
        ]}
        name="normalNum"
      />
      <ProFormDigit
        colProps={{span: 12}}
        label="临时号源数量"
        rules={[
          {
            required: true, message: '请输入临时号源数量',
          }
        ]}
        name="tempNum"/>
      <ProFormSelect
        colProps={{span: 24}}
        name="patType"
        label="可接待患者类型"
        valueEnum={{
          0: '门诊',
          1: '急诊',
        }}/>
    </ModalForm>
  );
};
export default CreateModal;
