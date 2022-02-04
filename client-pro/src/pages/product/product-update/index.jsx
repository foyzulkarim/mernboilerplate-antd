import { Card, message } from 'antd';
import ProForm, {
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProFormDependency,
  ProFormDigit,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { useRequest, useModel, history } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { getProductById, update } from '../service';
import styles from './style.less';
import React, { useEffect, useState } from 'react';

const BasicForm = (props) => {
  const [product, setProduct] = useState(null);    

  useEffect(() => {
    console.log('ProductUpdateForm > useEffect', props);
    const { id } = props.match.params;
    const getProduct = async (id) => {
      const res = await getProductById(id);
      setProduct(res);
    }
    getProduct(id);
  }, []);

  const { run } = useRequest(update, {
    manual: true,
    onSuccess: (x) => {
      message.success('Product is saved', x);
      history.push('/products');
    },
    onError: (e) => {
      console.log(e);
      message.error('Error happened ', e);
    },
  });

  const onFinish = async (values) => {
    console.log(values);
    run({ _id: product._id, ...values });
  };

  return (
    product && <PageContainer content="My amazing product update form">
      <Card bordered={false}>
        <ProForm
          hideRequiredMark={false}
          style={{
            margin: 'auto',
            marginTop: 8,
            maxWidth: 600,
          }}
          name="basic"
          layout="vertical"
          initialValues={product}
          onFinish={onFinish}
        >
          <ProFormText
            width="md"
            label="Name"
            name="name"
            value={product.name}
            rules={[
              {
                required: true,
                message: 'Please enter product name',
              },
            ]}
            placeholder="Please enter product name"
          />

          <ProFormText
            width="md"
            label="SKU"
            name="sku"
            value={product.sku}
            rules={[
              {
                required: true,
                message: 'Please enter the SKU',
              },
            ]}
            placeholder="Please enter product sku"
          />

          <ProFormTextArea
            label="Description"
            width="xl"
            name="description"
            value={product.description}
            rules={[
              {
                required: true,
                message: 'Please enter description',
              },
            ]}
            placeholder="Please enter product description"
          />

          <ProFormDigit
            label={<span>Cost</span>}
            name="cost"
            value={product.cost}
            placeholder="Please enter product cost"
            min={0}
            width="md"
            fieldProps={{
              formatter: (value) => `${value || 0}`,
            }}
          />

          <ProFormDigit
            label={<span>Price</span>}
            name="price"
            value={product.price}
            placeholder="Please enter product price"
            min={0}
            width="md"
            fieldProps={{
              formatter: (value) => `${value || 0}`,
            }}
          />

          <ProFormRadio.Group
            options={[
              {
                value: 1,
                label: 'Small',
              },
              {
                value: 2,
                label: 'Medium',
              },
              {
                value: 3,
                label: 'Large',
              }
            ]}
            label="Size"
            value={product.size}
            name="size"
          />
          <ProFormDatePicker width="md"
            name="manufacturingDate"
            value={product.manufacturingDate}
            label="Manufacturing date" />
          <ProFormDatePicker width="md"
            name="expiryDate"
            value={product.expiryDate}
            label="Expiry date" />
        </ProForm>
      </Card>
    </PageContainer>
  );
};

export default BasicForm;
