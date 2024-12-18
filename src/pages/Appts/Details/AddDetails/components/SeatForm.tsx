import React, {useEffect, useState} from "react";
import {Col, Divider, Flex, Radio, Row, Tag} from "antd";
import SeatGrid from "@/components/SeatGrid";

interface Props {
  seatList: API.SeatLayoutVO[];
  // 新增的回调函数，用于处理座位点击事件
  onSeatClick: (seat: API.SeatVO) => void;
  //默认选择的座位
  selectedSeatId?: number;
}

const seats = [
  {status: '0' as const},
  {status: '1' as const},
  {status: '2' as const},
];

const seatStatus = {
  0: {color: 'gray', label: '可用'},
  1: {color: 'blue', label: '占用'},
  2: {color: 'red', label: '停用'},
};

const SearchForm: React.FC<Props> = ({ selectedSeatId, seatList, onSeatClick}) => {
  const [type, setType] = useState(0);
  const onChange = (e: any) => {
    setType(e.target.value);
  };
  const [selectedSeat, setSelectedSeat] = useState<API.SeatVO | null>({});
  const handleSeatClick = (seat: API.SeatVO) => {
    setSelectedSeat(seat);
    onSeatClick(seat); // 调用父组件传递的回调函数
  };
  useEffect(() => {
    if (selectedSeatId){
      console.log(selectedSeatId)
      setSelectedSeat({
        id: selectedSeatId,
      });
    }
  },[selectedSeatId])

  return (
    <>
      <Row>
        <Col span={12}>
          <Flex>
            <div>
              <span style={{fontWeight: 'bold', fontSize: '20px', marginRight: '20px'}}>座位</span>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <Radio.Group onChange={onChange} value={type}>
                <Radio value={0}>自动选择</Radio>
                <Radio value={1}>手动选择</Radio>
              </Radio.Group>
            </div>
          </Flex>
        </Col>
        <Col span={12}>
          <Flex justify="end">
            {seats.map((seat, index) => {
              const status = seat.status;
              if (status in seatStatus) {
                return (
                  <Tag key={index} color={seatStatus[status].color} style={{marginBottom: 8}}>
                    {seatStatus[status].label}
                  </Tag>
                );
              }
              return null; // 如果状态不在 seatStatus 中，返回 null
            })}
          </Flex>
        </Col>
      </Row>
      <Divider/>
      {seatList.length > 0 ? (
        <Flex gap={24} justify={'space-between'}>
          {seatList.map((item, index) => (
            <div key={index}>
              <SeatGrid
                seatLayoutVO={item}
                onSeatClick={handleSeatClick}
                clickable={true}
                selectedSeatId={selectedSeat?.id as number} // 传递选中的座位 ID
              />
              <Divider/>
            </div>
          ))}
        </Flex>
      ) : (
        <div>输液室没有座位数据</div>
      )}
    </>
  );
};

export default SearchForm;
