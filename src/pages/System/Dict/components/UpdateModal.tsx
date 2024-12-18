import {ModalForm, ProFormSwitch, ProFormText} from '@ant-design/pro-components';
import '@umijs/max';
import {message} from 'antd';
import React from 'react';
import {updateDictTypeUsingPost} from "@/services/swagger/dictTypeController";

interface Props {
  oldData?: API.DictTypeVO;
  visible: boolean;
  onSubmit: (values: API.DictTypeUpdateRequest) => void;
  onCancel: () => void;
}

/**
 * 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: API.DictTypeUpdateRequest) => {
  const hide = message.loading('正在更新');
  try {
    await updateDictTypeUsingPost(fields);
    hide();
    message.success('更新成功');
    return true;
  } catch (error: any) {
    hide();
    message.error('更新失败，' + error.message);
    return false;
  }
};

/**
 * 更新弹窗
 * @param props
 * @constructor
 */
const UpdateModal: React.FC<Props> = (props) => {
  const {oldData, visible, onSubmit, onCancel} = props;
  if (!oldData) {
    return <></>;
  }
  return (
    <ModalForm<{
      name: string;
      company: string;
    }>
      title="创建"
      open={visible}
      modalProps={{
        destroyOnClose: true,
        onCancel: () => onCancel?.(),
      }}
      width={600}
      initialValues={{...oldData, status: oldData.status === 0}}
      onFinish={async (values: API.DictTypeUpdateRequest) => {
        const success = await handleUpdate({
          ...values,
          status: values.status ? 0 : 1,
          id: oldData.id
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
export default UpdateModal;
