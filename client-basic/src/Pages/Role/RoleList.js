/* eslint-disable react/display-name */
import React from 'react';
import { useState, useEffect } from "react";
import { Table, Space, Divider, DatePicker, Input, PageHeader } from "antd";
import { Link } from "react-router-dom";
import * as API from "../../services/httpService";
const columns = [
    {
        title: "Name",
        key: "name",
        render: (obj) => {
            return <Link to={`/roles/list/${obj.key}`}>{obj.name}</Link>;
        },
    },
    {
        title: "Alias",
        dataIndex: "alias",
        key: "alias",
    },
    {
        title: "Action",
        key: "action",
        render: () => (
            <Space size="middle">
                <a href="/#">Delete</a>
            </Space>
        ),
    },
];


const RoleList = () => {
    const { Search } = Input;
    const { RangePicker } = DatePicker;
    const [data, setData] = useState([]);
    useEffect(() => {
        async function getData() {
            try {
                const response = await API.searchRoles();
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
                <PageHeader title="Role list" />
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

export default RoleList;
