import React from 'react';
import { Form, Card, message } from 'antd';
import ProForm, {
  ProFormDatePicker,
  ProFormDigit,
  ProFormRadio,
  ProFormText,
  ProFormTextArea,
  ProFormCheckbox,
  ProFormSelect,
} from '@ant-design/pro-form';
import { useRequest } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { save } from '../service';

const EntryForm = (props) => {

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log(values, form);
    const result = await save(values);
    console.log('resource', result);
    if (result instanceof Error) {
      message.error(result.message);
    }
    else {
      message.success(result.message);
      form.resetFields();
      // setRole(null);
    }
  };

  return (
    <PageContainer content="My amazing resource entry form">
      <Card bordered={false}>
        <ProForm
          hideRequiredMark
          style={{
            margin: 'auto',
            marginTop: 8,
            maxWidth: 600,
          }}
          name="basic"
          layout="vertical"
          onFinish={(v) => onFinish(v)}
          form={form}
        >
          <ProFormText
            width="md"
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: 'Please enter resource name',
              },
            ]}
            placeholder="Please enter resource name"
          />

          <ProFormText
            width="md"
            label="Alias"
            name="alias"
            rules={[
              {
                required: true,
                message: 'Please enter the Alias',
              },
            ]}
            placeholder="Please enter resource alias"
          />

          <ProFormSelect
            width="md"
            name="type"
            label="Resource type"
            options={[
              {
                value: "api",
                label: "Api",
              },
              {
                value: "client",
                label: "Client",
              },
            ]}
            placeholder="Please select a type"
            rules={[{ required: true, message: 'Please select a type' }]}
          // onChange={(value, e) => setRole({ resourceId: value, resourceAlias: e.label })}
          />

        </ProForm>
      </Card>
    </PageContainer>
  );
};

export default EntryForm;
