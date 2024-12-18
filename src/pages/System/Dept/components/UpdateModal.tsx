import {
  ModalForm,
  ProFormRadio,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormTreeSelect
} from '@ant-design/pro-components';
import '@umijs/max';
import {message} from 'antd';
import React, {useState} from 'react';
import {listDeptTreeCourtyardUsingGet, updateDeptUsingPost} from "@/services/swagger/deptController";

interface Props {
  oldData?: API.DeptVO;
  visible: boolean;
  onSubmit: (values: API.DeptUpdateRequest) => void;
  onCancel: () => void;
}

/**
 * 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: API.DeptUpdateRequest) => {
  const hide = message.loading('正在更新');
  try {
    await updateDeptUsingPost({
      ...fields,
      parentId: Number(fields.flag) === 0 ? 101 : fields.parentId,
      type: Number(fields.flag) === 0 ? 101 : fields.type,
    });
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
  const [isDepartment, setIsDepartment] = useState<boolean>(true); // 默认选择科室
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
      initialValues={{...oldData, status: oldData.status === 0, type: String(oldData.type)}}
      onFinish={async (values: API.DeptUpdateRequest) => {
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
export default UpdateModal;
