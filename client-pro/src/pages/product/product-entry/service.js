import { request } from 'umi';

export async function submitForm(params) {
  console.log('product-entry/service.js', 'submitForm', params);
  return request('http://192.168.56.1:5000/api/products', {
    method: 'POST',
    data: params,
  });
}