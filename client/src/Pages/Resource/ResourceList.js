/* eslint-disable react/display-name */
import React from 'react';
import { useState, useEffect } from "react";
import { Table, Space, Divider, DatePicker, Input } from "antd";
import { Link } from "react-router-dom";
import { getResources } from "../../services/httpService";
const columns = [
    {
        title: "Name",
        // dataIndex: 'name',
        key: "name",
        render: (obj) => {
            console.log(obj);
            return <Link to={`/resources/list/${obj.key}`}>{obj.name}</Link>;
        },
    },
    {
        title: "Resource Type",
        dataIndex: "type",
        key: "type",
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

const ResourceList = () => {
    const { Search } = Input;
    const { RangePicker } = DatePicker;
    const [data, setData] = useState([]);
    useEffect(() => {
        async function getData() {
            try {
                const response = await getResources();
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

export default ResourceList;
