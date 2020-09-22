import React, { useState } from 'react';
import { Modal, Form, Input, Radio, TreeSelect, Select, Button } from 'antd';
import { TableListItem } from '../../data';
import { useRequest } from 'umi';
import { queryRoles } from '../../services';

interface CreateFormProps {
  modalVisible: boolean;
  onSubmit: (values: any) => void;
  onCancel: () => void;
  values: any;
  treeData: any;
  isUpdate: boolean;
}

export interface FormValueType extends Partial<TableListItem> {}

const { Option }  = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const [form] = Form.useForm();

  const {
    onSubmit: handleUpdate,
    onCancel: handleUpdateModalVisible,
    modalVisible,
    treeData,
    values,
    isUpdate
  } = props;

  const { data, loading } = useRequest(() => {
    return queryRoles({});
  });

  if (loading) {
    return (
      <></>
    );
  }

  return (
    <Modal
      destroyOnClose
      title={isUpdate ? '修改用户' : '新建用户'}
      visible={modalVisible}
      onCancel={() => handleUpdateModalVisible()}
      footer={null}
    >
      <Form
        name='basic'
        form={form}
        initialValues={{ dep: values?.departments?.map((dep: any) => dep.id), role: values.roles?.map((role: any) => role.id), ...values }}
        onFinish={(formValues) => handleUpdate({id: values.id, ...formValues})}
      >
        <Form.Item
          label='用户名'
          name='username'
          rules={[{ required: true, message: '请输入用户名!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='昵称'
          name='nickName'
          rules={[{ required: true, message: '请输入昵称!' }]}
        >
          <Input />
        </Form.Item>
        {/* <Form.Item
          label='性别'
          name='sex'
          rules={[{ required: true, message: '请选择性别!' }]}
        >
          <Radio.Group>
            <Radio value={0}>女</Radio>
            <Radio value={1}>男</Radio>
          </Radio.Group>
        </Form.Item> */}
        <Form.Item
          label='电话'
          name='mobile'
          rules={[{ required: true, message: '请输入电话!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='邮箱'
          name='email'
          rules={[{ type: 'email', message: '请输入有效邮箱!' }, { required: true, message: '请输入邮箱!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='部门'
          name='departmentIds'
          rules={[{ required: true}]}
        >
          <TreeSelect
            multiple
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            treeData={treeData}
            placeholder='请选择部门'
          />
        </Form.Item>
        {/* <Form.Item
          label='状态'
          name='status'
          rules={[{ required: true, message: '请输入昵称!' }]}
        >
          <Radio.Group>
            <Radio value='1'>激活</Radio>
            <Radio value='0'>禁用</Radio>
          </Radio.Group>
        </Form.Item> */}
        <Form.Item
          label='角色'
          name='roleIds'
          rules={[{ required: true, message: '请选择角色!' }]}
        >
          <Select
            placeholder='请选择角色'
            mode='multiple'
            allowClear
          >
            {data.map((element: any) => (
              <Option value={element.id} key={element.id}>{element.roleName}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type='primary' htmlType='submit'>
            确定
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateForm;
