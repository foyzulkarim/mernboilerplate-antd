/* eslint-disable react/display-name */
import React from 'react';
import { Form, Input, Button, PageHeader, Divider, InputNumber, message } from "antd";

import * as API from "../../services/httpService";

const layout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 10,
    },
};

const ProductAdd = () => {
    const [form] = Form.useForm();
    const handleSubmit = async (values) => {
        await API.addProduct(values);
        message.success('Product is saved');        
        form.resetFields();       
    };

    return (
        <Form {...layout} form={form} name="nest-messages" onFinish={handleSubmit}>
            <PageHeader title="Add Product" />
            <Divider />
            <Form.Item
                name={"productName"}
                label="Product Name"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name={"sku"}
                label="SKU"
                rules={[
                    {
                        type: "string",
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name={"cost"}
                label="Cost"
            >
                <InputNumber />
            </Form.Item>
            <Form.Item
                name={"price"}
                label="Price"
            >
                <InputNumber />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default ProductAdd;
