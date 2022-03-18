import { Card, message } from 'antd';
import ProForm, {
  ProFormDatePicker,
  ProFormDigit,
  ProFormRadio,
  ProFormText,
  ProFormCheckbox,
  ProFormSelect,
} from '@ant-design/pro-form';
import { useRequest, history } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { getById, update, getRoles, getResources } from '../service';
import React, { useEffect, useState } from 'react';

const EditForm = (props) => {
  const [permission, setPermission] = useState(null);
  const [role, setRole] = React.useState(null);
  const [resource, setResource] = React.useState(null);

  useEffect(() => {
    const { id } = props.match.params;
    const getPermission = async (id) => {
      const item = await getById(id);
      setPermission(item);
      setRole({ roleName: item.roleName, roleAlias: item.roleAlias, roleId: item.roleId });
      setResource({ resourceName: item.resourceName, resourceAlias: item.resourceAlias, resourceId: item.resourceId });
    }
    getPermission(id);
  }, []);

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
    return options;
  };


  const onFinish = async (values) => {
    console.log('onFinish', values, role, resource);
    if (!values.hasOwnProperty('isDisabled')) {
      values.isDisabled = false;
    }

    if (!values.hasOwnProperty('isAllowed')) {
      values.isAllowed = false;
    }
    const payload = {
      _id: permission._id,
      ...values,
      ...role,
      ...resource,
    };
    const result = await update(payload);
    console.log('resource', result);
    if (result instanceof Error) {
      message.error(result.message);
    }
    else {
      message.success(result.message);
      history.push('/permissions');
    }
  };

  return (
    permission && <PageContainer content="My amazing role update form">
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
          initialValues={permission}
          onFinish={onFinish}
        >
          <ProFormSelect
            width="md"
            name="roleId"
            label="Roles"
            request={fetchRoles}
            placeholder="Please select a role"
            rules={[{ required: true, message: 'Please select a role' }]}
            onChange={(value, e) => setRole({ roleId: value, roleName: e.role.name, roleAlias: e.role.alias })}
          />
          <ProFormSelect
            width="md"
            name="resourceId"
            label="Resources"
            request={fetchResources}
            placeholder="Please select resource"
            rules={[{ required: true, message: 'Please select a resource' }]}
            onChange={(value, e) => setResource({ resourceId: value, resourceName: e.resource.name, resourceAlias: e.resource.alias })}
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

export default EditForm;
