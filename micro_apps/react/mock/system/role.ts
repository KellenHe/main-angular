import { Request, Response } from 'express';

const roles: any[] = [];

for (let i = 0; i < 10; i += 1) {
  roles.push({
    id: i,
    roleTyped: 'test',
    roleCode: '1111',
    roleDesc: 'i am desc',
    roleName: `role${i}`,
    menuIds: [0, 1, 3, 8],
    ruleDtos: []
  });
}

function getRoles(req: Request, res: Response) {
  const result = {
    data: roles,
    errorCode: '',
    errorMessage: '',
    page: {
      current: 1,
      size: 10
    },
    success: true
  };

  return res.json(result);
}

function setRole(req: Request, res: Response) {
  roles[0].roleName = 'addRole';

  const result = {
    data: roles,
    errorCode: '',
    errorMessage: '',
    page: {
      current: 1,
      size: 10
    },
    success: true
  };

  return res.json(result);
}

function updateRole(req: Request, res: Response) {
  roles[0].roleName = 'updateRole';

  const result = {
    data: roles,
    errorCode: '',
    errorMessage: '',
    page: {
      current: 1,
      size: 10
    },
    success: true
  };

  return res.json(result);
}

function deleteRole(req: Request, res: Response) {
  const result = {
    data: roles,
    errorCode: '',
    errorMessage: '',
    page: {
      current: 1,
      size: 10
    },
    success: true
  };

  return res.json(result);
}

function queryDataRuleList(req: Request, res: Response) {
  const datas = [];
  for (let i = 0; i < 10; i += 1) {
    datas.push({
      id: i,
      frontColumnTyped: 'tree',
      columnDisplayName: req.params.authorityDataTyped + i,
      authorityDataTyped: req.params.authorityDataTyped,
      data: [{
        key: `0-${i}`,
        title: req.params.authorityDataTyped + i,
        children: [{
          key: `1-${i}`,
          title: `title1${i}`
        }]
      }]
    });
  }

  const result = {
    data: datas,
    success: true
  };

  return res.json(result);
}

export default {
  '/role/basic/list': getRoles,
  'POST /role/basic': setRole,
  'PUT /role/basic': updateRole,
  'DELETE /role/basic/:id': deleteRole,
  '/authority/rule/config/list/:authorityDataTyped': queryDataRuleList
};
