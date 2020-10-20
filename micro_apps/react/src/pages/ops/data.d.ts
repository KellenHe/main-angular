export interface JobStatusItem {
  label: string;
  value: string;
}

export interface Tasks {
  jobName: string;
  jobCron: string;
  jobRecharge: string;
  jobEmail:	string;
  jobTyped:	string;
  params:	{jobKey: string, jobValue: string, groupId: number}[];
}
