import {ModalForm, ProFormDigit, ProFormSelect, ProFormSwitch, ProFormText} from '@ant-design/pro-components';
import '@umijs/max';
import {Form, message} from 'antd';
import React from 'react';
import {addSeatUsingPost} from "@/services/swagger/seatController";
import {useLocation} from "@umijs/max";
import {listRoomAllUsingGet} from "@/services/swagger/roomController";

interface Props {
  visible: boolean;
  onSubmit: (values: API.SeatAddRequest) => void;
  onCancel: () => void;
}

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.SeatAddRequest) => {
  const hide = message.loading('正在添加');
  try {
    await addSeatUsingPost(fields);
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
      title="创建座位"
      open={visible}
      form={form}
      grid={true}
      modalProps={{
        destroyOnClose: true,
        onCancel: () => onCancel?.(),

      }}
      submitTimeout={2000}
      onFinish={async (values: API.SeatAddRequest) => {
        const success = await handleAdd({
          ...values,
          status: values.status ? 0 : 1,
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
        colProps={{span: 12}}
        rules={[
          {
            required: true, message: '请输入输液室名称',
          }
        ]}/>
      <ProFormSelect
        colProps={{span: 12}}
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
export default CreateModal;
