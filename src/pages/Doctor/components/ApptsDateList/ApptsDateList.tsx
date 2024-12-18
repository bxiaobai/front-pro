import React, {useEffect, useState} from 'react';
import classNames from 'classnames';
import './ApptsDateList.css';
import {listRoomAllUsingGet} from "@/services/swagger/roomController";

interface AppointmentListProps {
  appointments: API.SourceApptsVO[];
  onSelectAppointments: (appointments: API.SourceApptsVO[]) => void; // 修改回调函数参数为数组
}

const AppointmentList: React.FC<AppointmentListProps> = ({appointments, onSelectAppointments}) => {
  const [selectedAppointmentIndices, setSelectedAppointmentIndices] = useState<number[]>([]);
  // 全部输液室列表，用于映射
  const [allRoom, setAllRoom] = useState<API.RoomVO[]>([]);

  useEffect(() => {
    const res = listRoomAllUsingGet();
    res.then(res => {
      if (res.data) {
        setAllRoom(res.data);
      }
    });
  }, []); // 确保只在组件挂载时调用一次

  const handleAppointmentClick = (index: number) => {
    setSelectedAppointmentIndices(prevIndices => {
      if (prevIndices.includes(index)) {
        // 如果已经选中，则取消选中
        return prevIndices.filter(i => i !== index);
      } else {
        // 否则添加到选中列表
        return [...prevIndices, index];
      }
    });
  };

  useEffect(() => {
    // 根据选中的索引获取对应的号源信息数组
    const selectedAppointments = selectedAppointmentIndices.map(index => appointments[index]);
    onSelectAppointments(selectedAppointments);
  }, [selectedAppointmentIndices, appointments]); // 移除 onSelectAppointments 作为依赖项

  return (
    <div className="appointment-list">
      {/* 添加表头 */}
      <div className="appointment-header">
        <div className="appointment-column time">时间</div>
        <div className="appointment-column booked-total">已预约/总</div>
        <div className="appointment-column remaining">剩余</div>
        <div className="appointment-column source-pool">来源池</div>
      </div>
      {appointments.length === 0 ? (
        <div style={{color: "red"}}>当日没有号源</div>
      ) : (
        appointments.map((appointment, index) => (
          <div
            key={index}
            className={classNames('appointment-item', {
              selected: selectedAppointmentIndices.includes(index),
            })}
            onClick={() => handleAppointmentClick(index)}
          >
            <div className="appointment-column time">{appointment.time}</div>
            <div className="appointment-column booked-total">
              <span
                className={classNames(appointment.normalNum === 0 ? 'red' : 'blue', {
                  white: selectedAppointmentIndices.includes(index),
                })}
              >
                {appointment.normalUsedNum}/{appointment.normalNum}
              </span>
            </div>
            <div className="appointment-column remaining">{appointment.normalNum}</div>
            <div className="appointment-column source-pool">
              {allRoom?.find((room) => room.id === appointment.irId)?.irName || '未找到房间'}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AppointmentList;
