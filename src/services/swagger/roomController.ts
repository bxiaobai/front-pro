// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 添加输液室 POST /api/room/add */
export async function addRoomUsingPost(body: API.RoomAddRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseLong_>('/api/room/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据科室id获取可添加输液室 GET /api/room/addByDeptId-usable-room/${param0} */
export async function listByDeptIdUsableUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listByDeptIdUsableUsingGETParams,
  options?: { [key: string]: any },
) {
  const { deptId: param0, ...queryParams } = params;
  return request<API.BaseResponseListRoomVO_>(`/api/room/addByDeptId-usable-room/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除输液室 GET /api/room/delete/${param0} */
export async function deleteRoomUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteRoomUsingGETParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseBoolean_>(`/api/room/delete/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 查询输液室详情 GET /api/room/get/vo/${param0} */
export async function getRoomByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getRoomByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseRoomVO_>(`/api/room/get/vo/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取全部输液室 GET /api/room/list/all */
export async function listRoomAllUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseListRoomVO_>('/api/room/list/all', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 根据科室id获取可用输液室 GET /api/room/list/docker/${param0} */
export async function listDeptDockerUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listDeptDockerUsingGETParams,
  options?: { [key: string]: any },
) {
  const { deptId: param0, ...queryParams } = params;
  return request<API.BaseResponseListRoomVO_>(`/api/room/list/docker/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 查询输液室分页 POST /api/room/list/page */
export async function listRoomPageUsingPost(
  body: API.RoomQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageResultRoomVO_>('/api/room/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改输液室 POST /api/room/upRoom */
export async function updateRoomUsingPost(
  body: API.RoomUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/room/upRoom', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
