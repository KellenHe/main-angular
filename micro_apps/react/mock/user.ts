import { Request, Response } from 'express';

function getFakeCaptcha(req: Request, res: Response) {
  return res.json('captcha-xxx');
}

const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION } = process.env;

/**
 * 当前用户的权限，如果为空代表没登录
 * current user access， if is '', user need login
 * 如果是 pro 的预览，默认是有权限的
 */
let access = ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site' ? 'admin' : '';

function queryUsers(req: Request, res: Response, u: string) {
  const { current = 1, pageSize = 10 } = req.query;
  const tableListDataSource: any[] = [];

  for (let i = 0; i < 10; i += 1) {
    tableListDataSource.push({
      key: i,
      userName: `heshi${i}`,
      alias: `heshi`,
      sex: i % 2 === 0 ? 1 : 0,
      phone: '111111',
      email: `${i}@chinacscs.com`,
      dep: '研发部',
      status: '1',
      createdAt: new Date(),
      disabled: false,
    });
  }

  const result = {
    costTime: '',
    message: '',
    page: {
      current,
      size: pageSize,
      totalPage: 10
    },
    status: '00000',
    data: tableListDataSource
  };

  return res.json(result);
}

// 代码中会兼容本地 service mock 以及部署站点的静态数据
export default {
  '/v2.0/user/basic/list': queryUsers,
  'GET /api/getDepTreeData': [{
    title: 'parent 1',
    key: '0-0',
    children: [{
      title: 'parent 1-0',
      key: '0-0-0',
      disabled: true,
      children: [{
        title: 'leaf',
        key: '0-0-0-0',
        disableCheckbox: true,
      },
      {
        title: 'leaf',
        key: '0-0-0-1',
      }],
    }, {
      title: 'parent 1-1',
      key: '0-0-1',
      children: [{ title: 'sss', key: '0-0-1-0' }],
    }],
  },
  ],
  // 支持值为 Object 和 Array
  'GET /v2/user/current': (req: Request, res: Response) => {
    res.send({
      clientId: 10,
      createByDisplayName: 'admin',
      createById: 1,
      createDate: '2019-11-05 11:10:32',
      displayName: 'heshi1',
      userName: 'heshi1',
      userId: '1948',
      email: null,
      isAdmin: true,
      privileges: [
        {
          code: 'compy_view',
          name: '查看主体和债券',
          privilegeId: 1,
          type: '主体和债券'
        },
        {
          code: 'company_edit',
          name: '录入主体和债券',
          privilegeId: 21,
          type: '主体和债券'
        },
        {
          code: 'expert_view',
          name: '查看专家点评',
          privilegeId: 126,
          type: '主体和债券'
        }
      ]
    });
  },
  // GET POST 可省略
  'GET /api/users': [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ],
  'POST /api/login/account': (req: Request, res: Response) => {
    const { password, username, type } = req.body;
    if (password === 'ant.design' && username === 'admin') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'admin',
      });
      access = 'admin';
      return;
    }
    if (password === 'ant.design' && username === 'user') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'user',
      });
      access = 'user';
      return;
    }
    if (type === 'mobile') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'admin',
      });
      return;
    }

    res.send({
      status: 'error',
      type,
      currentAuthority: 'guest',
    });
    access = 'guest';
  },
  'GET /api/login/outLogin': (req: Request, res: Response) => {
    access = '';
    res.send({ data: {}, success: true });
  },
  'POST /api/register': (req: Request, res: Response) => {
    res.send({ status: 'ok', currentAuthority: 'user', success: true });
  },
  'GET /api/500': (req: Request, res: Response) => {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list',
    });
  },
  'GET /api/404': (req: Request, res: Response) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212',
    });
  },
  'GET /api/403': (req: Request, res: Response) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'GET /api/401': (req: Request, res: Response) => {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },

  'GET  /api/login/captcha': getFakeCaptcha,
};
