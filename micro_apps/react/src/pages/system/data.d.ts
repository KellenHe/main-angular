
export interface TableListItem {
  key: number;
  userName: string;
  alias: string;
  sex: number;
  phone: string;
  email: string;
  dep: string;
  status: string;
  createdAt: Date;
  disabled?: boolean;
}

export interface TableListParams {
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
}
