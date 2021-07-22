/* eslint-disable react/display-name */
import React, { useState, useEffect } from "react";
import { Table, Space, Divider, DatePicker, Input, PageHeader, Button, Select, message, Spin } from "antd";
import { SearchOutlined, SaveOutlined, DeleteOutlined } from '@ant-design/icons';
import { AppProtectedComponent } from "./../../components/AppProtectedComponent";
import { Link } from "react-router-dom";
import moment from 'moment';
import * as API from "../../services/httpService";


const columns = [
    {
        title: "Name",
        dataIndex: "productName",
        key: "productName",
        render: (text) => <a href="/#">{text}</a>,
    },
    {
        title: "SKU",
        dataIndex: "sku",
        key: "sku",
    },
    {
        title: "Price",
        dataIndex: "price",
        key: "price",
    },
    {
        title: "Cost",
        dataIndex: "cost",
        key: "cost",
    },
    {
        title: "Updated",
        dataIndex: "updatedAt",
        key: "updatedAt",
        render: (text) => moment(text).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
        title: "Action",
        key: "action",

        render: (obj) => (
            <Space size="middle">
                <AppProtectedComponent
                    component={Button}
                    name="product-edit-button"
                    type="button"
                >
                    <Link to={`/products/edit/${obj.key}`}>Edit</Link>
                </AppProtectedComponent>
                <AppProtectedComponent
                    component={Button}
                    name="product-delete-button"
                    type="button"
                >
                    <Link to={`/products/delete/${obj.key}`}>Delete</Link>
                </AppProtectedComponent>
            </Space>
        ),
    },
];

const { Option } = Select;
const { RangePicker } = DatePicker;

const ProductList = () => {
    const dateFormat = 'YYYY/MM/DD';

    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [filters, setFilters] = useState([]);

    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [searchText, setSearchText] = useState('');
    const [filterName, setFilterName] = useState('');
    const [filterId, setFilterId] = useState('');


    const searchProducts = async () => {
        const products = await API.searchProducts(fromDate, toDate, searchText);
        setData(products);
    }

    const onDateChange = (values) => {
        console.log(values);
        if (values) {
            setFromDate(values[0]);
            setToDate(values[1]);
        }
        else {
            setFromDate('');
            setToDate('');
        }
    }

    const saveFilter = async () => {
        console.log(filterName, filterId);
        const payload = { collectionName: 'products', searchText, fromDate, toDate, id: filterId, filterName };
        filterId ? await API.updateFilter(payload) : await API.addFilter(payload);
        message.success('Filter is saved');
        clearFilter();
        reloadFilters();
    }

    const deleteSelectedFilter = async () => {
        await API.deleteFilter(filterId);
        clearFilter();
        reloadFilters();
    }

    const clearFilter = () => {
        setFilterName('');
        setFilterId(null);
    }

    const handleChange = async (id) => {
        console.log(id);
        if (id) {
            const f = filters.find(x => x._id === id);
            if (f) {
                console.log(f);
                setFilterName(f.filterName);
                setFilterId(f._id);
                if (f.fromDate) {
                    setFromDate(moment(f.fromDate, dateFormat));
                }
                if (f.toDate) {
                    setToDate(moment(f.toDate, dateFormat));
                }
                if (f.searchText) {
                    setSearchText(f.searchText);
                }
                console.log(fromDate, toDate, searchText);
            }
            else clearFilter();
        }
        else clearFilter();
    }

    const InputFilter = () => {
        return (
            <Space>
                {!filterId && <span>Save filter</span>}
                {filterId && <span>Update filter</span>}
                <Input placeholder='Filter name'
                    onChange={e => setFilterName(e.target.value)}
                    value={filterName} onBlur={(e) => { setFilterName(e.target.value) }} />
                <Button type="primary" onClick={saveFilter} icon={<SaveOutlined />} />
            </Space>
        );
    }

    const reloadFilters = async () => {
        const fs = await API.searchFilters();
        setFilters(fs);
    }


    useEffect(() => {
        const load = async () => {
            setIsLoading(true);
            const products = await API.searchProducts();
            console.log(products);
            setData(products);
            setIsLoading(false);
        }

        load();
    }, []);

    useEffect(() => {
        const load = async () => {
            setIsLoading(true);
            await reloadFilters();
            setIsLoading(false);
        }

        load();
    }, []);

    return (
        <div>
            <Space direction="vertical">
                <PageHeader title="Product list" />

                <Space
                    direction="horizontal"
                    wrap
                    split={<Divider type="vertical" />}
                >
                    <RangePicker
                        defaultValue={[moment('2015/01/01', dateFormat), moment('2015/01/01', dateFormat)]}
                        format={dateFormat}
                        value={[fromDate, toDate]}
                        onChange={onDateChange}
                    />
                    <Input
                        placeholder="Search text"
                        allowClear
                        style={{ width: "15vw" }}
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        onBlur={(e) => setSearchText(e.target.value)}
                    />
                    <Button type="primary" icon={<SearchOutlined />} onClick={searchProducts} />
                    <span>Saved filters</span>
                    <Select
                        allowClear
                        style={{ width: 120 }}
                        value={filterId}
                        onChange={handleChange}>
                        {filters.map(filter => <Option key={filter._id}>{filter.filterName}</Option>)}
                    </Select>
                    {filterId && <Button type="danger" onClick={deleteSelectedFilter} icon={<DeleteOutlined />} />}
                    {InputFilter()}
                    <div className="loading-wrap">
                        <Spin spinning={isLoading} />
                    </div>
                </Space>
                <Divider />
            </Space>
            <Table columns={columns} dataSource={data}></Table>
        </div >
    );
};

export default ProductList;
