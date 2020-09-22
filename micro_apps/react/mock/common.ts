import { Request, Response } from 'express';

function getRoleType() {
  return [{
    label: 'test',
    value: 'test'
  }, {
    label: 'admin',
    value: 'admin'
  }];
}

function getDataType() {
  return [{
    label: '任务',
    value: 'task'
  }, {
    label: '数据',
    value: 'data'
  }];
}

function getDataRuleExpress() {
  return [{
    label: '加',
    value: 'plus'
  }, {
    label: '减',
    value: 'sub'
  }];
}

function handleParams(req: Request, res: Response) {
  let dictData;
  if (req.params.type === 'role_type') {
    dictData = getRoleType();
  } else if (req.params.type === 'authority_data_type') {
    dictData = getDataType();
  } else if (req.params.type === 'express_column_sql_type') {
    dictData = getDataRuleExpress();
  }
  const result = {
    page: {},
    data: dictData,
    success: true
  };
  return res.json(result);
}

export default {
  '/system/dict/basic/list/type/:type': handleParams
};
