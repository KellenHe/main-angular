import React, { useState, useRef } from 'react';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { Button, Tooltip, message } from 'antd';
import Icon from '@ant-design/icons';
import { PlusOutlined } from '@ant-design/icons';
import { queryMenu, addMenu } from '../services';
import { iconMap } from './components/iconMap';
import CreateForm from './components/createForm';

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: any) => {
  const hide = message.loading('正在添加');
  try {
    await addMenu({
      menuIcon: fields.iconMap,
      menuUrl: fields.link,
      ...fields });
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

const defaultFormValue = { authorityMenuTyped: 'catalog', menuOrder: 999 };

const MenuManagement: React.FC<{}> = () => {
  const [isUpdate, handleIsUpdate] = useState<boolean>(false);
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({...defaultFormValue});
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<any>[] = [
    {
      title: '菜单标题',
      dataIndex: 'title'
    },
    {
      title: '图标',
      dataIndex: 'icon',
      hideInSearch: true,
      render: (_, record) => (
        <>
          <Icon component={iconMap[record.iconReact]} />
        </>
      )
    },
    {
      title: '排序',
      dataIndex: 'sort',
      hideInSearch: true,
    },
    {
      title: '权限标识',
      dataIndex: 'tag',
      hideInSearch: true,
    },
    {
      title: '组件路径',
      dataIndex: 'link',
      hideInSearch: true,
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

  return (
    <div>
      <ProTable
        headerTitle='菜单列表'
        actionRef={actionRef}
        rowKey='key'
        toolBarRender={(action, { selectedRows }) => [
          <Button type='primary' onClick={() => { handleModalVisible(true); handleIsUpdate(false); }}>
            <PlusOutlined /> 新建
          </Button>,
        ]}
        columns={columns}
        request={queryMenu}
        pagination={false}
      />
      {(stepFormValues && Object.keys(stepFormValues).length) || !isUpdate ? (
      <CreateForm
        onCancel={() => { handleModalVisible(false); setStepFormValues({...defaultFormValue}); }}
        modalVisible={createModalVisible}
        onSubmit={async (value) => {
          let success = false;
          if (isUpdate) {
            success = await handleUpdate(value);
          } else {
            success = await handleAdd(value);
          }
          if (success) {
            handleModalVisible(false);
            setStepFormValues({...defaultFormValue});
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        values={stepFormValues}>
      </CreateForm>
      ) : null}
    </div>
  );
};

export default MenuManagement;
