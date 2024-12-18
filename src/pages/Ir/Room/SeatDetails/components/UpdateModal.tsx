import {ModalForm, ProFormDigit, ProFormSelect, ProFormSwitch, ProFormText} from '@ant-design/pro-components';
import '@umijs/max';
import {message} from 'antd';
import React from 'react';
import {updateSeatUsingPost} from "@/services/swagger/seatController";
import {useLocation} from "@@/exports";

interface Props {
  oldData?: API.DictTypeVO;
  visible: boolean;
  onSubmit: (values: API.SeatUpdateRequest) => void;
  onCancel: () => void;
}

/**
 * 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: API.SeatUpdateRequest) => {
  const hide = message.loading('正在更新');
  try {
    await updateSeatUsingPost(fields);
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
  const state = useLocation().state as { id: number }
  if (!oldData) {
    return <></>;
  }
  return (
    <ModalForm<{
      name: string;
      company: string;
    }>
      title="修改座位"
      open={visible}
      grid={true}
      modalProps={{
        destroyOnClose: true,
        onCancel: () => onCancel?.(),
      }}
      width={600}
      initialValues={{...oldData, status: oldData.status === 0}}
      onFinish={async (values: API.SeatUpdateRequest) => {
        const success = await handleUpdate({
          ...values,
          status: values.status ? 0 : 1,
          id: oldData.id,
          irId : state.id
        });
        if (success) {
          onSubmit?.(values);
        }
      }}
    >
      <ProFormText
        name="seatNumber"
        label="座位号"
        tooltip="已区域开始作为规范例如，A01"
        colProps={{span: 24}}
        rules={[
          {
            required: true, message: '请输入输液室名称',
          }
        ]}/>
      <ProFormText
        colProps={{span: 8}}
        name="area"
        tooltip="按照区域分组。例如A、B、C"
        label="所在区域"
        rules={[
          {
            required: true, message: '请输入区域',
          }
        ]}
      />
      <ProFormDigit
        colProps={{span: 8}}
        name="seatRow"
        tooltip="座位所在行的数字"
        rules={[
          {
            required: true, message: '请输入行号',
          }
        ]}
        label="行号"/>
      <ProFormDigit
        colProps={{span: 8}}
        tooltip="座位所在列数字"
        name="seatCol"
        rules={[
          {
            required: true, message: '请输入列号',
          }
        ]}
        label="列号"/>
      <ProFormSelect
        colProps={{span: 8}}
        name="flag"
        label="座位标签"
        rules={[
          {
            required: true, message: '座位标签必填',
          }
        ]}
        initialValue={'common'}
        valueEnum={{
          'vip': 'VIP',
          'common': '普通',
          'bed': '床位'
        }}/>
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
