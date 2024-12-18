// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 添加预约信息 POST /api/details/add */
export async function createDetailsUsingPost(
  body: API.DetailsAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/details/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 自动选择医嘱时间和座位 POST /api/details/auto/select */
export async function autoSelectUsingPost(body: API.AutoRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseAutoVO_>('/api/details/auto/select', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 计算药品所需时间 POST /api/details/count/drug/time */
export async function countDrugTimeUsingPost(body: API.Yzxxs[], options?: { [key: string]: any }) {
  return request<API.BaseResponseInt_>('/api/details/count/drug/time', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 取消预约 GET /api/details/delete */
export async function removeDetailsUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.removeDetailsUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/details/delete', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页获取预约信息 POST /api/details/docker/add */
export async function dockerAddUsingPost(body: API.AddIrVO, options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean_>('/api/details/docker/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取预约信息 GET /api/details/get/vo */
export async function getDetailsByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDetailsByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseDetailsVO_>('/api/details/get/vo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页获取预约信息 POST /api/details/page */
export async function listDetailsPageUsingPost(
  body: API.DetailsQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageResultDetailsVO_>('/api/details/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
