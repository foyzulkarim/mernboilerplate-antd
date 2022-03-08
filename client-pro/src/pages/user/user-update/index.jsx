import { Card, message } from 'antd';
import ProForm, {
  ProFormDatePicker,
  ProFormDigit,
  ProFormRadio,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { useRequest, history } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { getById, update } from '../service';
import React, { useEffect, useState } from 'react';

const EditForm = (props) => {
  const [user, setUser] = useState(null);

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
    run({ _id: user._id, ...values });
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
                message: 'Please enter user name',
              },
            ]}
            placeholder="Please enter user name"
          />

          <ProFormText
            width="md"
            label="Alias"
            name="alias"
            value={user.alias}
            rules={[
              {
                required: true,
                message: 'Please enter the Alias',
              },
            ]}
            placeholder="Please enter user alias"
          />
        </ProForm>
      </Card>
    </PageContainer>
  );
};

export default EditForm;
