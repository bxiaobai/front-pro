import '@umijs/max';
import React, {useEffect, useState} from 'react';

import {useLocation} from "@umijs/max";
import {listSeatAllUsingGet} from "@/services/swagger/seatController";
import SeatGrid from "@/components/SeatGrid";
import {Divider} from "antd";

/**
 * 用户管理页面
 * @constructor
 */
const SeatTable: React.FC = () => {
  //详情窗口
  // 当前用户点击的数据
  const location = useLocation()
  const state = location.state as { id: number };
  //table数据
  const [tableData, setTableData] = useState<API.SeatLayoutVO[]>([])
  //根据id获取分组显示座位分布
  console.log(state.id)
  useEffect(() => {
    listSeatAllUsingGet({id: state.id}).then(res => {
      if (res.data) {
        setTableData(res.data);
      } else {
        setTableData([]); // 或者设置为一个空数组
      }
    })
  }, [])

  //计算最大列数
  return (
    <>
      {tableData.length > 0 ? (
        <div>
          {tableData.map((item, index) => (
            <div key={index}>
              <SeatGrid
                seatLayoutVO={item}
                onSeatClick={(seat) => console.log('点击了座位：', seat)}
                clickable={true}
              />
              <Divider/>
            </div>
          ))}
        </div>
      ) : (
        <div>输液室没有座位数据</div>
      )}
    </>
  );
};
export default SeatTable;
