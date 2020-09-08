import { request } from 'umi';
import { TableListParams, TableListItem } from './data.d';

export function queryDep(params: any) {
  return request('/v2.0/department/basic/tree', {
    params,
  });
}

export async function addUser(params: TableListParams) {
  return request('/api/user', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateUser(params: TableListParams) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}

export async function queryUsers(params: TableListParams, sort: any, filter: any) {
  const msg = await request('/v2.0/user/basic/list');
  return {
    data: msg.value,
    total: msg.page?.totalPage,
    success: msg.status === '00000',
    pageSize: msg.page.size,
    current: params.currentPage,
  };
}

export async function queryMenu() {
  const msg = await request('/v2.0/role/basic/list');
  return {
    data: msg.data,
    success: msg.status === '00000',
  } as any;
}

export async function addMenu(params: any) {
  return request('/v2.0/authority/menu', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}
