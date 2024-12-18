// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 添加科室 POST /api/dept/add */
export async function addDeptUsingPost(body: API.DeptAddRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseLong_>('/api/dept/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 给科室分配输液室 POST /api/dept/add/room */
export async function addDeptRoomUsingPost(
  body: API.AddRoomAndDeptRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/dept/add/room', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除科室 GET /api/dept/delete/${param0} */
export async function deleteDeptUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteDeptUsingGETParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseBoolean_>(`/api/dept/delete/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除科室的输液室 GET /api/dept/delete/room/${param0}/${param1} */
export async function deleteDeptRoomUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteDeptRoomUsingGETParams,
  options?: { [key: string]: any },
) {
  const { deptId: param0, roomId: param1, ...queryParams } = params;
  return request<API.BaseResponseBoolean_>(`/api/dept/delete/room/${param0}/${param1}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 查询科室详情 GET /api/dept/get/vo/${param0} */
export async function getDeptByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDeptByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseDeptVO_>(`/api/dept/get/vo/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取全部类型集合 GET /api/dept/list/all */
export async function listDeptAllUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseListDeptVO_>('/api/dept/list/all', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 查询科室分页 POST /api/dept/list/page */
export async function listDeptPageUsingPost(
  body: API.DeptQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageResultDeptVO_>('/api/dept/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取科室树形结构 GET /api/dept/list/tree */
export async function listDeptTreeUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseListDeptTreeVO_>('/api/dept/list/tree', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取院区树形结构 GET /api/dept/list/tree-courtyard */
export async function listDeptTreeCourtyardUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseListDeptTreeVO_>('/api/dept/list/tree-courtyard', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 修改科室 POST /api/dept/update */
export async function updateDeptUsingPost(
  body: API.DeptUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/dept/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
