import {ModalForm, ProFormSelect, ProFormSwitch, ProFormText} from '@ant-design/pro-components';
import '@umijs/max';
import {Form, message} from 'antd';
import React from 'react';
import {addRoomUsingPost} from "@/services/swagger/roomController";

interface Props {
  visible: boolean;
  onSubmit: (values: API.DictTypeAddRequest) => void;
  onCancel: () => void;
}

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.RoomAddRequest) => {
  const hide = message.loading('正在添加');
  try {
    await addRoomUsingPost(fields);
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
      onFinish={async (values: API.RoomAddRequest) => {
        const success = await handleAdd({
          ...values,
          status: values.status ? 0 : 1
        });
        if (success) {
          onSubmit?.(values);
        }
      }}
    >
      <ProFormText
        name="irName"
        label="输液室名称"
        colProps={{span: 24}}
        rules={[
          {
            required: true, message: '请输入输液室名称',
          }
        ]}/>
      <ProFormText
        colProps={{span: 8}}
        name="phone"
        label="电话"/>

      <ProFormText
        colProps={{span: 8}}
        name="numberPoint"
        label="取号点"/>
      <ProFormText
        colProps={{span: 8}}
        name="irPlace"
        label="输液地点"/>
      <ProFormSelect
        colProps={{span: 8}}
        name="smsTemplateId"
        label="短信模板"
      />
      <ProFormSelect
        colProps={{span: 8}}
        name="patType"
        label="可接待患者类型"
        valueEnum={{
          0: '门诊',
          1: '急诊',
        }}/>
      <ProFormSwitch
        name="status"
        colProps={{span: 8}}
        label="输液室状态"
        initialValue="0"
      />
    </ModalForm>
  );
};
export default CreateModal;
