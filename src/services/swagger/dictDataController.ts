// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 添加字典 POST /api/dict-data/add */
export async function addDictDataUsingPost(
  body: API.DictDataAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/dict-data/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除字典 GET /api/dict-data/delete/${param0} */
export async function deleteDictDataUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteDictDataUsingGETParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseBoolean_>(`/api/dict-data/delete/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 查询字典详情 GET /api/dict-data/get/vo/${param0} */
export async function getDictDataByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDictDataByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseDictDataVO_>(`/api/dict-data/get/vo/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取全部类型集合 GET /api/dict-data/list/all */
export async function listDictDataAllUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseListDictDataVO_>('/api/dict-data/list/all', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 查询字典分页 POST /api/dict-data/list/page */
export async function listDictDataPageUsingPost(
  body: API.DictDataQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageResultDictDataVO_>('/api/dict-data/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取指定类型数据的列表 GET /api/dict-data/list/type */
export async function listDictDataByTypeUsingGet(body: string, options?: { [key: string]: any }) {
  return request<API.BaseResponseListDictDataVO_>('/api/dict-data/list/type', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改字典 POST /api/dict-data/update */
export async function updateDictDataUsingPost(
  body: API.DictDataUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/dict-data/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
