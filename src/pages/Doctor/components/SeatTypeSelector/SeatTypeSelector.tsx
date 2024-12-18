// src/pages/Doctor/components/SeatTypeSelector.tsx
import React from 'react';
import classNames from 'classnames';
import './SeatTypeSelector.css'

interface SeatTypeSelectorProps {
  selectedSeatType: string;
  onSeatTypeChange: (seatType: string) => void;
}

const SeatTypeSelector: React.FC<SeatTypeSelectorProps> = ({selectedSeatType, onSeatTypeChange}) => {
  return (
    <div className="seat-type-selector">
      <div className="seat-type-header">选择座位类型</div>
      <div className="seat-types">
        <div
          className={classNames('seat-type', {
            selected: selectedSeatType === 'common',
          })}
          onClick={() => onSeatTypeChange('普通')}
        >
          普通座位
        </div>
        <div
          className={classNames('seat-type', {
            selected: selectedSeatType === 'vip',
          })}
          onClick={() => onSeatTypeChange('VIP')}
        >
          VIP 座位
        </div>
        <div
          className={classNames('seat-type', {
            selected: selectedSeatType === 'bed',
          })}
          onClick={() => onSeatTypeChange('床位')}
        >
          床位
        </div>
      </div>
    </div>
  );
};

export default SeatTypeSelector;
