import {
  ModalForm,
  ProFormRadio,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormTreeSelect
} from '@ant-design/pro-components';
import '@umijs/max';
import {Form, message} from 'antd';
import React, {useState} from 'react';
import {addDeptUsingPost, listDeptTreeCourtyardUsingGet} from "@/services/swagger/deptController";

interface Props {
  visible: boolean;
  onSubmit: (values: API.DictTypeAddRequest) => void;
  onCancel: () => void;
}

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.DeptAddRequest) => {
  const hide = message.loading('正在添加');
  try {
    await addDeptUsingPost({
      ...fields,
      parentId: Number(fields.flag) === 0 ? 100 : fields.parentId,
      type: Number(fields.flag) === 0 ? 0 : fields.type,
    });
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
  const [form] = Form.useForm<{ name: string; company: string }>()
  const [isDepartment, setIsDepartment] = useState<boolean>(true); // 默认选择科室
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
        name="deptName"
        label="科室名称"
        rules={[
          {
            required: true,
            message: '请输入科室名称',
          },
        ]}
      />
      <ProFormRadio.Group
        name="flag"
        label="科室标记"
        initialValue={'1'}
        fieldProps={{
          onChange: (e: any) => {
            setIsDepartment(Number(e.target.value) === 1);
          },
        }}
        options={[
          {
            label: '院区',
            value: '0',
          },
          {
            label: '科室',
            value: '1',
          },
        ]}
      />
      {isDepartment ? (
        <ProFormSelect
          name="type"
          label="科室类型"
          valueEnum={{
            0: '普通科室',
            1: '输液科室',
          }}
          initialValue={'0'}
          rules={[
            {
              required: true,
              message: '请选择科室类型',
            },
          ]}
        />
      ) : <></>}
      {isDepartment ? (
        <ProFormTreeSelect
          name="parentId"
          label="选择院区"
          initialValue={101}
          request={async () => {
            const res = await listDeptTreeCourtyardUsingGet();
            return res.data ?? [];
          }}
          fieldProps={{
            treeDefaultExpandAll: true,
          }}
          rules={[
            {
              required: true,
              message: '请选择院区',
            },
          ]}
        />
      ) : <></>}
      <ProFormSwitch
        name="status"
        label="科室状态"
        initialValue="0"
      />
    </ModalForm>
  );
};
export default CreateModal;
