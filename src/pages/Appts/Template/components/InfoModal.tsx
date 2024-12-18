import '@umijs/max';
import {Descriptions, Modal, Tag} from 'antd';
import React from 'react';

interface Props {
  oldData?: API.RoomVO;
  visible: boolean;
  onCancel: () => void;
}


/**
 * 更新弹窗
 * @param props
 * @constructor
 */
const UpdateModal: React.FC<Props> = (props) => {
  const {oldData, visible, onCancel} = props;
  if (!oldData) {
    return <></>;
  }
  return (
    <Modal title="详情" open={visible} onCancel={() => onCancel?.()} width={800} footer={false}>
      <Descriptions bordered column={2}>
        <Descriptions.Item label="输液室名称">{oldData.irName}</Descriptions.Item>
        <Descriptions.Item label="电话">{oldData.phone}</Descriptions.Item>
        <Descriptions.Item label="取号点">{oldData.numberPoint}</Descriptions.Item>
        <Descriptions.Item label="输液地点">{oldData.irPlace}</Descriptions.Item>
        <Descriptions.Item label="可接待患者类型">
          <Tag color={oldData.patType === 0 ? 'blue' : 'red'}>{oldData.patType === 0 ? '门诊' : '急诊'}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="输液室状态">
          <Tag color={oldData.status === 0 ? 'blue' : 'red'}>{oldData.status === 0 ? '正常' : '异常'}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="短信模板">
          {oldData.smsTemplateId}
        </Descriptions.Item>
      </Descriptions>;
    </Modal>
  )
};
export default UpdateModal;
