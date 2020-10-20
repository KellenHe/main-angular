import { request } from 'umi';
import { Tasks } from './data';

// 查询任务列表
export async function queryTaskList(params: any) {
  const msg = await request(`/quartz/job/list?page=${params.current - 1}&size=${params.pageSize}`, {
    method: 'POST',
    data: {
      ...params
    }
  });

  return {
    ...msg,
    total: msg.page.totalCount
  };
}

// 新建任务
export async function addTask(params: Tasks) {
  return request('/quartz/job', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 删除任务
export async function deleteTask(id: string) {
  return request(`/quartz/job/${id}`, {
    method: 'DELETE',
  });
}

// 编辑任务
export async function updateTask(params: Tasks) {
  return request('/quartz/job', {
    method: 'PUT',
    data: {
      ...params
    }
  });
}

// 查询任务详情
export async function queryTaskDetail(id: string) {
  return request(`/quartz/job/detail/${id}`);
}

// 暂停任务
export function pauseTask(id: string) {
  return request(`/quartz/job/pause/${id}`, {
    method: 'PUT'
  });
}

// 恢复任务
export function resumeTask(id: string) {
  return request(`/quartz/job/resume/${id}`, {
    method: 'PUT'
  });
}

// 执行任务
export function runTask(id: string) {
  return request(`/quartz/job/run/${id}`, {
    method: 'PUT'
  });
}

// 字典获取
export async function queryDictByType(type: string) {
  return request(`/system/dict/basic/list/type/${type}`);
}
