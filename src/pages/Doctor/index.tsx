// src/pages/Doctor/index.tsx
import {Button, Card, Descriptions, Flex, message} from "antd";
import useStyles from "@/pages/Doctor/index.style";
import React, {useEffect, useState} from "react";
import dayjs, {Dayjs} from "dayjs";
import CustomCalendar from "./components/CustomCalendar/CustomCalendar";
import AppointmentList from "@/pages/Doctor/components/ApptsDateList/ApptsDateList";
import SeatTypeSelector from "@/pages/Doctor/components/SeatTypeSelector/SeatTypeSelector";
import {listDeptDockerUsingGet} from "@/services/swagger/roomController";
import {PageContainer, ProForm, ProFormSelect} from "@ant-design/pro-components";
import {listSourceUsingPost} from "@/services/swagger/sourceController";
import {getPatInfoUsingGet} from "@/services/swagger/hisHttpController";
import {history} from "@umijs/max";
import {createDetailsUsingPost} from "@/services/swagger/detailsController";


const Doctor = () => {
  const historyLocation = history.location
  const searchParams = new URLSearchParams(historyLocation.search);

  // 提取查询参数
  const userId = parseInt(searchParams.get('userId') || '', 10) || 0;
  const deptId = parseInt(searchParams.get('deptId') || '', 10) || 0;
  const medicalcardno = searchParams.get('medicalcardno') || '';
  const registerId = searchParams.get('registerId') || '';
  const [form] = ProForm.useForm();
  const {styles} = useStyles();
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const [selectedSeatType, setSelectedSeatType] = useState<string>('common');
  //获取得时间
  const [sourcePoolOptions, setSourcePoolOptions] = useState<API.SourceApptsVO[]>([]);
  //患者数据
  const [patientInfo, setPatientInfo] = useState<API.PatVO>({});
  useEffect(() => {
    // 初始化时选择今天的日期
    setSelectedDate(dayjs());
  }, []);

  const handleDateSelect = (date: Dayjs) => {
    setSelectedDate(date);
    // 在这里可以添加其他逻辑，比如向服务器发送请求等
  };
  //根据输液室日期获取是按
  const fetchAvailableTimes = async () => {
    const date = selectedDate?.format('YYYY-MM-DD');
    const irId = form.getFieldValue('id');
    try {
      const res = await listSourceUsingPost({date, irId});
      setSourcePoolOptions(res.data ?? [])
    } catch (error) {
    }
  };
  //初始化日期
  useEffect(() => {
    fetchAvailableTimes();
  }, [selectedDate]);
  //根据卡号获取患者信息
  const fetchCardInfo = async () => {
    try {
      const res = await getPatInfoUsingGet({medicalNumber: medicalcardno});
      setPatientInfo(res.data ?? {})
    } catch (error) {
      console.error('Error fetching available times:', error);
    }
  };

  useEffect(() => {
    fetchCardInfo()
  }, []);

  // 在Doctor.tsx中添加一个状态来存储选中的号源信息数组
  const [selectedAppointments, setSelectedAppointments] = useState<API.SourceApptsVO[]>([]);

// 定义回调函数
  const handleAppointmentsSelect = (appointments: API.SourceApptsVO[]) => {
    setSelectedAppointments(appointments);
  };
  //提交按钮，整合信息
  // 添加提交方法
  const handleSubmit = async () => {
    const formValues = form.getFieldsValue();
    const {id: roomId} = formValues;

    if (!selectedAppointments) {
      message.error('请选择预约时间');
      return;
    }
    const appointmentData: API.DetailsAddRequest = {
      irId: roomId,
      card: patientInfo?.card,
      patName: patientInfo?.name,
      date: selectedDate?.format('YYYY-MM-DD'),
      seatType: selectedSeatType,
      sourceId: selectedAppointments.map(item => item.id).join(','),
      type: 0,
      phone: patientInfo?.phone,
      userId: userId,
      saveFlag: 2,
      times: selectedAppointments.map(item => item.time) as string[],
    };
    try {
      const response = await createDetailsUsingPost(appointmentData);
      if (response.code === 0) {
        message.success('预约成功');
        // 可以在这里重置表单或执行其他操作
        //预约成功刷新号源列表
        fetchAvailableTimes();
      }
    } catch (error) {
    }
  };

  return (
    <PageContainer
      title={false}
      header={{
        breadcrumb: {},
      }}
      footer={[
        <Button key="1" type="primary" onClick={handleSubmit}>
          提交
        </Button>,
      ]}
    >
      <Flex vertical gap={16}>
        <Card className={styles.search}>
          {/* 时间搜索 */}
          <Descriptions title="患者信息" bordered>
            <Descriptions.Item label="姓名">{patientInfo.name}</Descriptions.Item>
            <Descriptions.Item label="年龄">{patientInfo.displayAge}</Descriptions.Item>
            <Descriptions.Item label="性别">{patientInfo.sexCode === 1 ? '男' : '女'}</Descriptions.Item>
            <Descriptions.Item label="联系方式">{patientInfo.phone}</Descriptions.Item>
            <Descriptions.Item label="住址">{patientInfo.companyAddress}</Descriptions.Item>
          </Descriptions>
        </Card>
        {/* 选择时间 */}
        <Flex gap={16}>
          <Card className={styles.date} title={
            <div>
              <Flex gap={36} justify={'flex-end'} align={'center'}>
                <div style={{width: '30%'}}>
                  预约日期
                </div>
                <div style={{width: '70%', display: 'flex', justifyContent: 'flex-end'}}>
                  <ProForm<API.RoomVO>
                    submitter={false}
                    form={form}
                    layout={'inline'}
                  >
                    <ProFormSelect
                      name="id"
                      label="输液室"
                      width={'sm'}
                      request={async () => {
                        const res = await listDeptDockerUsingGet({deptId: deptId});
                        if (res.data && res.data.length > 0) {
                          form.setFieldValue('id', res.data[0].id);
                        }
                        // 确保 res.data 不为 undefined，并且正确映射 label 和 value
                        return (res.data || []).map(item => ({
                          label: item.irName || '', // 确保 label 是字符串
                          value: item.id || 0,      // 确保 value 是数字
                        }));
                      }}
                      placeholder="选择输液室"
                    />
                  </ProForm>
                </div>
              </Flex>
            </div>
          }>
            <CustomCalendar onSelectDate={handleDateSelect}/>
          </Card>
          <Card className={styles.time} title={'选择预约时间'}>
            <Flex gap={36}>
              <Flex vertical style={{width: '40%'}}>
                <AppointmentList appointments={sourcePoolOptions} onSelectAppointments={handleAppointmentsSelect}/>
              </Flex>
              <Flex vertical style={{width: '30%'}}>
                {/* 添加座位类型选择器 */}
                <SeatTypeSelector
                  selectedSeatType={selectedSeatType}
                  onSeatTypeChange={setSelectedSeatType}
                />
              </Flex>
            </Flex>
          </Card>
        </Flex>
      </Flex>
    </PageContainer>
  );
};

export default Doctor;
