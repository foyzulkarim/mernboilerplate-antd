import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, message, Pagination, Form, Row, Col, Input, DatePicker, Modal } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { PageContainer, } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { history, useAccess } from 'umi';
import { count, search, remove } from '../service';

const DeleteButton = (props) => {

  const { confirm } = Modal;
  const { elementId } = props;

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
          setFetchRoles(true);
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const access = useAccess();
  const isVisible = access.canShow(elementId);
  if (isVisible) {
    const isDisabled = access.isDisabled(elementId);
    return isDisabled ? <span>Delete</span> : <a
      key="config"
      onClick={() => {
        showDeleteConfirm(props.record);
      }}
    >
      Delete
    </a>;
  }
  return null;
}


const TableList = () => {
  const actionRef = useRef();
  const [data, setData] = useState({ data: [] });
  const [current, setCurrent] = useState(1);
  const [searchObject, setSearchObject] = useState({});
  const [sort, setSort] = useState({});
  const [total, setTotal] = useState(0);
  const [fetchRoles, setFetchRoles] = useState(false);
  const { confirm } = Modal;

  const fetchRoleData = async () => {
    console.log('REACT_APP_DEFAULT_PAGE_SIZE', DEFAULT_PAGE_SIZE);
    const hide = message.loading('Loading...');
    try {
      const result = await search({ current: current, pageSize: 10, ...sort, ...searchObject });
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

  const fetchRoleCount = async () => {
    const result = await count({ ...searchObject });
    setTotal(result.total);
  };

  useEffect(() => {
    if (fetchRoles) {
      fetchRoleData();
    }
  }, [fetchRoles]);

  useEffect(() => {
    setFetchRoles(true);
  }, [current, sort]);

  useEffect(() => {
    fetchRoleCount();
    setFetchRoles(true);
  }, []);

  useEffect(() => {
    fetchRoleCount();
    setFetchRoles(true);
  }, [searchObject]);

  const [form] = Form.useForm();

  const onFinish = (values) => {
    setCurrent(1);
    setSearchObject(values);
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
      sorter: true,
    },
    {
      title: 'Updated At',
      dataIndex: 'updatedAt',
      valueType: 'dateTime',
      sorter: true,
    },
    {
      title: 'Actions',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <DeleteButton key="delete" record={record} elementId='user-list-delete-btn' />,
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
              <Button style={{ margin: '0 8px', }} onClick={() => { form.resetFields(); onFinish({}); }}>
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
          options={{ reload: true }}
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
          }}
          dataSource={data.data}
          columns={columns}
          rowSelection={false}
          pagination={false}
        />
      </PageContainer>
      <Pagination
        total={total}
        defaultPageSize={DEFAULT_PAGE_SIZE}
        current={current}
        showSizeChanger={false}
        showQuickJumper={false}
        showTotal={total => `Total ${total} items`}
        defaultCurrent={current}
        onChange={(page) => { setCurrent(page); setFetchRoles(true); }}
        style={{ display: 'flex', 'justify-content': 'center', 'align-items': 'center', background: 'white', padding: '10px' }}
      />
    </>
  );
};

export default TableList;
