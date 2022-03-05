import { get, post, put, del } from '/src/services/http-service';

export async function search(params) {
  return await post('/api/roles/search', params);
}

export async function count(params, options) {
  return await post('/api/roles/count', params, options);
}

export async function getById(id, options) {
  return await get(`/api/roles/${id}`, {}, options);
}

export async function update(params) {
  return await put('/api/roles', params);
}

export async function save(params) {
  return await post('/api/roles', params);
}

export async function remove(id, options) {
  return await del(`/api/roles/${id}`, {}, options);
}
