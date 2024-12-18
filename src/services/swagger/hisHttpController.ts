// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取输液数据 GET /api/his */
export async function getIrInfoUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getIrInfoUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListIrStrListVO_>('/api/his', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取病人信息 GET /api/his/getPat */
export async function getPatInfoUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPatInfoUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePatVO_>('/api/his/getPat', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
