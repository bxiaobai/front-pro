// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 添加号源模板 POST /api/template/add */
export async function addTemplateUsingPost(
  body: API.TemplateAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/template/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除号源模板 GET /api/template/delete/${param0} */
export async function deleteTemplateUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteTemplateUsingGETParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseBoolean_>(`/api/template/delete/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 查询号源模板详情 GET /api/template/get/vo/${param0} */
export async function getTemplateByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getTemplateByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseTemplateVO_>(`/api/template/get/vo/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 查询号源模板分页 POST /api/template/list/page */
export async function listTemplatePageUsingPost(
  body: API.TemplateQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageResultTemplateVO_>('/api/template/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改号源模板 POST /api/template/update */
export async function updateTemplateUsingPost(
  body: API.TemplateUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/template/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
