import React, {useEffect, useState} from "react";
import {Button, Descriptions, Divider, Modal, Table, TableProps, Tag} from "antd";
import DateTimeFormatter from "../../../../../../utils/Convent";

interface Props {
  visible: boolean;
  onCancel: () => void;
  onOk: (selectedDrugs: API.IrStrListVO[], patientInfo: API.PatVO) => void; // 修改 onOk 的签名
  patientInfo: API.PatVO;
  drugs: API.IrStrListVO[]; // 接收药品信息
}

const PatientInfoModal: React.FC<Props> =
  ({
     visible,
     onCancel,
     onOk,
     patientInfo,
     drugs, // 接收药品信息
   }) => {
    const [drugData, setDrugData] = useState<API.IrStrListVO[]>([]);
    const [selectedDrug, setSelectedDrug] = useState<API.IrStrListVO[]>([]);

    useEffect(() => {
      if (drugs) {
        setDrugData(drugs);
      }
    }, [drugs]);

    // 过敏史
    const columns: TableProps<API.IrStrListVO>['columns'] = [
      {dataIndex: 'index', key: 'index'},
      {
        title: '开方日期',
        dataIndex: 'creationTime',
        render: (text) => DateTimeFormatter.format(text),
      },
      {
        title: '开方医生',
        dataIndex: 'createDoctor',
      },
      {
        title: '收费状态',
        dataIndex: 'isCharge',
        render: (text) =>
          text ? <Tag color="red">未全部收费</Tag> : <Tag color="green">已收费</Tag>,
      },
      {
        title: '输液次数',
        dataIndex: 'infusionTotal',
      },
      {
        title: '剩余输液次数',
        dataIndex: 'infusionNum',
      },
      {
        title: '使用情况',
        dataIndex: 'status',
        render: (text) => {
          if (text === 0) {
            return <Tag color="blue">未使用</Tag>;
          } else if (text === 1) {
            return <Tag color="green">使用中</Tag>;
          } else {
            return <Tag color="red">已完成</Tag>;
          }
        },
      },
    ];

    const expandColumns: TableProps<API.Yzxxs>['columns'] = [
      {dataIndex: 'index', key: 'index'},
      {
        title: '药品名称',
        dataIndex: 'ypmc',
      },
      {
        title: '规格',
        dataIndex: 'gg',
      },
      {
        title: '剂量',
        dataIndex: 'jl',
      },
      {
        title: '频度',
        dataIndex: 'pd',
      },
      {
        title: '用法',
        dataIndex: 'yfms',
      },
      {
        title: '单位',
        dataIndex: 'dw',
      },
    ];

    const rowSelection: TableProps<API.IrStrListVO>['rowSelection'] = {
      onChange: (selectedRowKeys: React.Key[], selectedRows: API.IrStrListVO[]) => {
        setSelectedDrug(selectedRows);
      },
      getCheckboxProps: (record: API.IrStrListVO) => ({
        disabled: record.status === 2,
      }),
    };

    const rowClassName = (record: API.Yzxxs) => {
      // 根据record返回不同的类名
      if (record.color === '1') {
        return 'special-row'; // 这个类名需要在你的CSS中定义
      }
      return '';
    };

    // 展开行渲染函数
    const expandedRowRender = (record: any) => {
      return (
        <Table
          size="small"
          pagination={false}
          columns={expandColumns}
          dataSource={record.yzxxsList}
          rowClassName={rowClassName}
          rowKey="id"
        />
      );
    };

    return (
      <Modal
        title="患者信息"
        open={visible}
        width={800}
        onCancel={onCancel}
        footer={[
          <Button key="back" onClick={onCancel}>
            取消
          </Button>,
          <Button key="submit" type="primary" onClick={() => onOk(selectedDrug, patientInfo)}>
            确认
          </Button>,
        ]}
      >
        <Descriptions bordered size="small">
          <Descriptions.Item label="姓名">{patientInfo?.name}</Descriptions.Item>
          <Descriptions.Item label="性别">{patientInfo?.sexCode === 1 ? '男' : '女'}</Descriptions.Item>
          <Descriptions.Item label="手机">{patientInfo?.phone}</Descriptions.Item>
          <Descriptions.Item label="卡号">{patientInfo?.card}</Descriptions.Item>
        </Descriptions>
        <Divider>药品信息</Divider>
        <Table
          pagination={false}
          size="small"
          dataSource={drugData}
          rowSelection={{type: 'checkbox', ...rowSelection}}
          columns={columns}
          expandable={{
            expandedRowRender,
            rowExpandable: (record) => record.yzxxsList.length > 0, // 只有当 yzxxsList 有数据时才允许展开
          }}
          rowKey={'creationTime'}
        />
      </Modal>
    );
  };

export default PatientInfoModal;
