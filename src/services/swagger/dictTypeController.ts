// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 添加字典 POST /api/dict-type/add */
export async function addDictTypeUsingPost(
  body: API.DictTypeAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/dict-type/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除字典 GET /api/dict-type/delete/${param0} */
export async function deleteDictTypeUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteDictTypeUsingGETParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseBoolean_>(`/api/dict-type/delete/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 查询字典详情 GET /api/dict-type/get/vo/${param0} */
export async function getDictTypeByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDictTypeByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseDictTypeVO_>(`/api/dict-type/get/vo/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取全部类型集合 GET /api/dict-type/list/all */
export async function listDictTypeAllUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseListDictTypeVO_>('/api/dict-type/list/all', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 查询字典分页 POST /api/dict-type/list/page */
export async function listDictTypePageUsingPost(
  body: API.DictTypeQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageResultDictTypeVO_>('/api/dict-type/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取指定类型数据的列表 GET /api/dict-type/list/type */
export async function listDictTypeByTypeUsingGet(body: string, options?: { [key: string]: any }) {
  return request<API.BaseResponseListDictTypeVO_>('/api/dict-type/list/type', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改字典 POST /api/dict-type/update */
export async function updateDictTypeUsingPost(
  body: API.DictTypeUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/dict-type/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
