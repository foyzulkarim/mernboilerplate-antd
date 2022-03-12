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
import { save, getRoles, check as checkUser, validateUser } from '../service';

const EntryForm = (props) => {

  const [form] = Form.useForm();

  // get roles 
  const fetchRoles = async () => {
    const result = await getRoles();
    const options = result.data.map(r => ({ label: r.alias, value: r._id }));
    return options;
  };

  const { run } = useRequest(save, {
    manual: true,
    onSuccess: (x) => {
      message.success('User is saved', x);
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



  const checkConfirm = (_, value) => {
    const promise = Promise;

    if (value && value !== form.getFieldValue('password')) {
      return promise.reject('The passwords entered twice do not match!');
    }

    return promise.resolve();
  };

  return (
    <PageContainer content="My amazing user entry form">
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
            label="First name"
            name="firstName"
            rules={[
              {
                required: true,
                message: 'Please enter first name',
              },
            ]}
            placeholder="Please enter first name"
          />

          <ProFormText
            width="md"
            label="Last name"
            name="lastName"
            rules={[
              {
                required: true,
                message: 'Please enter last name',
              },
            ]}
            placeholder="Please enter last name"
          />

          <ProFormText
            width="md"
            label="Username"
            name="username"
            fullField="Username"
            rules={[
              {
                validator: validateUser,
              },
            ]}
            placeholder="Please enter username"
          />

          <ProFormText
            width="md"
            label="Phone number"
            name="phoneNumber"
            rules={[
              {
                pattern: /^01[0-9]{9}$/,
                message: 'Malformed phone number!',
              },
              {
                validator: validateUser,
              },
            ]}
            placeholder="eg. 01XXXXXXXXX"
          />

          <ProFormText
            width="md"
            label="Email"
            name="email"
            rules={[
              {
                type: 'email',
                message: 'Email address format error!',
              },
              {
                validator: validateUser,
              },
            ]}
            placeholder="Please enter email"
          />

          <ProFormSelect
            width="md"
            name="roleName"
            label="Role"
            request={fetchRoles}
            placeholder="Please select a role"
            rules={[{ required: true, message: 'Please select role' }]}
          />

          <ProFormText.Password
            width="md"
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please enter the password',
              },
            ]}
            placeholder="Please enter password"
          />

          <ProFormText.Password
            width="md"
            label="Confirm password"
            name="confirm"
            rules={[
              {
                required: true,
                message: 'Confirm password',
              },
              {
                validator: checkConfirm,
              },
            ]}
            placeholder="Please re-enter password"
          />
        </ProForm>
      </Card>
    </PageContainer>
  );
};

export default EntryForm;
