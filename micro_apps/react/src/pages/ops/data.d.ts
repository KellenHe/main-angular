export interface DictTypeItem {
  label: string;
  value: string;
}

export interface Tasks {
  jobName: string;
  jobCron: string;
  jobRecharge: string;
  jobEmail:	string;
  jobTyped:	string;
  params:	TaskParams[];
}

export interface TaskDetails {
  id:	number;
  jobName:	string;
  jobCron:	string;
  jobCharge:	string;
  jobEmail:	string;
  jobTyped:	string;
  jobStatus:	string;
  createTime:	string;
  updateTime:	null;
  paramList:	TaskParams[];
}

export interface TaskParams {
  jobKey: string;
  jobValue: string;
  groupId: number;
}

export interface TaskDetailParams {
  id: string;
  jobId: string;
  jobKey: string;
  jobValue: string;
  groupId: number;
}
