import { Request, Response } from 'express';

function getDep(req: Request, res: Response, u: string) {
  const result = {
    costTime: '',
    message: '',
    page: {},
    status: '00000',
    data: [
      {
        title: '华南分部',
        key: '0-0',
        children: [
          {
            title: '研发部',
            key: '0-0-0',
          },
          {
            title: '运维部',
            key: '0-0-1',
          },
        ],
      },
      {
        title: '华北分部',
        key: '0-1',
        children: [
          {
            title: '测试部',
            key: '0-1-0',
          },
          {
            title: 'UI部',
            key: '0-1-1',
          },
        ],
      },
    ],
    version: ''
  };

  return res.json(result);
}

export default {
  '/v2.0/department/basic/tree': getDep
};
