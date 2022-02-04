import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Drawer, Pagination, Form, Row, Col, Input, DatePicker } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { PageContainer, FooterToolbar, ProFormText, } from '@ant-design/pro-layout';
import { ModalForm, } from '@ant-design/pro-form';
import ProTable from '@ant-design/pro-table';
import { history } from 'umi';
import ProDescriptions from '@ant-design/pro-descriptions';
import { searchProducts, searchProductsCount } from '../service';


const TableList = () => {
  /** 新建窗口的弹窗 */
  const [createModalVisible, handleModalVisible] = useState(false);
  /** 分布更新窗口的弹窗 */

  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const actionRef = useRef();
  const [currentRow, setCurrentRow] = useState();
  const [selectedRowsState, setSelectedRows] = useState([]);
  const [data, setData] = useState({ data: [] });
  const [current, setCurrent] = useState(1);
  const [param, setParam] = useState({});
  const [sort, setSort] = useState({});
  const [total, setTotal] = useState(0);
  const [fetchProducts, setFetchProducts] = useState(false);
  const { RangePicker } = DatePicker;
  const fetchProductData = async () => {
    // console.log('current', current, 'param', param);
    const hide = message.loading('Loading...');
    try {
      const result = await searchProducts({ current: current, pageSize: 10, ...param, ...sort });
      // console.log(result);
      hide();
      setData(result);
      setFetchProducts(false);
      return result;
    } catch (error) {
      hide();
      const str = JSON.stringify(error);
      const ex = JSON.parse(str);
      console.log(ex);
      message.error(ex.data.errorMessage);
      return false;
    }
  }


  const fetchProductCount = async () => {
    const result = await searchProductsCount({ ...param });
    console.log('fetchProductCount ', result);
    setTotal(result.total);
  };


  useEffect(() => {
    console.log('useEffect for current or sort', current, sort);
    if (fetchProducts) {
      console.log('useEffect for current or sort only fetching products');
      fetchProductData();
    }
  }, [fetchProducts]);


  useEffect(() => {
    setCurrent(1);
    setSort(null);
    console.log('useEffect for fetchProductData', param);
    setFetchProducts(true);
    fetchProductCount();
  }, [param]);


  /** 国际化配置 */

  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    setParam(values);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: true,
      tip: 'Name of the product',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
              console.log('entity', entity);
              history.push(`/products/edit/${entity._id}`);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: 'Description',
      dataIndex: 'description',
      valueType: 'textarea',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      sorter: true,
      hideInForm: true,
      renderText: (val) => `${val}`,
    },
    {
      title: 'Size',
      dataIndex: 'size',
      hideInForm: true,
    },
    {
      title: 'Manufacturing date',
      sorter: true,
      dataIndex: 'manufacturingDate',
      valueType: 'dateTime',
    },
    {
      title: 'Actions',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            setShowDetail(true);
            setCurrentRow(record);
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
                <Input placeholder="Search keyword for name" />
              </Form.Item>
            </Col>
            <Col flex={6} key={'size'}>
              <Form.Item
                name={`size`}
                label={`Size`}
              >
                <Input placeholder="Search keyword for size" />
              </Form.Item>
            </Col>
            <Form.Item name="manufacturingDateRange" label="Manuf. date">
              <RangePicker />
            </Form.Item>
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
          headerTitle="Products"
          actionRef={actionRef}
          rowKey="_id"
          // search={{
          //   labelWidth: 'auto',
          // }}
          search={false}
          toolBarRender={() => [
            <Button
              type="primary"
              key="primary"
              onClick={() => {
                // handleModalVisible(true);
                console.log('plus button clicked');
                history.push('/product/product-entry');
              }}
            >
              <PlusOutlined /> New
            </Button>,
          ]}
          // request={getProducts}
          onChange={(_, _filter, _sorter) => {
            console.log('_sorter', _sorter);
            let sort = {};
            sort['sort'] = _sorter.field;
            sort['order'] = _sorter.order === 'ascend' ? 1 : -1;
            setSort(sort);
            setFetchProducts(true);
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
        onChange={(page, pageSize) => { console.log('pagination\t', page); setCurrent(page); setFetchProducts(true); }}
        // style={{ background: 'white', padding: '10px' }}
        style={{ display: 'flex', 'justify-content': 'center', 'align-items': 'center', background: 'white', padding: '10px' }}
      />
      <ModalForm>
        <ProFormText width="sm" name="id" label="主合同编号" />
      </ModalForm>
    </>
  );
};

export default TableList;
