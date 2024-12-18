import {ModalForm, ProFormDateRangePicker, ProFormSelect} from '@ant-design/pro-components';
import '@umijs/max';
import {Form, message} from 'antd';
import React from 'react';
import {listRoomAllUsingGet} from "@/services/swagger/roomController";
import {addSourceUsingPost} from "@/services/swagger/sourceController";

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
  const hide = message.loading('正在生成');
  try {
    await addSourceUsingPost(fields);
    hide();
    message.success('生成成功');
    return true;
  } catch (error: any) {
    hide();
    message.error('生成失败，' + error.message);
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
      width={600}
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
      <ProFormDateRangePicker
        name="dates"
        label="日期区间"
        colProps={{span: 24}}
        width={'xl'}
        rules={[{
          required: true, message: '日期必填',
        }]}/>
    </ModalForm>
  );
};
export default CreateModal;
