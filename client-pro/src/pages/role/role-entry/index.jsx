import React from 'react';
import { Form, Card, message } from 'antd';
import ProForm, {
  ProFormDatePicker,
  ProFormDigit,
  ProFormRadio,
  ProFormText,
  ProFormTextArea,
  ProFormCheckbox,
} from '@ant-design/pro-form';
import { useRequest } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { save } from '../service';

const EntryForm = (props) => {

  const [form] = Form.useForm();

  const { run } = useRequest(save, {
    manual: true,
    onSuccess: (x) => {
      message.success('Role is saved', x);
      form.resetFields();
    },
    onError: (e) => {
      console.log(e);
      message.error('Error happened ', e);
    },
  });

  const onFinish = async (values) => {
    console.log(values, form);
    run(values);
  };

  return (
    <PageContainer content="My amazing role entry form">
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
                message: 'Please enter role name',
              },
            ]}
            placeholder="Please enter role name"
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
            placeholder="Please enter role alias"
          />
        </ProForm>
      </Card>
    </PageContainer>
  );
};

export default EntryForm;
