import {ModalForm, ProFormSwitch, ProFormText} from '@ant-design/pro-components';
import '@umijs/max';
import {Form, message} from 'antd';
import React from 'react';
import {addDictTypeUsingPost} from "@/services/swagger/dictTypeController";

interface Props {
  visible: boolean;
  onSubmit: (values: API.DictTypeAddRequest) => void;
  onCancel: () => void;
}

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.DictTypeAddRequest) => {
  const hide = message.loading('正在添加');
  try {
    await addDictTypeUsingPost(fields);
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
      title="创建"
      open={visible}
      form={form}
      modalProps={{
        destroyOnClose: true,
        onCancel: () => onCancel?.(),

      }}
      submitTimeout={2000}
      onFinish={async (values: API.DictTypeAddRequest) => {
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
        name="dictName"
        label="字典名称"
        rules={[
          {
            required: true,
            message: '请输入字典名称',
          },
        ]}
      />
      <ProFormText
        name="dictType"
        label="字典类型名称"
        rules={[
          {
            required: true,
            message: '请输入字典类型名称',
          },
        ]}
      />
      <ProFormSwitch
        name="status"
        label="字典状态"
        initialValue="0"
      />
    </ModalForm>
  );
};
export default CreateModal;
