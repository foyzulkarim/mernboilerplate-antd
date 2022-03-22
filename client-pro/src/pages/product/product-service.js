import { get, post, put, del } from '/src/services/http-service';

export async function search(params) {
  return await post('/api/products/search', params);
}

export async function count(params, options) {
  return await post('/api/products/count', params, options);
}

export async function getById(id, options) {
  return await get(`/api/products/detail?id=${id}`, {}, options);
}

export async function update(params) {
  return await put('/api/products/update', params);
}

export async function save(params) {
  return await post('/api/products/create', params);
}

export async function remove(id, options) {
  return await del(`/api/products/delete?id=${id}`, {}, options);
}
