import React from "react";
import useStyles from "@/components/SeatGrid/index.style";
import seatStop from '@/components/SeatGrid/icon/stop.svg';
import seatDefault from '@/components/SeatGrid/icon/default.svg';
import seatChecked from '@/components/SeatGrid/icon/checked.svg';
import { Divider } from "antd";

interface SeatGridProps {
  seatLayoutVO: API.SeatLayoutVO;
  onSeatClick?: (seatInfo: API.SeatVO) => void;
  clickable?: boolean;
  selectedSeatId?: number; // 接收选中的座位 ID
}

const SeatGrid: React.FC<SeatGridProps> = (props: SeatGridProps) => {
  const { seatLayoutVO, onSeatClick, clickable, selectedSeatId } = props;
  const { styles } = useStyles();

  const getMaxCol = (value: API.SeatVO[]) => {
    return Math.max(...value.map(box => box.seatCol as number));
  };

  // 计算网格容器宽度的方法
  const calculateGridWidth = (maxColCount: number, columnWidth = 50, gutter = 10) => {
    // 计算总宽度，包括列宽和列之间的间隙（如果有的话）
    return (maxColCount * columnWidth) + ((maxColCount - 1) * gutter);
  };

  // 根据状态返回图片
  const getIcon = (status: number) => {
    return status === 0 ? seatDefault : status === 1 ? seatChecked : seatStop;
  };

  // 选中的效果
  const handleSeatClick = (seat: API.SeatVO) => {
    if (clickable) {
      onSeatClick?.(seat);
    }
  };

  // 获取区域颜色的函数
  const getAreaColor = (area: string) => {
    switch (area) {
      case 'A':
        return '#1809ff';
      case 'B':
        return '#ffa940';
      case 'C':
        return '#36cfc9';
      default:
        return 'black'; // 默认颜色
    }
  };

  return (
    <>
      <div>
        <div>
          <div className={styles.title} style={{ backgroundColor: getAreaColor(seatLayoutVO.area as string) }}>
            {seatLayoutVO.area}区
          </div>
        </div>
        <Divider />
        <div className={styles.gridContainer}
             style={{
               gridTemplateColumns: `repeat(${getMaxCol(seatLayoutVO.children ?? [])}, minmax(50px, 50px))`,
               width: calculateGridWidth(getMaxCol(seatLayoutVO.children ?? [])),
             }}>
          {seatLayoutVO.children?.map(box => (
            <div
              onClick={() => handleSeatClick(box)}
              key={box.id}
              className={styles.gridItem}
              style={{
                gridColumnStart: box.seatCol,
                gridRowStart: box.seatRow,
                backgroundImage: `url(${selectedSeatId === box.id ? seatChecked : getIcon(box.status as number)})`,
                color: selectedSeatId === box.id ? 'white' : box.status === 0 ? 'black' : 'white',
                fontWeight: 'bold'
              }}>
              {box.seatNumber}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SeatGrid;
