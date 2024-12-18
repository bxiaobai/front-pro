// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 生成号源池 POST /api/source/add */
export async function addSourceUsingPost(
  body: API.SourceAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/source/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取当日号源池列表 POST /api/source/list */
export async function listSourceUsingPost(
  body: API.SourceQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListSourceApptsVO_>('/api/source/list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
