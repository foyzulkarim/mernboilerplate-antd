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
  const [role, setRole] = useState(null);

  useEffect(() => {
    const { id } = props.match.params;
    const getRole = async (id) => {
      const item = await getById(id);
      setRole(item);
    }
    getRole(id);
  }, []);

  const { run } = useRequest(update, {
    manual: true,
    onSuccess: (x) => {
      message.success('Role is saved', x);
      history.push('/roles');
    },
    onError: (e) => {
      console.log(e);
      message.error('Error happened ', e);
    },
  });

  const onFinish = async (values) => {
    console.log(values);
    run({ _id: role._id, ...values });
  };

  return (
    role && <PageContainer content="My amazing role update form">
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
          initialValues={role}
          onFinish={onFinish}
        >
          <ProFormText
            width="md"
            label="Name"
            name="name"
            value={role.name}
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
            value={role.alias}
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

export default EditForm;
