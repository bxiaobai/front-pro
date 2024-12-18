// DateForm.tsx
import React, { useEffect, useState } from "react";
import { Col, Flex, Radio, Row } from "antd";
import { ProForm, ProFormDatePicker } from "@ant-design/pro-components";
import { formatDateToYYYYMMDD } from "@/utils/date";

interface Props {
  onSelectTime: (selectedTimes: { id: number, time: string }[], type: number, date: string) => void; // 更新回调函数
  times: API.SourceApptsVO[];
  recommendedTimes: { id: number, time: string }[]; // 推荐的时间
  recalculateRecommendedTimes: (medicine: string, startTime: string) => void; // 重新计算推荐时间的方法
}

// 块元素
const Block: React.FC<
  { sourceApptsVO: API.SourceApptsVO, selected: boolean; onClick: () => void }
> = ({
       sourceApptsVO,
       selected,
       onClick
     }) => {
  return (
    <div
      style={{
        backgroundColor: selected ? '#1890ff' : '#f0f2f5',
        color: selected ? '#fff' : '#000',
        border: '1px solid #d9d9d9',
        borderRadius: '4px',
        height: '50px',
        minWidth: '50px',
        textAlign: 'center',
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      <Flex vertical>
        <div>{sourceApptsVO.time}</div>
        <div>{sourceApptsVO.normalUsedNum + '/' + sourceApptsVO.normalNum}</div>
      </Flex>
    </div>
  );
};

const DateForm: React.FC<Props> = ({ onSelectTime, times, recommendedTimes, recalculateRecommendedTimes }) => {
  // 添加表单
  const [selectedTimes, setSelectedTimes] = useState<{ id: number, time: string }[]>([]);
  // 号源类型
  const [type, setType] = useState(0);
  // 选择的时间
  const [date, setDate] = useState<string>(formatDateToYYYYMMDD(Date.now()));

  // 处理时间块点击事件
  const handleTimeClick = (time: API.SourceApptsVO) => {
    setSelectedTimes((prevSelectedTimes) => {
      const existingIndex = prevSelectedTimes.findIndex(t => t.id === time.id);
      if (existingIndex !== -1) {
        // 如果已经选中，则移除
        return prevSelectedTimes.filter(t => t.id !== time.id);
      } else {
        // 否则添加
        return [...prevSelectedTimes, { id: time.id, time: time.time }] as { id: number, time: string }[];
      }
    });
  };

  // 放入号源类型
  const onChange = (e: any) => {
    setType(e.target.value);
    // 当类型改变时，重新调用 onSelectTime
    onSelectTime(selectedTimes, e.target.value, date);
  };

  // 放入时间类型
  const onChangeDate = (date: any, dateString: string) => {
    setDate(dateString);
    // 当日期改变时，重新调用 onSelectTime
    onSelectTime(selectedTimes, type, dateString);
  };

  // 将选中的时间块传递给父组件
  useEffect(() => {
    onSelectTime(selectedTimes, type, date);
  }, [selectedTimes, onSelectTime]);

  // 自动选择推荐的时间
  useEffect(() => {
    if (recommendedTimes.length > 0) {
      setSelectedTimes(recommendedTimes);
    }
  }, [recommendedTimes]);

  return (
    <Row>
      <Col span={4}>
        <Flex gap={8} align={'center'} style={{ height: 50 }}>
          <ProForm
            initialValues={{
              date: date,
            }}
            layout={'inline'}
            submitter={false}
          >
            <ProFormDatePicker name="date" fieldProps={{
              onChange: onChangeDate,
            }} label="日期"/>
          </ProForm>
        </Flex>
      </Col>
      <Col span={16}>
        <Flex gap={8}>
          <div style={{ height: 50, minWidth: 50, textAlign: 'center', }}>
            <Flex vertical>
              <div>时间</div>
              <div>号源</div>
            </Flex>
          </div>
          <div>
            <Flex gap={8}>
              {times.map((time) => (
                <Block
                  key={time.id}
                  sourceApptsVO={time}
                  selected={selectedTimes.some(t => String(t.id) === String(time.id))}
                  onClick={() => handleTimeClick(time)}
                />
              ))}
            </Flex>
          </div>
        </Flex>
      </Col>
      <Col span={4}>
        {/* 单选框组 */}
        <div style={{ height: 50, minWidth: 50, textAlign: 'center', }}>
          <Flex vertical align={'center'}>
            <Radio.Group onChange={onChange} value={type}>
              <Radio value={0}>正常号源</Radio>
              <Radio value={1}>临时号源</Radio>
            </Radio.Group>
          </Flex>
        </div>
      </Col>
    </Row>
  );
};

export default DateForm;
