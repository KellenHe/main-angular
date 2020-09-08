import React, { useState, useRef } from 'react';
import { Row, Col, Tree, Card, message, Button, Switch, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { addUser, updateUser, queryDep, queryUsers } from '../services';
import { useRequest } from 'umi';
import CreateForm, { FormValueType } from './components/CreateForm';
import { TableListItem } from '../data';
import styles from '../style.less';

/**
 * 添加用户
 * @param fields 表格
 */
const handleAdd = async (fields: TableListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addUser({ ...fields });
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
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('正在配置');
  try {
    await updateUser({ ...fields });
    hide();
    message.success('修改成功');
    return true;
  } catch (error) {
    hide();
    message.error('修改失败请重试！');
    return false;
  }
};

const UserManagement: React.FC<{}> = () => {
  const [isUpdate, handleIsUpdate] = useState<boolean>(false);
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '用户名',
      dataIndex: 'userName',
    },
    {
      title: '昵称',
      dataIndex: 'alias',
    },
    {
      title: '性别',
      dataIndex: 'sex',
      renderText: (val: number) => (val === 1 ? '男' : '女'),
    },
    {
      title: '电话',
      dataIndex: 'phone',
      hideInSearch: true,
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      hideInSearch: true,
    },
    {
      title: '部门',
      dataIndex: 'dep',
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (_, row) => <Switch defaultChecked />,
    },
    {
      title: '创建日期',
      dataIndex: 'createdAt',
      valueType: 'dateTime',
      hideInForm: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <Tooltip title='修改'>
            <Button type='primary' onClick={() => {
              handleIsUpdate(true);
              setStepFormValues(record);
              handleModalVisible(true);
            }}>修改</Button>
          </Tooltip>
          <Tooltip title='删除'>
            <Button type='primary' danger>删除</Button>
          </Tooltip>
        </>
      ),
    },
  ];

  const onSelect = (selectedKeys: React.Key[], info: any) => {
    console.log('selected', selectedKeys, info);
  };

  const { data, loading } = useRequest(() => {
    return queryDep({});
  });

  if (loading) {
    return (
      <div>loading</div>
    );
  }

  return (
    <Row style={{ margin: '0 -24px' }}>
      <Col flex='280px'>
        <Card title='部门' style={{ marginBottom: '0px' }} className={styles.siderBarFull}>
          <Tree
            defaultExpandedKeys={['0-0-0', '0-0-1']}
            defaultSelectedKeys={['0-0-0', '0-0-1']}
            defaultCheckedKeys={['0-0-0', '0-0-1']}
            onSelect={onSelect}
            treeData={data?.data}
          />
        </Card>
      </Col>
      <Col flex='1' style={{ minWidth: 0 }}>
        <div className='p-lg'>
          <ProTable<TableListItem>
            headerTitle='用户列表'
            actionRef={actionRef}
            search={{
              span: { xs: 24, sm: 24, md: 8, lg: 8, xl: 8, xxl: 8 }
            }}
            rowKey='key'
            toolBarRender={(action, { selectedRows }) => [
              <Button type='primary' onClick={() => { handleModalVisible(true); handleIsUpdate(false); }}>
                <PlusOutlined /> 新建
              </Button>,
            ]}
            request={queryUsers}
            columns={columns}
            rowSelection={{}}
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
              treeData={data}
              isUpdate={isUpdate}>
            </CreateForm>
          ) : null}
        </div>
      </Col>
    </Row>
  );
};

export default UserManagement;
