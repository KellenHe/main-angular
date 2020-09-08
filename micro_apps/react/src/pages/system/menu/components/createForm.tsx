import React, { useState } from 'react';
import { useRequest } from 'umi';
import { Modal, Form, Radio, Input, Row, Col, InputNumber, TreeSelect, Button } from 'antd';
import { queryMenu } from '../../services';
import IconSelector from './iconSelector';

interface CreateFormProps {
  modalVisible: boolean;
  onCancel: () => void;
  onSubmit: (values: any) => void;
  values: any;
}

const tailLayout = {
  wrapperCol: { offset: 20, span: 4 },
};

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const [form] = Form.useForm();
  const [fields, setFields] = useState({ authorityMenuTyped: 'catalog', menuOrder: 999 });

  const { modalVisible, onCancel } = props;

  const {
    onSubmit: handleUpdate,
    values
  } = props;

  const { data, loading } = useRequest(() => {
    return queryMenu();
  });

  if (loading) {
    return (
      <div>loading</div>
    );
  }

  const menuDatas = [{
    key: -1,
    title: '顶部',
    children: data
  }];

  return (
    <Modal
      destroyOnClose
      title='新建规则'
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      <Form
        name='menuForm'
        form={form}
        initialValues={{ ...values }}
        onFinish={(formValues) => handleUpdate(formValues)}
      >
        <Form.Item label='菜单类型' name='authorityMenuTyped'>
          <Radio.Group>
            <Radio.Button value='catalog'>目录</Radio.Button>
            <Radio.Button value='menu'>菜单</Radio.Button>
            <Radio.Button value='button'>按钮</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label='菜单图标' name='icon'>
          <IconSelector />
        </Form.Item>
        <Form.Item label='菜单标题' name='title'>
          <Input />
        </Form.Item>
        <Row>
          <Col span={12}>
            <Form.Item label='路由地址' name='link'>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12} className='text-right'>
            <Form.Item label='菜单排序' name='menuOrder'>
              <InputNumber min={0} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label='上级目录' name='parentId'>
          <TreeSelect
            treeData={menuDatas}
          />
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
