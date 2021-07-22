/* eslint-disable react/display-name */
import React from 'react';
import { useState, useEffect } from "react";
import { Table, Tag, Space, Button } from "antd";
import { Link } from "react-router-dom";
import { AppProtectedComponent } from "./../../components/AppProtectedComponent";
import { getCustomers } from "../../services/httpService";

const columns = [
    {
        title: "Name",
        // dataIndex: 'name',
        key: "name",
        render: (obj) => {
            console.log(obj);
            return <Link to={`/customers/list/${obj.key}`}>{obj.name}</Link>;
        },
    },
    {
        title: "SKU",
        dataIndex: "sku",
        key: "sku",
    },
    {
        title: "Unit Price",
        dataIndex: "price",
        key: "price",
    },
    {
        title: "Tags",
        key: "tags",
        dataIndex: "tags",
        render: (tags) => (
            <>
                {tags.map((tag) => {
                    let color = tag.length > 7 ? "lightblue" : "green";
                    if (tag === "putrid") {
                        color = "volcano";
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
    {
        title: "Action",
        key: "action",
        render: (obj) => (
            <Space size="middle">
                <AppProtectedComponent
                    component={Button}
                    name="customer-edit-button"
                    type="button"
                >
                    <Link to={`/customers/edit/${obj.key}`}>Edit</Link>
                </AppProtectedComponent>
                <AppProtectedComponent
                    component={Button}
                    name="customer-delete-button"
                    type="button"
                >
                    <Link to={`/customers/delete/${obj.key}`}>Delete</Link>
                </AppProtectedComponent>
            </Space>
        ),
    },
];

const CustomerList = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        async function getData() {
            try {
                const response = await getCustomers();
                setData(response);
            } catch (error) {
                console.log(error);
            }
        }
        getData();
    }, []);
    return <Table columns={columns} dataSource={data}></Table>;
};

export default CustomerList;
