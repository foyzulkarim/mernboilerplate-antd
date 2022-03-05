import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, message, Pagination, Form, Row, Col, Input, DatePicker, Modal } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { PageContainer, } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { history } from 'umi';
import { count, search, remove } from '../service';


const TableList = () => {
  const actionRef = useRef();
  const [data, setData] = useState({ data: [] });
  const [current, setCurrent] = useState(1);
  const [param, setParam] = useState({});
  const [sort, setSort] = useState({});
  const [total, setTotal] = useState(0);
  const [fetchRoles, setFetchRoles] = useState(false);
  const { confirm } = Modal;

  const fetchRoleData = async () => {
    const hide = message.loading('Loading...');
    try {
      const result = await search({ current: current, pageSize: 10, ...param, ...sort });
      hide();
      setData(result);
      setFetchRoles(false);
      return result;
    } catch (error) {
      hide();
      const str = JSON.stringify(error);
      const ex = JSON.parse(str);
      console.log(ex);
      message.error(ex.data.errorMessage);
      return false;
    }
  };

  const showDeleteConfirm = (product) => {
    confirm({
      title: `Do you Want to delete ${product.name}?`,
      icon: <ExclamationCircleOutlined />,
      content: `${product.name} will be deleted permanently.`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        console.log('OK');
        const r = await remove(product._id);
        if (r.success) {
          message.success(r.message);
          setFetchRoles(true);
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const fetchRoleCount = async () => {
    const result = await count({ ...param });
    setTotal(result.total);
  };

  useEffect(() => {
    if (fetchRoles) {
      fetchRoleData();
    }
  }, [fetchRoles]);


  useEffect(() => {
    setCurrent(1);
    setSort(null);
    setFetchRoles(true);
    fetchRoleCount();
  }, [param]);

  const [form] = Form.useForm();

  const onFinish = (values) => {
    setParam(values);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: true,
      tip: 'Role name',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              history.push(`/roles/edit/${entity._id}`);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: 'Alias',
      dataIndex: 'alias',
    },
    {
      title: 'Actions',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            showDeleteConfirm(record);
          }}
        >
          Delete
        </a>,
      ],
    },
  ];
  return (
    <>
      <PageContainer>
        <Form
          form={form}
          name="advanced_search"
          className="ant-advanced-search-form"
          onFinish={onFinish}
          style={{ display: 'flex', 'align-items': 'left', background: 'white', padding: '10px' }}
        >
          <Row gutter={16}>
            <Col flex={6} key={'name'}>
              <Form.Item
                name={`name`}
                label={`Name`}
              >
                <Input placeholder="Search keyword for name or alias" />
              </Form.Item>
            </Col>
            <Col flex={6}>
              <Button type="primary" htmlType="submit">
                Search
              </Button>
              <Button style={{ margin: '0 8px', }} onClick={() => { form.resetFields(); }}>
                Clear
              </Button>
            </Col>
          </Row>
        </Form>
        <ProTable
          headerTitle="Roles"
          actionRef={actionRef}
          rowKey="_id"
          search={false}
          options={{ reload: false }}
          toolBarRender={() => [
            <Button
              type="primary"
              key="primary"
              onClick={() => {
                history.push('/roles/new');
              }}
            >
              <PlusOutlined /> New
            </Button>,
          ]}
          onChange={(_, _filter, _sorter) => {
            console.log('_sorter', _sorter);
            let sort = {};
            sort['sort'] = _sorter.field;
            sort['order'] = _sorter.order === 'ascend' ? 1 : -1;
            setSort(sort);
            setFetchRoles(true);
          }}
          onSubmit={(params) => { console.log(params); setParam(params); }}
          dataSource={data.data}
          columns={columns}
          rowSelection={false}
          pagination={false}
        />
      </PageContainer>
      <Pagination
        total={total}
        showSizeChanger={false}
        showQuickJumper={false}
        showTotal={total => `Total ${total} items`}
        defaultCurrent={current}
        onChange={(page, pageSize) => { setCurrent(page); setFetchRoles(true); }}
        // style={{ background: 'white', padding: '10px' }}
        style={{ display: 'flex', 'justify-content': 'center', 'align-items': 'center', background: 'white', padding: '10px' }}
      />
    </>
  );
};

export default TableList;
