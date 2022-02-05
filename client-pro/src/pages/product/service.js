// @ts-ignore

/* eslint-disable */
import { request } from 'umi';

export async function searchProducts(params, options) {
  const newLocal = request('/api/products/search', {
    method: 'POST',
    data: params,
    skipErrorHandler: true,
    ...(options || {})
  });
  return newLocal;
}

export async function searchProductsCount(params, options) {
  // console.log('GET /api/product/count', params, options);
  const newLocal = request('/api/products/count', {
    method: 'POST',
    data: params,
    ...(options || {})
  });
  return newLocal;
}

/** 获取规则列表 GET /api/rule */
export async function getProducts(params, options) {
  return request('/api/products/search', {
    method: 'POST',
    params: { ...params },
    ...(options || {}),
  });
}

export async function getProductById(id, options) {
  return request(`/api/products/${id}`, {
    method: 'GET',
    // params: { ...params },
    ...(options || {}),
  });
}

export async function update(params) {
  return request('/api/products', {
    method: 'PUT',
    data: params,
  });
}

export async function save(params) {
  return request('/api/products', {
    method: 'POST',
    data: params,
  });
}

export async function remove(id, options) {
  return request(`/api/products/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}
