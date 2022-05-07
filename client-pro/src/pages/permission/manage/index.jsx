import React, { useState, useRef, useEffect } from 'react';
import { Form, Card, message, Checkbox } from 'antd';
import ProForm, {
    ProFormCheckbox,
    ProFormSelect,
} from '@ant-design/pro-form';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { save, getResources, getRoles, search } from '../service';

const EntryForm = (props) => {
    const actionRef = useRef();
    const [data, setData] = useState([]);
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
        setResources(result.data);
        return options;
    };

    useEffect(() => {
        if (role) {
            const asyncGetData = async () => {
                const result = await search({ roleId: role.roleId, pageSize: -1 });
                const filtered = resources.filter(x => !result.data.some(y => y.resourceId === x._id))
                    .map(z => (
                        {
                            resourceAlias: z.alias, resourceId: z._id, resourceName: z.name,
                            isAllowed: false, isDisabled: false,
                            ...role,
                        }));
                console.log('filtered', filtered.length);
                setData([...result.data, ...filtered]);
            }
            asyncGetData();
        }
    }, [role]);

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

    const updatePermission = (entity) => {
        console.log('entity', entity);
    }

    const columns = [
        {
            title: 'Resource',
            dataIndex: 'resourceAlias',
            sorter: true,
            tip: 'Resource name',
            render: (dom, entity) => {
                return (
                    <>
                        {`${entity.resourceAlias} (${entity.resourceName})`}
                    </>
                );
            },
        },
        {
            title: 'Role',
            dataIndex: 'roleName',
            renderText: (val, entity) => (`${entity.roleAlias} (${val})`),
        },
        {
            title: 'Allowed',
            dataIndex: 'isAllowed',
            valueType: 'checkbox',
            // renderText: (val) => {
            //     return val ? true : false;
            // }
            render: (dom, entity) => {
                return (
                    <Checkbox
                        name="isAllowed"
                        // initialValue={entity.isAllowed}
                        // value={entity.isAllowed}
                        onChange={(val) => {
                            console.log('val', val);
                            updatePermission({ ...entity, isAllowed: val.target.checked });
                        }}
                        checked={entity.isAllowed}
                    />
                );
            }
        },
        {
            title: 'Disabled',
            dataIndex: 'isDisabled',
            valueType: 'text',
            // renderText: (val) => {
            //     return val ? 'Yes' : 'No';
            // }
            // render checkbox instead of text
            render: (dom, entity) => {
                return (
                    <Checkbox
                        name="isDisabled"
                        value={entity.isDisabled}
                        onChange={(value) => {
                            console.log('value', value);
                        }}
                    />
                );
            }
        },
        // {
        //     title: 'Actions',
        //     dataIndex: 'option',
        //     valueType: 'option',
        //     render: (_, record) => [
        //         <a
        //             key="config"
        //             onClick={() => {
        //                 showDeleteConfirm(record);
        //             }}
        //         >
        //             Delete
        //         </a>,
        //     ],
        // },
    ];

    return (
        <PageContainer content="My amazing resource entry form">
            <Card bordered={false}>
                <ProFormSelect
                    width="md"
                    name="roleId"
                    label="Roles"
                    request={fetchRoles}
                    placeholder="Please select a role"
                    rules={[{ required: true, message: 'Please select a role' }]}
                    onChange={(value, e) => setRole({ roleId: value, roleName: e.role.name, roleAlias: e.role.alias })}
                />
                <ProTable
                    headerTitle="Permissions"
                    actionRef={actionRef}
                    rowKey="_id"
                    search={false}
                    options={{ reload: false }}
                    onChange={(_, _filter, _sorter) => {
                        console.log('_sorter', _sorter);
                        let sort = {};
                        sort['sort'] = _sorter.field;
                        sort['order'] = _sorter.order === 'ascend' ? 1 : -1;
                        setSort(sort);
                        setFetchResources(true);
                    }}
                    onSubmit={(params) => { console.log(params); setParam(params); }}
                    dataSource={data}
                    columns={columns}
                    rowSelection={false}
                    pagination={false}
                />
            </Card>
        </PageContainer>
    );
};

export default EntryForm;
