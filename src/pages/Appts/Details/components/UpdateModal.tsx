import {ModalForm, ProFormDigit, ProFormSelect, ProFormTimePicker} from '@ant-design/pro-components';
import '@umijs/max';
import {message} from 'antd';
import React from 'react';
import {updateTemplateUsingPost} from "@/services/swagger/templateController";
import {listRoomAllUsingGet} from "@/services/swagger/roomController";

interface Props {
  oldData?: API.TemplateVO;
  visible: boolean;
  onSubmit: (values: API.TemplateUpdateRequest) => void;
  onCancel: () => void;
}

/**
 * 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: API.TemplateUpdateRequest) => {
  const hide = message.loading('正在更新');
  try {
    await updateTemplateUsingPost(fields);
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
      initialValues={{...oldData, patType: String(oldData.patType)}}
      onFinish={async (values: API.TemplateUpdateRequest) => {
        const success = await handleUpdate({
          ...values,
          id: oldData.id
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
export default UpdateModal;
