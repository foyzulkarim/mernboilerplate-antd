/* eslint-disable react/display-name */
import React from 'react';
import {
    Form,
    Button,
    PageHeader,
    Divider,
    Switch,
    Select,
    Checkbox,
    Row,
    Col,
} from "antd";

const layout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 10,
    },
};
let { Option } = Select;

const PermissionAdd = () => {
    function onChange(checked) {
        console.log(`switch to ${checked}`);
    }
    function onChange2(checked) {
        console.log(`switch to ${checked}`);
    }
    function handleChange(value) {
        console.log(`selected ${value}`);
    }
    return (
        <Form {...layout} name="nest-messages">
            <PageHeader title="Add Permission" />
            <Divider />
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
            <Form.Item name={["user", "resource"]} label="Resource Name">
                <Checkbox.Group style={{ width: "100%" }} onChange={onChange}>
                    <Row>
                        <Col span={8}>
                            <Checkbox value="dashboard">Dashboard</Checkbox>
                        </Col>
                        <Col span={8}>
                            <Checkbox value="product">Product Add</Checkbox>
                        </Col>
                        <Col span={8}>
                            <Checkbox value="customer">Customer Add</Checkbox>
                        </Col>
                        <Col span={8}>
                            <Checkbox value="user">User Add</Checkbox>
                        </Col>
                        <Col span={8}>
                            <Checkbox value="role">Role Add</Checkbox>
                        </Col>
                        <Col span={8}>
                            <Checkbox value="resource">Resource Add</Checkbox>
                        </Col>
                    </Row>
                </Checkbox.Group>
            </Form.Item>
            <Form.Item name={["user", "isAllowed"]} label="Allow Resource">
                <Switch defaultChecked onChange={onChange} />
            </Form.Item>
            <Form.Item name={["user", "isDisabled"]} label="Disable Resource">
                <Switch defaultChecked onChange={onChange2} />
            </Form.Item>

            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default PermissionAdd;
