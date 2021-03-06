// tslint:disable-next-line:no-namespace
declare namespace API {
  export interface CurrentUser {
    avatar?: string;
    username?: string;
    nickName?: string;
    title?: string;
    group?: string;
    signature?: string;
    tags?: {
      key: string;
      label: string;
    }[];
    userId?: string;
    access?: 'user' | 'guest' | 'admin';
    permissions: string[];
    unreadCount?: number;
  }

  export interface LoginStateType {
    status?: 'ok' | 'error';
    type?: string;
  }

  export interface NoticeIconData {
    id: string;
    key: string;
    avatar: string;
    title: string;
    datetime: string;
    type: string;
    read?: boolean;
    description: string;
    clickClose?: boolean;
    extra: any;
    status: string;
  }

  export interface TreeData {
    key: string;
    title: string;
    children?: TreeData[];
    [key: string]: any;
  }
}
