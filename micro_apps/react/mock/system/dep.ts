import { Request, Response } from 'express';

const deps = [
  {
    title: '华南分部',
    departmentName: '华南分部',
    departmentOrder: '1',
    parentId: '-1',
    key: '0-0',
    value: '0-0',
    children: [
      {
        title: '研发部',
        departmentName: '研发部',
        parentId: '0-0',
        departmentOrder: '1',
        key: '0-0-0',
        value: '0-0-0',
      },
      {
        title: '运维部',
        departmentName: '运维部',
        parentId: '0-0',
        departmentOrder: '1',
        key: '0-0-1',
        value: '0-0-1',
      },
    ],
  },
  {
    title: '华北分部',
    departmentName: '华北分部',
    parentId: '-1',
    departmentOrder: '1',
    key: '0-1',
    value: '0-1',
    children: [
      {
        title: '测试部',
        departmentName: '测试部',
        parentId: '0-1',
        departmentOrder: '1',
        key: '0-1-0',
        value: '0-1-0',
      },
      {
        title: 'UI部',
        departmentName: 'UI部',
        parentId: '0-1',
        departmentOrder: '1',
        key: '0-1-1',
        value: '0-1-1',
      },
    ],
  },
];

function getDepTree(req: Request, res: Response, u: string) {
  const result = {
    page: {},
    data: deps,
    success: true
  };

  return res.json(result);
}

function addDep(req: Request, res: Response) {
  console.log(req.body);
  const result = {
    page: {},
    data: [],
    success: true
  };
  return res.json(result);
}

function updateDep(req: Request, res: Response) {
  console.log(req.body);
  const result = {
    page: {},
    data: [],
    success: true
  };
  return res.json(result);
}

function deleteDep(req: Request, res: Response) {
  console.log(req.query);
  const result = {
    page: {},
    data: [],
    success: true
  };
  return res.json(result);
}

export default {
  '/department/basic/tree/:params': getDepTree,
  'POST /department/basic/list': getDepTree,
  'POST /department/basic': addDep,
  'PUT /department/basic': updateDep,
  'DELETE /department/basic/:id': deleteDep,
};
