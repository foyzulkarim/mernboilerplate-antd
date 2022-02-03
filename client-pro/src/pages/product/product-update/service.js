import { request } from 'umi';
import request1, { extend } from '@umijs/plugin-request';

export async function submitForm(params) {
  console.log('product-entry/service.js', 'submitForm', params);
  return request('http://localhost:5000/api/products', {
    method: 'POST',
    data: params,
  });
}
