import React, {useEffect, useState} from "react";
import type {CalendarProps} from 'antd';
import {Calendar, Col, Row, Select} from "antd";
import dayjs, {Dayjs} from 'dayjs';
import classNames from 'classnames';
import useStyle from "@/pages/Doctor/components/CustomCalendar/index.style";

interface CustomCalendarProps {
  onSelectDate: (date: Dayjs) => void;
}

const CustomCalendar: React.FC<CustomCalendarProps> = ({onSelectDate}) => {
  const {styles} = useStyle();
  const [selectedYear, setSelectedYear] = useState<number>(dayjs().year());
  const [selectedMonth, setSelectedMonth] = useState<number>(dayjs().month());
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);

  useEffect(() => {
    if (isInitialLoad) {
      setSelectedDate(dayjs());
      onSelectDate(dayjs());
      setIsInitialLoad(false);
    }
  }, [onSelectDate, isInitialLoad]);

  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
    setSelectedYear(value.year());
    setSelectedMonth(value.month());
  };

  const fullCellRender = (current: Dayjs) => {
    const isToday = current.isSame(dayjs(), 'day');
    const isSelected = selectedDate && current.isSame(selectedDate, 'day');
    const isWeekend = current.day() === 0 || current.day() === 6;
    const isCurrentMonth = current.month() === selectedMonth && current.year() === selectedYear;

    return (
      <div
        className={classNames(styles.dateCell, {
          [styles.current]: isSelected,
          [styles.today]: isToday,
        })}
        onClick={() => {
          setSelectedDate(current);
          onSelectDate(current);
        }}
      >
        <div className={styles.text}>
          <span
            className={classNames({
              [styles.weekend]: isWeekend,
              gray: !isCurrentMonth,
            })}
          >
            {current.format('DD')}
          </span>
          <div className={styles.lunar}>可约</div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.wrapper}>
      <Calendar
        fullscreen={false}
        headerRender={({value, type, onChange}) => {
          if (!value) return null;
          const monthOptions = [];
          for (let i = 0; i < 12; i++) {
            monthOptions.push(
              <Select.Option key={i} value={i}>
                {dayjs().month(i).format('MMMM')}
              </Select.Option>,
            );
          }
          const currentYear = value.year();

          const yearOptions = [];
          for (let i = currentYear - 10; i <= currentYear + 10; i++) {
            yearOptions.push(
              <Select.Option key={i} value={i}>
                {i}
              </Select.Option>,
            );
          }
          return (
            <div style={{padding: 8}}>
              <Row gutter={8}>
                <Col>
                  <Select
                    size="small"
                    popupMatchSelectWidth={false}
                    value={selectedYear}
                    onChange={(newYear) => {
                      setSelectedYear(newYear);
                      const now = value.clone().year(newYear);
                      onChange(now);
                    }}
                    style={{width: 100}}
                  >
                    {yearOptions}
                  </Select>
                </Col>
                <Col>
                  <Select
                    size="small"
                    popupMatchSelectWidth={false}
                    value={selectedMonth}
                    onChange={(newMonth) => {
                      setSelectedMonth(newMonth);
                      const now = value.clone().month(newMonth);
                      onChange(now);
                    }}
                    style={{width: 100}}
                  >
                    {monthOptions}
                  </Select>
                </Col>
              </Row>
            </div>
          );
        }}
        onPanelChange={onPanelChange}
        mode="month"
        fullCellRender={fullCellRender}
      />
    </div>
  );
};

export default CustomCalendar;
