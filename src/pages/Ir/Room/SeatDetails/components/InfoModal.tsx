import '@umijs/max';
import {Descriptions, Modal, Tag} from 'antd';
import React from 'react';

interface Props {
  oldData?: API.SeatVO;
  visible: boolean;
  onCancel: () => void;
  roomName?: string;
}


/**
 * 更新弹窗
 * @param props
 * @constructor
 */
const UpdateModal: React.FC<Props> = (props) => {
  const {oldData, visible, onCancel, roomName} = props;
  if (!oldData) {
    return <></>;
  }
  return (
    <Modal title="座位详情" open={visible} onCancel={() => onCancel?.()} width={800} footer={false}>
      <Descriptions bordered column={2}>
        <Descriptions.Item label="座位号">{oldData.seatNumber}</Descriptions.Item>
        {roomName ?
          <Descriptions.Item label="所属输液室">
            <Tag color={'blue'}>{roomName}</Tag>
          </Descriptions.Item>
          : <></>}
        <Descriptions.Item label="区域">{oldData.area}</Descriptions.Item>
        <Descriptions.Item label="所属行">{oldData.seatRow}</Descriptions.Item>
        <Descriptions.Item label="所属列">{oldData.seatCol}</Descriptions.Item>
        <Descriptions.Item label="可接待患者类型">
          <Tag color={oldData.patType === 0 ? 'blue' : 'red'}>{oldData.patType === 0 ? '门诊' : '急诊'}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="输液室状态">
          <Tag color={oldData.status === 0 ? 'blue' : 'red'}>{oldData.status === 0 ? '正常' : '异常'}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="标签">
          <Tag color={oldData.flag === 'vip' ? 'blue' : oldData.flag === 'common' ? 'green' : 'yellow'}>
            {oldData.flag === 'vip' ? 'VIP' : oldData.flag === 'common' ? '普通' : '床位'}
          </Tag>
        </Descriptions.Item>
      </Descriptions>;
    </Modal>
  )
};
export default UpdateModal;
