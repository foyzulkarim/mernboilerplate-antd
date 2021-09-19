/* eslint-disable react/display-name */
import React, { useState } from 'react';
import {
    Form,
    Button,
    PageHeader,
    Divider,
    Checkbox,
    Input,
    message
} from "antd";

import * as API from "../../services/httpService";

const layout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 10,
    },
};

const RoleAdd = () => {
    const [form] = Form.useForm();
    const [isAdmin, setIsAdmin] = useState(false);

    const handleSubmit = async (values) => {
        await API.addRole({ name: values.name, alias: values.alias, isAdmin: isAdmin });
        message.success('Role is saved');
        form.resetFields();
    };

    return (
        <Form {...layout} form={form} name="nest-messages" onFinish={handleSubmit}>
            <PageHeader title="Add Role" />
            <Divider />
            <Form.Item
                name={"name"}
                label="Role Name"
                rules={[{ required: true, }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name={"alias"}
                label="Role Alias"
                rules={[{ type: "string" }]}
            >
                <Input />
            </Form.Item>
            <Form.Item name={"isAdmin"} label='Is Admin'>
                <Checkbox onChange={(e) => setIsAdmin(e.target.checked)} />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form >
    );
};

export default RoleAdd;
