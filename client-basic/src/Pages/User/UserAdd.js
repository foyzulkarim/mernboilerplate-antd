/* eslint-disable react/display-name */
import React from 'react';
import { Form, Input, Button, PageHeader, Divider, Select } from "antd";

const { Option } = Select;
const layout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 10,
    },
};

const UserAdd = () => {
    function handleChange(value) {
        console.log(`selected ${value}`);
    }
    return (
        <Form {...layout} name="nest-messages">
            <PageHeader title="Add User" />
            <Divider />
            <Form.Item
                name={["user", "user-name"]}
                label="Username"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name={["user", "address"]}
                label="Address"
                rules={[
                    {
                        type: "string",
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name={["user", "phone"]}
                label="Contact Number"
                rules={[
                    {
                        type: "string",
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item name={["user", "email"]} label="Email">
                <Input />
            </Form.Item>
            <Form.Item name={["user", "role"]} label="Role Name">
                <Select
                    defaultValue="Admin"
                    style={{ width: 300 }}
                    onChange={handleChange}
                >
                    <Option value="admin">Admin</Option>
                    <Option value="sales">Sales Team</Option>
                    <Option value="disabled" disabled>
                        Super Admin
                    </Option>
                    <Option value="worker">Worker</Option>
                </Select>
            </Form.Item>
            <Form.Item name={["user", "tags"]} label="Tags">
                <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default UserAdd;
