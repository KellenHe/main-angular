import React, { useState } from 'react';
import { Modal, Form, Input, Select, Button, Row, Col, Space } from 'antd';
import { Access, useRequest } from 'umi';
import { queryDictByType } from '../../services';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

interface CreateFormProps {
  modalVisible: boolean;
  onSubmit: (values: any) => void;
  onCancel: () => void;
  values: any;
  isUpdate: boolean;
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 20, span: 4 },
};

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const [typeSelected, handleIsUpdate] = useState<string>('');
  const [form] = Form.useForm();

  const {
    onSubmit: handleUpdate,
    onCancel: handleUpdateModalVisible,
    modalVisible,
    values,
    isUpdate
  } = props;

  const { data: jobType, loading } = useRequest(() => {
    return queryDictByType('job_type');
  });

  const onTypeSelected = async (value: string) => {
    handleIsUpdate(value);
    const { data } = await queryDictByType(value);
    if (data) {
      console.log(data);
    }
  };

  const FormChange = (props: any) => {
    const type = props.typeSelected;
    if (type === 'native') {
      return (
        <Row gutter={[16, 24]}>
          <Col span={12}>
             <Form.Item style={{marginBottom: '12px'}}
              label='bean名称'
              name={'bean_name'}
              rules={[{ required: true, message: '请填写bean名称' }]}
            >
              <Input placeholder='bean名称' />
            </Form.Item>
          </Col>

          <Col span={12}>
             <Form.Item style={{marginBottom: '12px'}}
              label='方法名称'
              name={'baen_method'}
              rules={[{ required: true, message: '请填写方法名称' }]}
            >
              <Input placeholder='方法名称' />
            </Form.Item>
          </Col>
          <Col span={12}>
              <Form.Item style={{marginBottom: '12px'}}
              label='参数内容'
              name={'param'}
            >
              <Input.TextArea placeholder='参数内容：非必须' />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.List name='native'>
              {(fields, { add, remove }) => {
                return (
                  <Row gutter={[16, 24]}>
                    <Col span={4}>
                    </Col>

                    <Col span={16}>
                      <Button
                        type='dashed'
                        onClick={() => {
                          add();
                        }}
                        block
                      >
                        <PlusOutlined />添加子任务
                      </Button>
                    </Col>

                    <Col span={4}>
                    </Col>
                    <Col span={24}>
                      {fields.map(field => (
                        <Row gutter={[16, 24]} key={field.key} style={{margin: 0}}>
                          <Col span={12}>
                             <Form.Item style={{marginBottom: '12px'}}
                              {...field}
                              label={'bean名称'}
                              name={[field.name, 'bean_name']}
                              fieldKey={[field.fieldKey, 'bean_name']}
                              rules={[{ required: true, message: '请填写bean名称' }]}
                            >
                              <Input placeholder='bean名称' />
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                             <Form.Item style={{marginBottom: '12px'}}
                              {...field}
                              label={'方法名称'}
                              name={[field.name, 'baen_method']}
                              fieldKey={[field.fieldKey, 'baen_method']}
                              rules={[{ required: true, message: '请填写方法名称' }]}
                            >
                              <Input placeholder='方法名称' />
                            </Form.Item>
                          </Col>

                          <Col span={12}>
                             <Form.Item style={{marginBottom: '12px'}}
                              {...field}
                              label={'参数内容'}
                              name={[field.name, 'param']}
                              fieldKey={[field.fieldKey, 'param']}
                            >
                              <Input.TextArea placeholder='参数内容：非必须' />
                            </Form.Item>
                          </Col>

                          <Col span={8}>
                          </Col>

                          <Col span={4}>
                            <Button
                              onClick={() => {
                                remove(field.name);
                              }}
                              block
                            >
                              删除
                            </Button>
                          </Col>
                        </Row>
                      ))}
                    </Col>
                  </Row>
                );
              }}
            </Form.List>
          </Col>
        </Row>
      );
    } else if (type === 'remote') {
      return (
        <Row gutter={[16, 24]}>
          <Col span={12}>
            <Form.Item style={{marginBottom: '12px'}}
              label='接口地址'
              name={'url'}
              rules={[{ required: true, message: '请填写接口地址' }]}
            >
              <Input placeholder='接口地址' />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item style={{marginBottom: '12px'}}
              label='请求方法'
              name={'requestMethod'}
              rules={[{ required: true, message: '请填写请求方法' }]}
            >
              <Input placeholder='请求方法' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item style={{marginBottom: '12px'}}
              label='接口参数'
              name={'params'}
            >
              <Input.TextArea placeholder='接口参数：非必须' />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item style={{marginBottom: '12px'}}
              label='token设置'
              name={'token'}
              rules={[{ required: true, message: '请填写token' }]}
            >
              <Input placeholder='token设置' />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.List name='remote'>
              {(fields, { add, remove }) => {
                return (
                  <Row gutter={[16, 24]}>

                    <Col span={4}>
                    </Col>

                    <Col span={16}>
                      <Button
                        type='dashed'
                        onClick={() => {
                          add();
                        }}
                        block
                      >
                        <PlusOutlined />添加子任务
                      </Button>
                    </Col>

                    <Col span={4}>
                    </Col>
                    <Col span={24}>
                      {fields.map(field => (
                        <Row gutter={[16, 24]} key={field.key} style={{margin: 0}}>
                          <Col span={12}>
                             <Form.Item style={{marginBottom: '12px'}}
                              {...field}
                              label={'接口地址'}
                              name={[field.name, 'url']}
                              fieldKey={[field.fieldKey, 'url']}
                              rules={[{ required: true, message: '请填写接口地址' }]}
                            >
                              <Input placeholder='bean名称' />
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                             <Form.Item style={{marginBottom: '12px'}}
                              {...field}
                              label={'请求方法'}
                              name={[field.name, 'requestMethod']}
                              fieldKey={[field.fieldKey, 'requestMethod']}
                              rules={[{ required: true, message: '请填写请求方法' }]}
                            >
                              <Input placeholder='请求方法' />
                            </Form.Item>
                          </Col>

                          <Col span={12}>
                             <Form.Item style={{marginBottom: '12px'}}
                              {...field}
                              label={'接口参数'}
                              name={[field.name, 'params']}
                              fieldKey={[field.fieldKey, 'params']}
                            >
                              <Input.TextArea placeholder='接口参数：非必须' />
                            </Form.Item>
                          </Col>

                          <Col span={12}>
                            <Form.Item style={{marginBottom: '12px'}}
                              {...field}
                              label={'token设置'}
                              name={[field.name, 'token']}
                              fieldKey={[field.fieldKey, 'token']}
                              rules={[{ required: true, message: '请填写token' }]}
                            >
                              <Input placeholder='token设置' />
                            </Form.Item>
                          </Col>

                          <Col span={20}>
                          </Col>
                          <Col span={4}>
                            <Button
                              onClick={() => {
                                remove(field.name);
                              }}
                              block
                            >
                              删除
                            </Button>
                          </Col>
                        </Row>
                      ))}
                    </Col>
                  </Row>
                );
              }}
            </Form.List>
          </Col>
        </Row>
      );
    }
    return (
      <></>
    );
  };

  if (loading) {
    return (
      <></>
    );
  }

  return (
    <Modal
      destroyOnClose
      title={isUpdate ? '修改任务' : '新建任务'}
      visible={modalVisible}
      onCancel={() => handleUpdateModalVisible()}
      footer={null}
      width={800}
    >
      <Form
        name='basic'
        {...layout}
        form={form}
        initialValues={{ ...values}}
        onFinish={(formValues) => handleUpdate({...formValues, id: values.id})}
        labelAlign='left'
      >
        <Row gutter={[16, 24]}>
          <Col span={12}>
             <Form.Item style={{marginBottom: '12px'}}
              label='任务名称'
              name='jobName'
              rules={[{ required: true, message: '请输入任务名称!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
             <Form.Item style={{marginBottom: '12px'}}
              label='cron表达式'
              name='jobCron'
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
             <Form.Item style={{marginBottom: '12px'}}
              label='任务负责人'
              name='jobRecharge'
              rules={[{ required: true, message: '请输入任务负责人!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
             <Form.Item style={{marginBottom: '12px'}}
              label='告警邮箱'
              name='jobEmail'
              rules={[{ type: 'email', message: '请输入有效邮箱!' }, { required: true, message: '请输入告警邮箱!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
             <Form.Item style={{marginBottom: '12px'}}
              label='调用方式'
              name='jobTyped'
              rules={[{ required: true}]}
            >
              <Select options={jobType} onSelect={onTypeSelected} />
            </Form.Item>
          </Col>
        </Row>
        <FormChange typeSelected={typeSelected}></FormChange>
         <Form.Item style={{marginBottom: '12px'}} {...tailLayout}>
          <Button type='primary' htmlType='submit'>
            确定
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateForm;
