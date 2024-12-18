import {ModalForm, ProFormSelect, ProFormSwitch, ProFormText} from '@ant-design/pro-components';
import '@umijs/max';
import {message} from 'antd';
import React from 'react';
import {updateRoomUsingPost} from "@/services/swagger/roomController";

interface Props {
  oldData?: API.RoomVO;
  visible: boolean;
  onSubmit: (values: API.RoomUpdateRequest) => void;
  onCancel: () => void;
}

/**
 * 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: API.RoomUpdateRequest) => {
  const hide = message.loading('正在更新');
  try {
    await updateRoomUsingPost(fields);
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
      grid={true}
      modalProps={{
        destroyOnClose: true,
        onCancel: () => onCancel?.(),
      }}
      width={600}
      initialValues={{...oldData, status: oldData.status === 0, patType: String(oldData.patType)}}
      onFinish={async (values: API.RoomUpdateRequest) => {
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
export default UpdateModal;
