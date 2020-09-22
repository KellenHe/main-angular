import React, { useState, useEffect } from 'react';
import { Form, Radio, Select, Input, TreeSelect, Button, message } from 'antd';
import { useRequest } from 'umi';
import { queryDataRuleList } from '../../services';

const FormItem = Form.Item;

interface DataRuleComponentProps {
  value?: any[];
  onSave?: (value: any[]) => void;
  dataType: any[];
  dataRuleExpress: any[];
}

const DataRule: React.FC<DataRuleComponentProps> = ({ value, onSave, dataType, dataRuleExpress }) => {
  const [formVals, setFormVals] = useState<any>(value ? value[0] : {});
  const [submitVals, setSubmitVals] = useState<any[]>(value || []);
  const [ruleList, setRuleList] = useState<any[]>([]);
  const [currentDataRule, setCurrentDataRule] = useState<any>({});
  const [dataRule, setDataRule] = useState<any[]>([]);
  const [form] = Form.useForm();

  const { loading, run } = useRequest(queryDataRuleList, {
    manual: true,
    onSuccess: (result) => {
      setRuleList([]);
      setCurrentDataRule({});
      if (result && result.length > 0) {
        setDataRule(result);
        const rules = result.map((rule: any) => {
          return {
            label: rule.columnDisplayName,
            value: rule.id
          };
        });
        setRuleList(rules);
        if (formVals) {
          setCurrentDataRule(result.find((rule: any) => rule.id === formVals.authorityConfigId));
        }
      }
    },
  });

  useEffect(() => {
    if (value && value[0] && value[0].authorityDataTyped) {
      run(value[0].authorityDataTyped);
    }
  }, []);

  const onDataTypeChange = async (value: any) => {
    const currentFormVals = submitVals.find(val => val.authorityDataTyped === value.target.value);
    form.setFieldsValue(currentFormVals || {
      authorityDataTyped: value.target.value,
      authorityConfigId: '',
      ruleExpression: '',
      ruleValue: '',
    });
    run(value.target.value);
  };

  const onDataRuleChange = (value: any) => {
    const currentRule = dataRule.find(rule => rule.id === value);
    setCurrentDataRule(currentRule);
  };

  const save = async () => {
    const fieldsValue = await form.validateFields();
    if (submitVals.some(val => val.authorityDataTyped === fieldsValue.authorityDataTyped)) {
      submitVals.forEach(val => {
        if (val.authorityDataTyped === fieldsValue.authorityDataTyped) {
          val.authorityConfigId = fieldsValue.authorityConfigId;
          val.ruleExpression = fieldsValue.ruleExpression;
          val.ruleValue = fieldsValue.ruleValue;
        }
      });
    } else {
      submitVals.push(fieldsValue);
    }
    setSubmitVals(submitVals);
    if (onSave) {
      onSave(submitVals);
    }
    message.success('保存成功');
  };

  const renderDataAuthority = () => {
    if (currentDataRule) {
      if (currentDataRule.frontColumnTyped === 'tree') {
        return (
          <>
            <FormItem
              name='ruleExpression'
              label='规则表达式'>
              <Select options={dataRuleExpress} />
            </FormItem>
            <FormItem
              name='treeValues'
              label='规则选值'>
              <TreeSelect
                multiple
                treeData={currentDataRule.data}
              />
            </FormItem>
          </>
        );
      }
      if (currentDataRule.frontColumnTyped === 'list') {
        return (
          <>
            <FormItem
              name='ruleExpression'
              label='规则表达式'>
              <Select options={dataRuleExpress} />
            </FormItem>
            <FormItem
              name='treeValues'
              label='规则选值'>
              <Select mode='multiple'>
                {currentDataRule.data.map((element: any) => (
                  <Select.Option value={element.key}>{element.titile}</Select.Option>
                ))}
              </Select>
            </FormItem>
          </>
        );
      }
      if (currentDataRule.frontColumnTyped === 'text') {
        return (
          <>
            <FormItem
              name='ruleExpression'
              label='规则表达式'>
              <Select options={dataRuleExpress} />
            </FormItem>
            <FormItem
              name='ruleValue'
              label='规则选值'>
              <Input />
            </FormItem>
          </>
        );
      }
    }
    return (
      <></>
    );
  };

  return (
    <>
      <Form
        form={form}
        initialValues={{ ...formVals }}
      >
        <FormItem
          name='authorityDataTyped'
          label='权限类型'>
          <Radio.Group options={dataType} optionType='button' onChange={onDataTypeChange}/>
        </FormItem>
        <FormItem
          name='authorityConfigId'
          label='数据规则'>
          <Select options={ruleList} loading={loading} onChange={onDataRuleChange}/>
        </FormItem>
        {renderDataAuthority()}
      </Form>
      <Button type='primary' onClick={save}>保存</Button>
    </>
  );
};

export default DataRule;
