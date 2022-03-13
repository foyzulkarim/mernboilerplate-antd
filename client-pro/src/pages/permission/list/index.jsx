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
  const [fetchResources, setFetchResources] = useState(false);
  const { confirm } = Modal;

  const fetchResourceData = async () => {
    const hide = message.loading('Loading...');
    try {
      const result = await search({ current: current, pageSize: 10, ...param, ...sort });
      hide();
      setData(result);
      setFetchResources(false);
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

  const showDeleteConfirm = (item) => {
    confirm({
      title: `Do you Want to delete ${item.name}?`,
      icon: <ExclamationCircleOutlined />,
      content: `${item.name} will be deleted permanently.`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        console.log('OK');
        const r = await remove(item._id);
        if (r.success) {
          message.success(r.message);
          setFetchResources(true);
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const fetchResourceCount = async () => {
    const result = await count({ ...param });
    setTotal(result.total);
  };

  useEffect(() => {
    if (fetchResources) {
      fetchResourceData();
    }
  }, [fetchResources]);


  useEffect(() => {
    setCurrent(1);
    setSort(null);
    setFetchResources(true);
    fetchResourceCount();
  }, [param]);

  const [form] = Form.useForm();

  const onFinish = (values) => {
    setParam(values);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'resourceAlias',
      sorter: true,
      tip: 'Resource name',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              history.push(`/permissions/edit/${entity._id}`);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: 'Role',
      dataIndex: 'roleAlias',
    },
    {
      title: 'Allowed',
      dataIndex: 'isAllowed',
      valueType: 'text',
      renderText: (val) => {
        return val ? 'Yes' : 'No';
      }
    },
    {
      title: 'Disabled',
      dataIndex: 'isDisabled',
      valueType: 'text',
      renderText: (val) => {
        return val ? 'Yes' : 'No';
      }
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
          <Row gutter={4} style={{ width: '50%' }}>
            <Col flex={16} key={'name'}>
              <Form.Item
                name={`name`}
                label={`Name`}
              >
                <Input placeholder="Search keyword for name or alias" />
              </Form.Item>
            </Col>
            <Col flex={8}>
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
          headerTitle="Resources"
          actionRef={actionRef}
          rowKey="_id"
          search={false}
          options={{ reload: false }}
          toolBarRender={() => [
            <Button
              type="primary"
              key="primary"
              onClick={() => {
                history.push('/permissions/new');
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
            setFetchResources(true);
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
        onChange={(page, pageSize) => { setCurrent(page); setFetchResources(true); }}
        // style={{ background: 'white', padding: '10px' }}
        style={{ display: 'flex', 'justify-content': 'center', 'align-items': 'center', background: 'white', padding: '10px' }}
      />
    </>
  );
};

export default TableList;
