import React, { useState, useRef, useEffect } from 'react';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { Button, Tooltip, message, Popconfirm } from 'antd';
import { connect, Dispatch, useAccess, Access } from 'umi';

const FormManagement: React.FC<{}> = () => {
  const access = useAccess();
  const actionRef = useRef<ActionType>();
  const [isUpdate, handleIsUpdate] = useState<boolean>(false);
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const columns: ProColumns<any>[] = [
    {
      title: '流程类型',
      dataIndex: 'flowTyped',
      initialValue: 'open',
      filters: true,
      valueEnum: {
        zt: {
          text: '主体信评',
        },
        zq: {
          text: '债券信评',
        },
        add: {
          text: '投资池新增',
        },
        edit: {
          text: '投资池编辑',
        },
        delete: {
          text: '投资池删除',
        },
        xe: {
          text: '限额新增',
        },
      },
    },
    {
      title: '流程名称',
      dataIndex: 'roleTyped',
      hideInSearch: true
    },
    {
      title: '流程状态',
      dataIndex: 'roleCode',
      hideInSearch: true
    },
    {
      title: '流程版本',
      dataIndex: 'roleDesc',
      hideInSearch: true
    },
    {
      title: '流程文件名称',
      dataIndex: 'option',
      valueType: 'option',
    },
    {
      title: '创建时间',
      dataIndex: 'option',
      valueType: 'option',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <div>
          <Button type='primary'>编辑</Button>
          <Button type='primary'>上传</Button>
          <Button type='primary'>发布</Button>
          <Button type='primary'>取消</Button>
          <Button type='primary'>删除</Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <ProTable
        headerTitle='表单列表'
        actionRef={actionRef}
        rowKey='id'
        toolBarRender={() => [
          <Access accessible={access.canAddRole}>
            <Button type='primary' onClick={() => { handleModalVisible(true); handleIsUpdate(false); }}>
              新建
            </Button>
          </Access>,
        ]}
        columns={columns}
        request={(params, sorter, filter) => {
          // 表单搜索项会从 params 传入，传递给后端接口。
          console.log(params, sorter, filter);
          return Promise.resolve({
            data: tableListDataSource,
            success: true,
          });
        }}
      />
    </>
  );
};

export default FormManagement;
