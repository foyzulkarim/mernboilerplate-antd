/* eslint-disable react/display-name */
import React from 'react';
import { useState, useEffect } from "react";
import { Table, Tag, Space, Divider, DatePicker, Input } from "antd";
import { Link } from "react-router-dom";
import { getUsers } from "../../services/httpService";

const columns = [
    {
        title: "Name",
        // dataIndex: 'name',
        key: "name",
        displayName: 'Name',
        render: (obj) => <Link to={`/users/list/${obj.key}`}>{obj.name}</Link>,
    },
    {
        title: "Address",
        dataIndex: "address",
        key: "address",
    },
    {
        title: "Phone Number",
        dataIndex: "contact",
        key: "contact",
    },
    {
        title: "Role",
        dataIndex: "role",
        key: "role",
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
                <Link to={`/users/edit/${obj.key}`}>Edit</Link>
                <a href="/#">Delete</a>
            </Space>
        ),
    },
];

const UserList = () => {
    const { Search } = Input;
    const { RangePicker } = DatePicker;
    const [data, setData] = useState([]);
    useEffect(() => {
        async function getData() {
            try {
                const response = await getUsers();
                console.log("response", response);
                setData(response);
            } catch (error) {
                console.log(error);
            }
        }
        getData();
    }, []);
    return (
        <div>
            <Space direction="vertical">
                <Space
                    direction="horizontal"
                    wrap
                    split={<Divider type="vertical" />}
                >
                    <RangePicker />
                    <Search
                        placeholder="Search text"
                        loading={false}
                        allowClear
                        style={{ width: "15vw" }}
                    />
                </Space>
                <Divider />
            </Space>
            <Table columns={columns} dataSource={data}></Table>
        </div>
    );
};

export default UserList;
