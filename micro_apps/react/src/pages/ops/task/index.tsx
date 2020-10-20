import React, { useState, useRef, useEffect } from 'react';
import { message, Button, Tooltip, Space, Popconfirm } from 'antd';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { addTask, deleteTask, queryTaskList, updateTask } from '../services';
import { ModelState } from '../model';
import { Dispatch, useAccess, Access, connect } from 'umi';
import CreateForm from './components/CreateForm';
import moment from 'moment';
import { Tasks } from '../data';

interface TaskProps {
  dispatch: Dispatch;
  ops: ModelState;
}

/**
 * 添加用户
 * @param fields 表格
 */
const handleAdd = async (fields: any) => {
  const hide = message.loading('正在添加');
  try {
    await addTask({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

/**
 * 更新节点
 * @param fields 参数
 */
const handleUpdate = async (fields: any) => {
  const hide = message.loading('正在修改');
  try {
    await updateTask({ ...fields });
    hide();
    message.success('修改成功');
    return true;
  } catch (error) {
    hide();
    message.error('修改失败请重试！');
    return false;
  }
};

/**
 * 删除节点
 * @param fields 参数
 */
const handleDelete = async (fields: any) => {
  const hide = message.loading('正在删除');
  try {
    await deleteTask({ ...fields });
    hide();
    message.success('删除成功');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败请重试！');
    return false;
  }
};

const TaskManagement: React.FC<TaskProps> = (props) => {
  const access = useAccess();
  const [isUpdate, handleIsUpdate] = useState<boolean>(false);
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();

  const { dispatch, ops }  = props;

  // 获取状态字典
  useEffect(() => {
    dispatch({
      type: 'ops/queryJobStatus',
    });
  }, []);

  let columns: ProColumns<any>[] = [
    {
      title: '任务名称',
      dataIndex: 'jobName',
    },
    {
      title: '任务负责人',
      dataIndex: 'jobCharge',
      hideInSearch: true,
    },
    {
      title: '负责人邮箱',
      dataIndex: 'jobEmail',
      hideInSearch: true,
    },
    {
      title: 'cron表达式',
      dataIndex: 'jobCron',
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'jobStatus',
      hideInSearch: true,
      valueEnum: ops.jobStatus
    },
    {
      title: '创建日期',
      dataIndex: 'createTime',
      valueType: 'dateRange',
      render: (_, row) => <span>{moment(row.createTime).format('YYYY-MM-DD')}</span>,
      hideInSearch: true
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <div>
          <Access accessible={access.canEditTask}>
            <Tooltip title='修改'>
              <Button type='primary' onClick={() => {
                handleIsUpdate(true);
                setStepFormValues({
                  ...record
                });
                handleModalVisible(true);
              }}>修改</Button>
            </Tooltip>
          </Access>
          <Access accessible={access.canEditTask}>
            <Tooltip title='启动任务'>
              <Button type='primary'>启动任务</Button>
            </Tooltip>
            <Tooltip title='手动执行'>
              <Button type='primary'>手动执行</Button>
            </Tooltip>
          </Access>
          <Access accessible={access.canDeleteTask}>
            <Tooltip title='删除'>
              <Popconfirm
                title='是否确认删除?'
                onConfirm={async () => { confirm(record); }}
                okText='确定'
                cancelText='取消'
              >
                <Button type='primary' danger>删除</Button>
              </Popconfirm>
            </Tooltip>
          </Access>
        </div>
      ),
    },
  ];

  // 没有修改和删除权限，隐藏操作列
  if (!access.canEditTask && !access.canDeleteTask) {
    columns = columns.filter(c => c.title !== '操作');
  }

  // const confirm = async (fields: FormValueType) => {
  //   const success = await handleDelete(fields);
  //   if (success) {
  //     if (actionRef.current) {
  //       actionRef.current.reload();
  //     }
  //   }
  // };

  const expandedRowRender = () => {
    const data = [];
    for (let i = 0; i < 3; i += 1) {
      data.push({
        key: i,
        date: '2014-12-24 23:12:00',
        name: 'This is production name',
        upgradeNum: 'Upgraded: 56',
      });
    }
    return (
      // <ProTable
      //   columns={[
      //     { title: 'Date', dataIndex: 'date', key: 'date' },
      //     { title: 'Name', dataIndex: 'name', key: 'name' },
      //     { title: 'Upgrade Status', dataIndex: 'upgradeNum', key: 'upgradeNum' },
      //     {
      //       title: 'Action',
      //       dataIndex: 'operation',
      //       key: 'operation',
      //       valueType: 'option',
      //       render: () => [<a key='Pause'>Pause</a>, <a key='Stop'>Stop</a>],
      //     },
      //   ]}
      //   headerTitle={false}
      //   search={false}
      //   options={false}
      //   dataSource={data}
      //   pagination={false}
      // />
      <div>
        111
      </div>
    );
  };

  return (
    <>
      <ProTable<any>
        headerTitle='任务列表'
        actionRef={actionRef}
        search={{
          span: { xs: 24, sm: 24, md: 8, lg: 8, xl: 8, xxl: 8 }
        }}
        rowKey='id'
        toolBarRender={(action, { selectedRows }) => [
          <Access accessible={access.canAddTask}>
            <Button type='primary' onClick={() => { handleModalVisible(true); handleIsUpdate(false); }}>
              新建
            </Button>
          </Access>,
        ]}
        request={(params: any) => {
          return queryTaskList(params);
        }}
        columns={columns}
        expandable={{ expandedRowRender }}
        rowSelection={{}}
        tableAlertRender={({ selectedRowKeys, selectedRows }) => (
          <Space size={24}>
            <span>
              已选 {selectedRowKeys.length} 项
            </span>
            <span>
              <Access accessible={access.canViewTask}>
                <a style={{ marginLeft: 4 }}>获取日志</a>
              </Access>
            </span>
          </Space>
        )}
        tableAlertOptionRender={({ onCleanSelected }) => {
          return (
            <Space>
              <a style={{ marginLeft: 8 }} onClick={onCleanSelected}>
                取消选择
              </a>
            </Space>
          );
        }}
      />
      {(stepFormValues && Object.keys(stepFormValues).length) || !isUpdate ? (
        <CreateForm
          onSubmit={async (value: any) => {
            let success = false;
            if (isUpdate) {
              success = await handleUpdate(value);
            } else {
              success = await handleAdd(value);
            }
            if (success) {
              handleModalVisible(false);
              setStepFormValues({});
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => { handleModalVisible(false); setStepFormValues({}); }}
          modalVisible={createModalVisible}
          values={stepFormValues}
          isUpdate={isUpdate}>
        </CreateForm>
      ) : null}
    </>
  );
};

export default connect(
  ({ops}: {ops: ModelState}) => ({
    ops
  })
)(TaskManagement);
