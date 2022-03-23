import { get, post, put, del } from '/src/services/http-service';

export async function search(params) {
  return await post('/api/permissions/search', params);
}

export async function count(params, options) {
  return await post('/api/permissions/count', params, options);
}

export async function getById(id, options) {
  return await get(`/api/permissions/detail?id=${id}`, {}, options);
}

export async function update(params) {
  return await put('/api/permissions/update', params);
}

export async function save(params) {
  return await post('/api/permissions/create', params);
}

export async function remove(id, options) {
  return await del(`/api/permissions/delete?id=${id}`, {}, options);
}

export async function getResources(options) {
  return await post('/api/resources/search', { pageSize: -1 });
}

export async function getRoles(options) {
  return await post('/api/roles/search', { pageSize: -1 });
}