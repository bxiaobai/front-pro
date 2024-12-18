// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** add POST /api/scale/add */
export async function addUsingPost(body: API.Scale, options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean_>('/api/scale/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getScale GET /api/scale/get/${param0} */
export async function getScaleUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getScaleUsingGETParams,
  options?: { [key: string]: any },
) {
  const { scaleId: param0, ...queryParams } = params;
  return request<API.BaseResponseListScale_>(`/api/scale/get/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** getScaleByCardId GET /api/scale/get/vo/${param0} */
export async function getScaleByCardIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getScaleByCardIdUsingGETParams,
  options?: { [key: string]: any },
) {
  const { scaleId: param0, ...queryParams } = params;
  return request<API.BaseResponseListScale_>(`/api/scale/get/vo/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** update POST /api/scale/update */
export async function updateUsingPost(body: API.Scale, options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean_>('/api/scale/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
