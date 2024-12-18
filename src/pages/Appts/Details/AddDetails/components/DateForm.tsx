import React, {useEffect, useState} from "react";
import {Col, Flex, Radio, Row} from "antd";
import {ProForm, ProFormDatePicker} from "@ant-design/pro-components";
import dayjs from "dayjs"; // 引入 dayjs

interface Props {
  onSelectTime: (selectedTimes: { id: number, time: string }[], type: number, date: string) => void; // 更新回调函数
  times: API.SourceApptsVO[];
  data: string;
  selectedTime: API.SourceApptsVO[];
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

const DateForm: React.FC<Props> =
  ({
     selectedTime,
     data,
     onSelectTime,
     times,
   }) => {
    // 添加表单
    const [selectedTimes, setSelectedTimes] = useState<{ id: number, time: string }[]>([]);
    // 号源类型
    const [type, setType] = useState(0);
    // 选择的时间
    const [date, setDate] = useState<dayjs.Dayjs>(() => {
      // 初始化时优先使用 data，如果没有则使用当前日期
      return data ? dayjs(data) : dayjs();
    });

    // 当 data 发生变化时，更新 date 状态
    useEffect(() => {
      if (data && !date.isSame(dayjs(data), 'day')) {
        setDate(dayjs(data));
      }
    }, [data]);

    // 当 selectedTime 发生变化时，更新 selectedTimes 状态
    useEffect(() => {
      if (selectedTime.length > 0) {
        const filteredTimes = selectedTime
          .filter(time => time.id !== undefined && time.time !== undefined)
          .map(time => ({id: time.id!, time: time.time!}));
        console.log(filteredTimes)
        setSelectedTimes(filteredTimes);
      }
    }, [selectedTime]);

    // 处理时间块点击事件
    const handleTimeClick = (time: API.SourceApptsVO) => {
      setSelectedTimes((prevSelectedTimes) => {
        const existingIndex = prevSelectedTimes.findIndex(t => t.id === time.id);
        if (existingIndex !== -1) {
          // 如果已经选中，则移除
          return prevSelectedTimes.filter(t => t.id !== time.id);
        } else {
          // 否则添加
          return [...prevSelectedTimes, {id: time.id!, time: time.time!}] as { id: number, time: string }[];
        }
      });
    };
    // 放入号源类型
    const onChange = (e: any) => {
      setType(e.target.value);
      // 当类型改变时，重新调用 onSelectTime
      onSelectTime(selectedTimes, e.target.value, date.format('YYYY-MM-DD'));
    };

    // 放入时间类型
    const onChangeDate = (date: dayjs.Dayjs | null) => {
      if (date) {
        setDate(date);
        // 当日期改变时，重新调用 onSelectTime
        onSelectTime(selectedTimes, type, date.format('YYYY-MM-DD'));
      }
    };
    useEffect(() => {
      onSelectTime(selectedTimes, type, date.format('YYYY-MM-DD'))
    }, [date])

    return (
      <Row>
        <Col span={4}>
          <Flex gap={8} align={'center'} style={{height: 50}}>
            <ProForm
              initialValues={{
                date: date,
              }}
              layout={'inline'}
              submitter={false}
            >
              <ProFormDatePicker
                name="date"
                fieldProps={{
                  value: date, // 使用 value 属性来控制日期选择器的值
                  onChange: onChangeDate,
                }}
                label="日期"
              />
            </ProForm>
          </Flex>
        </Col>
        <Col span={16}>
          <Flex gap={8}>
            <div style={{height: 50, minWidth: 50, textAlign: 'center'}}>
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
                    selected={selectedTimes.some(t => Number(t.id) === Number(time.id))}
                    onClick={() => handleTimeClick(time)}
                  />
                ))}
              </Flex>
            </div>
          </Flex>
        </Col>
        <Col span={4}>
          {/* 单选框组 */}
          <div style={{height: 50, minWidth: 50, textAlign: 'center'}}>
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
