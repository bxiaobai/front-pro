// index.tsx
import {PageContainer} from '@ant-design/pro-components';
import '@umijs/max';
import React, {useEffect, useState} from 'react';
import SearchForm from "@/pages/Appts/Details/AddDetails/components/SearchForm";
import SeatForm from "@/pages/Appts/Details/AddDetails/components/SeatForm";
import {Button, Card, Divider, Flex, message} from "antd";
import {listSourceUsingPost} from "@/services/swagger/sourceController";
import DateForm from "@/pages/Appts/Details/AddDetails/components/DateForm";
import {formatDateToYYYYMMDD} from "@/utils/date";
import {useModel} from "@@/exports";
import {listSeatAllUsingGet} from "@/services/swagger/seatController";
import {createDetailsUsingPost} from "@/services/swagger/detailsController";
import {history} from "@umijs/max"; // 假设存在这个 API 方法

/**
 *
 * @constructor
 */
const UserAdminPage: React.FC = () => {
  // 进入页面时加载对应的信息
  const {initialState} = useModel('@@initialState');
  // 定义回调函数来处理选中的时间数据
  const [selectedTimes, setSelectedTimes] = useState<API.SourceApptsVO[]>([]);
  const [type, setType] = useState<number>(0);
  const [date, setDate] = useState<string>(formatDateToYYYYMMDD(Date.now()));
  // 服务端获取到的时间列表
  const [times, setTimes] = useState<API.SourceApptsVO[]>([]);
  const [seatList, setSeatList] = useState<API.SeatLayoutVO[]>([]);
  const [selectedSeat, setSelectedSeat] = useState<API.SeatVO | null>(null);
  // 推荐的时间
  const [recommendedTimes, setRecommendedTimes] = useState<{ id: number, time: string }[]>([]);
  //预约的药品信息
  const [selectedDrugs, setSelectedDrugs] = useState<API.IrStrListVO[]>([]);
  //预约的患者信息
  const [patientInfo, setPatientInfo] = useState<API.Brxx>()
  const handleSelectTime = (selectedTimes: { id: number, time: string }[], type: number, date: string) => {
    setSelectedTimes(selectedTimes);
    setType(type);
    setDate(date);
  };

  const handleSeatSelect = (seat: API.SeatVO) => {
    setSelectedSeat(seat);
    console.log('Selected Seat:', seat);
  };

  const handleSearch = (values: any) => {
    // 假设 values 中包含药品信息和开始时间
    setSelectedDrugs(values.selectedDrugs)
    setPatientInfo(values.patientInfo)
    // const { medicine, startTime } = values;
    // // 根据药品和开始时间计算推荐的时间
    // const recommended = calculateRecommendedTimes(times, medicine, startTime);
    // setRecommendedTimes(recommended);
  };

  // 初始化时间
  useEffect(() => {
    const currentDate = formatDateToYYYYMMDD(Date.now());
    listSourceUsingPost({date: currentDate})
      .then(res => {
        if (res.data) {
          setTimes(res.data);
        } else {
          setTimes([]);
        }
      })
      .catch(error => {
        console.error('Error fetching time data:', error);
      });
  }, [date]);

  // 初始化座位
  useEffect(() => {
    listSeatAllUsingGet({id: initialState?.currentUser?.deptId as number}).then(res => {
      setSeatList(res.data ?? []);
    });
  }, [type, date]);

  // 提交处理函数
  const handleSubmit = async () => {
    if (!selectedTimes || selectedTimes.length === 0) {
      message.error('请选择时间');
      return;
    }
    if (!selectedSeat) {
      message.error('请选择座位');
      return;
    }
    const appointmentData: API.DetailsAddRequest = {
      date: date,
      type: type,
      irId: 9,
      phone: '16639579302',
      saveFlag: 0,
      card: patientInfo?.blh,
      times: selectedTimes.map(item => item.time) as string[], // 将时间数组转换为逗号分隔的字符串
      sourceId: selectedTimes.map(item => item.id).join(','), //
      irStrListVO: selectedDrugs,
      patName: patientInfo?.brxm,
      seatNum: selectedSeat.seatNumber,
      seatType: selectedSeat.flag,
      seatId: selectedSeat.id,

      // 其他需要的信息
    };
    const res = await createDetailsUsingPost(appointmentData)
    if (res.code === 0) {
      message.success('预约成功');
      history.push('/list');
    }

  };

  return (
    <PageContainer
      footer={[
        <Button key="3" onClick={() => {
          // 重置逻辑
          setSelectedTimes([]);
          setSelectedSeat(null);
          setDate(formatDateToYYYYMMDD(Date.now()));
          setType(0);
        }}>重置</Button>,
        <Button key="2" type="primary" onClick={handleSubmit}>
          提交
        </Button>,
      ]}>
      <Flex vertical gap={8}>
        {/* 头部搜索 */}
        <SearchForm onSearch={handleSearch}/>
        <Card>
          {/* 选择时间 */}
          <DateForm onSelectTime={handleSelectTime} times={times} recommendedTimes={recommendedTimes}/>
          <Divider/>
          {/* 选择座位 */}
          <SeatForm seatList={seatList} onSeatClick={handleSeatSelect}/>
        </Card>
      </Flex>
    </PageContainer>
  );
};

export default UserAdminPage;
