import React from 'react';
import { Form, Card, message, AutoComplete } from 'antd';
import ProForm, {
  ProFormCheckbox,
  ProFormSelect,
} from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { save, getResources, getRoles } from '../service';

const EntryForm = (props) => {

  const [form] = Form.useForm();
  const [role, setRole] = React.useState(null);
  const [resource, setResource] = React.useState(null);
  const [resources, setResources] = React.useState([]);

  // get roles 
  const fetchRoles = async () => {
    const result = await getRoles();
    const options = result.data.map(r => ({ label: r.alias, value: r._id, role: r }));
    return options;
  };

  // get resources
  const fetchResources = async () => {
    const result = await getResources();
    const options = result.data.map(r => ({ label: r.alias, value: r._id, resource: r }));
    setResources(options);
    return options;
  };

  const onFinish = async (values) => {
    console.log('values', values);

    if (!values.hasOwnProperty('isDisabled')) {
      values.isDisabled = false;
    }

    if (!values.hasOwnProperty('isAllowed')) {
      values.isAllowed = false;
    }

    const result = await save({ ...values, ...role, ...resource });
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
          <ProFormSelect
            width="md"
            name="roleId"
            label="Roles"
            request={fetchRoles}
            placeholder="Please select a role"
            rules={[{ required: true, message: 'Please select a role' }]}
            onChange={(value, e) => {
              console.log(value, e);
              setRole({ roleId: value, roleName: e.role.name, roleAlias: e.role.alias })
            }}
          />
          <ProFormSelect
            width="md"
            name="resourceId"
            label="Resources"
            request={fetchResources}
            placeholder="Please select resource"
            rules={[{ required: true, message: 'Please select a resource' }]}
            onChange={(value, e) => {
              console.log(value, e);
              setResource({ resourceId: value, resourceName: e.resource.name, resourceAlias: e.resource.alias });
            }}
          />
          <ProFormCheckbox name="isAllowed">
            Is allowed
          </ProFormCheckbox>
          <ProFormCheckbox name="isDisabled">
            Is disabled
          </ProFormCheckbox>
        </ProForm>

      </Card>
    </PageContainer>
  );
};

export default EntryForm;
