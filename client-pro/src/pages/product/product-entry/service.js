import { request } from 'umi';
import request1, { extend } from '@umijs/plugin-request';

// request.interceptors.use((url, options) => {
//   console.log('url', url);
//   console.log('options', options);
//   return {
//     url: `${url}&interceptors=yes`,
//     options: { ...options, interceptors: true },
//   };
// });

console.log('request', request, request1);

export async function submitForm(params) {
  console.log('product-entry/service.js', 'submitForm', params);
  return request('http://192.168.56.1:5000/api/products', {
    method: 'POST',
    data: params,
  });
}
