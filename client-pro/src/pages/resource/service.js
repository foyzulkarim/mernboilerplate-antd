import { get, post, put, del } from '/src/services/http-service';

export async function search(params) {
  return await post('/api/resources/search', params);
}

export async function count(params, options) {
  return await post('/api/resources/count', params, options);
}

export async function getById(id, options) {
  return await get(`/api/resources/detail?id=${id}`, {}, options);
}

export async function update(params) {
  return await put('/api/resources/update', params);
}

export async function save(params) {
  return await post('/api/resources/create', params);
}

export async function remove(id, options) {
  return await del(`/api/resources/delete?id=${id}`, {}, options);
}
