import React, {useEffect, useState} from "react";
import {Button, Card, Col, Form, Input, Row} from "antd";
import PatientInfoModal from "./PatientInfoModal";
import {getIrInfoUsingGet, getPatInfoUsingGet} from "@/services/swagger/hisHttpController"; // 引入新的 Modal 组件

interface Props {
  onSearch: (values: any) => void;
  patInfo: API.PatVO;
}

const SearchForm: React.FC<Props> = ({ onSearch , patInfo }) => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [irStrListVO, setIrStrListVO] = useState<API.IrStrListVO[]>([]);
  // 患者信息
  const [pat, setPatInfo] = useState<API.PatVO>({...patInfo});
  console.log('patInfo', pat)
  const showModal = () => {
    setIsModalVisible(true);
  };

  useEffect(() => {
    // 当 patInfo 发生变化时，更新 pat 状态
    setPatInfo(patInfo);
    form.setFieldsValue({
      phoneNumber: patInfo.phone,
      cardNumber: patInfo.card,
    });
  }, [patInfo, form]);

  const handleOk = (selectedDrugs: API.IrStrListVO[], patientInfo: API.PatVO) => {
    setIsModalVisible(false);
    // 传递患者信息和选择的药品数据
    onSearch({ patientInfo, selectedDrugs });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = async (values: any) => {
    // 药品信息
    const res = await getIrInfoUsingGet({ medicalNumber: values.cardNumber });
    // 患者信息
    const resPat = await getPatInfoUsingGet({ medicalNumber: values.cardNumber });
    setPatInfo(resPat.data ?? {});
    setIrStrListVO(res.data ?? []);
    showModal();
    form.setFieldValue("phoneNumber", resPat?.data?.card);
  };

  return (
    <Card>
      <Row>
        <Col span={12}>
          <Form
            layout={'inline'}
            form={form}
            initialValues={{ layout: 'inline'  , phoneNumber : pat.phone , cardNumber : pat.card}}
            onFinish={onFinish}
          >
            <Form.Item name="cardNumber" label="卡号" rules={[{ required: true, message: '请输入卡号' }]}>
              <Input placeholder="输入卡号查询患者" />
            </Form.Item>
            <Form.Item name="phoneNumber" label="手机号码">
              <Input placeholder="输入手机号" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={() => form.resetFields()}>
                重置
              </Button>
            </Form.Item>
          </Form>
        </Col>
        {/*<Col span={8} offset={4}>*/}
        {/*  <Flex gap={8} justify={'end'}>*/}
        {/*    <Button type="primary">查看药品</Button>*/}
        {/*    <Button>历史报告</Button>*/}
        {/*  </Flex>*/}
        {/*</Col>*/}
      </Row>
      <PatientInfoModal
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={handleOk}
        patientInfo={pat}
        drugs={irStrListVO}
      />
    </Card>
  );
};

export default SearchForm;
