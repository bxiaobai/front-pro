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
import {
  autoSelectUsingPost,
  countDrugTimeUsingPost,
  createDetailsUsingPost,
  getDetailsByIdUsingGet
} from "@/services/swagger/detailsController";
import {history, useLocation} from "@umijs/max";

const UserAdminPage: React.FC = () => {
  const {initialState} = useModel('@@initialState');
  const [selectedTimes, setSelectedTimes] = useState<API.SourceApptsVO[]>([]);
  const [type, setType] = useState<number>(0);
  const [date, setDate] = useState<string>();
  const [times, setTimes] = useState<API.SourceApptsVO[]>([]);
  const [seatList, setSeatList] = useState<API.SeatLayoutVO[]>([]);
  const [selectedSeat, setSelectedSeat] = useState<API.SeatVO | null>(null);
  const [selectedDrugs, setSelectedDrugs] = useState<API.IrStrListVO[]>([]);
  const [patientInfo, setPatientInfo] = useState<API.PatVO | undefined>(undefined);

  const handleSelectTime = (selectedTimes: { id: number, time: string }[], type: number, date: string) => {
    setSelectedTimes(selectedTimes);
    setType(type);
    setDate(date);
  };

  const location: any = useLocation();

  useEffect(() => {
    if (location.state?.id !== undefined) {
      console.log(location.state.id)
      getDetailsByIdUsingGet({id: location.state.id})
        .then(res => {
          if (res.data) {
            // 假设 res.data 包含所有需要的状态信息
            setPatientInfo({
              ...res.data,
            });
            //传递时间
            setDate(res.data.date);
            if (res.data?.irStrListVO) {
              setSelectedDrugs(prevDrugs => [...prevDrugs, ...res?.data?.irStrListVO ?? []]);
            }
            // 使用可选链操作符和空值合并操作符
            const sourceIds = res.data.sourceId?.split(",") ?? [];
            const times = res.data.time?.split(",") ?? [];
            const newSelectedTimes = sourceIds.map((id, index) => ({
              id: Number(id),
              time: times[index] ?? "" // 根据索引获取对应的 time，如果不存在则使用空字符串
            }));
            setSelectedTimes([...newSelectedTimes]);
            // setType(0);
            setSelectedSeat({
              id: res.data?.seatId as number,
              irId: initialState?.currentUser?.deptId
            });
          }
        })

    }
  }, [location.state?.id]);

  const handleSeatSelect = (seat: API.SeatVO) => {
    setSelectedSeat(seat);
  };

  const handleSearch = (values: any) => {
    setSelectedDrugs(values.selectedDrugs);
    setPatientInfo(values.patientInfo);

  };

  useEffect(() => {
    listSourceUsingPost({date: date})
      .then(res => {
        setTimes(res.data ?? []);
      })
  }, [date]);

  useEffect(() => {
    listSeatAllUsingGet({id: initialState?.currentUser?.deptId as number, date: date as string}).then(res => {
      setSeatList(res.data ?? []);
    });
  }, [type, date]);

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
      id: location.state?.id,
      date: date,
      type: type,
      irId: initialState?.currentUser?.deptId,
      phone: '16639579302',
      saveFlag: 0,
      card: patientInfo?.card,
      times: selectedTimes.map(item => item.time) as string[],
      sourceId: selectedTimes.map(item => item.id).join(','),
      irStrListVO: selectedDrugs,
      patName: patientInfo?.name,
      seatNum: selectedSeat.seatNumber,
      seatType: selectedSeat.flag,
      seatId: selectedSeat.id,
    };
    const res = await createDetailsUsingPost(appointmentData);
    if (res.code === 0) {
      message.success('预约成功');
      history.push('/list');
    }
  };

  //自动计算时间方法
  const [totalTime, setTotalTime] = useState<number>()
  //总需要时间
  const recalculateRecommendedTimes = async (yzxxs: API.Yzxxs[]) => {
    const res = await countDrugTimeUsingPost(yzxxs)
    setTotalTime(res.data)
    message.success('所需时间大约' + res.data + '小时')
  }
  //自动计算时间
  const handleAuto = async () => {
    console.log(selectedTimes)
    const min = Math.min(...selectedTimes.map(item => parseInt(item.time as string, 10))).toString().padStart(2, '0')
    console.log(min)
    const data: API.AutoRequest = {
      date: date,
      irId: initialState?.currentUser?.deptId,
      totalTime: totalTime,
      startTime: min === 'Infinity' ? '08' : min,
    }
    const res = await autoSelectUsingPost(data)
    // 假设 sourceId 和 time 可以有默认值

    // 使用可选链操作符和空值合并操作符
    const newSelectedTimes = res.data?.sourceId.map((id) => ({
      id: Number(id),
      time: "" // 根据索引获取对应的 time，如果不存在则使用空字符串
    }));
    setSelectedTimes([...newSelectedTimes as any]);
    setSelectedSeat({
      id: res.data?.seatId as number,
      irId: initialState?.currentUser?.deptId
    })
  }
  useEffect(() => {
    if (selectedDrugs.length > 0) {
      recalculateRecommendedTimes(selectedDrugs[0].yzxxsList as API.Yzxxs[])
    }
  }, [selectedDrugs])
  useEffect(() => {
    if (totalTime) {
      handleAuto()
    }
  }, [totalTime])
  return (
    <PageContainer
      footer={[
        <Button key="3" onClick={() => {
          console.log(selectedDrugs)
        }}>查看药品</Button>,
        <Button key="3" onClick={() => {
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
        <SearchForm patInfo={patientInfo ?? {}} onSearch={handleSearch}/>
        <Card>
          <DateForm
            selectedTime={selectedTimes}
            data={date as string}
            onSelectTime={handleSelectTime}
            times={times}
          />
          <Divider/>
          <SeatForm selectedSeatId={selectedSeat?.id} seatList={seatList} onSeatClick={handleSeatSelect}/>
        </Card>
      </Flex>
    </PageContainer>
  );
};

export default UserAdminPage;
