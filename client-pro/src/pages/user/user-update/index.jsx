import { Card, message } from 'antd';
import ProForm, {
  ProFormDatePicker,
  ProFormDigit,
  ProFormRadio,
  ProFormText,
  ProFormTextArea,
  ProFormSelect,
} from '@ant-design/pro-form';
import { useRequest, history } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { getById, update, validateUser } from '../service';
import React, { useEffect, useState } from 'react';

const EditForm = (props) => {
  const [user, setUser] = useState(null);
  const fetchRoles = async () => {
    const result = await getRoles();
    const options = result.data.map(r => ({ label: r.alias, value: r.name }));
    return options;
  };

  useEffect(() => {
    const { id } = props.match.params;
    const getUser = async (id) => {
      const item = await getById(id);
      setUser(item);
    }
    getUser(id);
  }, []);

  const { run } = useRequest(update, {
    manual: true,
    onSuccess: (x) => {
      message.success('User is saved', x);
      history.push('/users');
    },
    onError: (e) => {
      console.log(e);
      message.error('Error happened ', e);
    },
  });

  const onFinish = async (values) => {
    console.log(values);
    const { username, ...others } = values;
    run({ _id: user._id, ...others });
  };

  return (
    user && <PageContainer content="My amazing user update form">
      <Card bordered={false}>
        <ProForm
          hideRequiredMark={false}
          style={{
            margin: 'auto',
            marginTop: 8,
            maxWidth: 600,
          }}
          name="basic"
          layout="vertical"
          initialValues={user}
          onFinish={onFinish}
        >
          <ProFormText
            width="md"
            label="First name"
            name="firstName"
            value={user.firstName}
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
            value={user.lastName}
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
            disabled
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
                validator: async (_, e) => {
                  return await validateUser(_, e, user);
                },
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
                validator: async (_, e) => {
                  return await validateUser(_, e, user);
                },
                // validator: validateUser,
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

        </ProForm>
      </Card>
    </PageContainer>
  );
};

export default EditForm;
