// @ts-ignore

/* eslint-disable */
import { request } from 'umi';

// request.interceptors.use((url, options) => {
//   console.log('url', url);
//   console.log('options', options);
//   return {
//     url: `${url}&interceptors=yes`,
//     options: { ...options, interceptors: true },
//   };
// });
console.log('request', request);

/** 获取规则列表 GET /api/rule */
export async function searchProducts(params, options) {
  console.log('GET /api/product', params, options);
  const newLocal = request('http://localhost:5000/api/products/search', {
    method: 'POST',
    // params: { ...params },
    data: params,
    // errorHandler: function (error) {
    //   if (error) {
    //     throw error;
    //   }
    // },
    skipErrorHandler: true,
    ...(options || {})
  });
  return newLocal;
}

export async function searchProductsCount(params, options) {
  console.log('GET /api/product/count', params, options);
  const newLocal = request('http://localhost:5000/api/products/count', {
    method: 'POST',
    // params: { ...params },
    data: params,
    ...(options || {})
  });
  return newLocal;
}

/** 获取规则列表 GET /api/rule */
export async function getProducts(params, options) {
  console.log('GET /api/product', params, options);
  return request('http://localhost:5000/api/products/search', {
    method: 'POST',
    params: { ...params },
    ...(options || {}),
  });
}
/** 新建规则 PUT /api/rule */

export async function updateRule(data, options) {
  return request('/api/rule', {
    data,
    method: 'PUT',
    ...(options || {}),
  });
}
/** 新建规则 POST /api/rule */

export async function addRule(data, options) {
  console.log('POST /api/rule', data, options);
  return request('/api/products', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}
/** 删除规则 DELETE /api/rule */

export async function removeRule(data, options) {
  return request('/api/rule', {
    data,
    method: 'DELETE',
    ...(options || {}),
  });
}
