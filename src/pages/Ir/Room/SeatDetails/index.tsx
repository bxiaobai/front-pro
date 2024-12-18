import {PageContainer, ProCard} from '@ant-design/pro-components';
import '@umijs/max';
import React, {useState} from 'react';
import SeatTable from "@/pages/Ir/Room/SeatDetails/Table/SeatTable";
import PlanTable from "@/pages/Ir/Room/SeatDetails/Table/PlanTable";

/**
 * 用户管理页面
 *
 * @constructor
 */
const UserAdminPage: React.FC = () => {

  const [tab, setTab] = useState('plan');

  return (
    <PageContainer title={false}>
      <ProCard
        tabs={{
          activeKey: tab,
          items: [
            {
              label: `表格`,
              key: 'table',
              children: <SeatTable/>,
            },
            {
              label: `平面图`,
              key: 'plan',
              children: <PlanTable/>,
            },

          ],
          onChange: (key) => {
            setTab(key);
          },
        }}
      >
      </ProCard>
    </PageContainer>
  );
};
export default UserAdminPage;
