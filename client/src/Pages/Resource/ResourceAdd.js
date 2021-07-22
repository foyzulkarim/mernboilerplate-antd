/* eslint-disable react/display-name */
import React from 'react';
import { Form, Input, Button, PageHeader, Divider } from "antd";

const layout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 10,
    },
};

const ResourceAdd = () => {
    return (
        <Form {...layout} name="nest-messages">
            <PageHeader title="Add Resource" />
            <Divider />
            <Form.Item
                name={["user", "resource"]}
                label="Resource Name"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name={["user", "type"]}
                label="Resource Type"
                rules={[
                    {
                        type: "string",
                    },
                ]}
            >
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

export default ResourceAdd;
