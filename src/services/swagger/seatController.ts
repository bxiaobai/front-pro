// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 添加座位 POST /api/seat/add */
export async function addSeatUsingPost(body: API.SeatAddRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseLong_>('/api/seat/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除座位 GET /api/seat/delete/${param0} */
export async function deleteSeatUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteSeatUsingGETParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseBoolean_>(`/api/seat/delete/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 查询座位详情 GET /api/seat/get/vo/${param0} */
export async function getSeatByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getSeatByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseSeatVO_>(`/api/seat/get/vo/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取全部座位 GET /api/seat/list/map/${param1}/${param0} */
export async function listSeatAllUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listSeatAllUsingGETParams,
  options?: { [key: string]: any },
) {
  const { date: param0, id: param1, ...queryParams } = params;
  return request<API.BaseResponseListSeatLayoutVO_>(`/api/seat/list/map/${param1}/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 查询座位分页 POST /api/seat/list/page */
export async function listSeatPageUsingPost(
  body: API.SeatQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageResultSeatVO_>('/api/seat/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据roomid查询座位 GET /api/seat/list/roomId/${param0} */
export async function listSeatByRoomIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listSeatByRoomIdUsingGETParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseListSeatVO_>(`/api/seat/list/roomId/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 修改座位 POST /api/seat/upSeat */
export async function updateSeatUsingPost(
  body: API.SeatUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/seat/upSeat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
