import { get, post, put, del } from '/src/services/http-service';

export async function search(params) {
  return await post('/api/users/search', params);
}

export async function count(params, options) {
  return await post('/api/users/count', params, options);
}

export async function getById(id, options) {
  console.log('getById', id, options);
  return await get(`/api/users/${id}`, {}, options);
}

export async function update(params) {
  return await put('/api/users', params);
}

export async function save(params) {
  return await post('/api/users', params);
}

export async function check(params) {
  return await post('/api/users/check', params);
}

export async function remove(id, options) {
  return await del(`/api/users/${id}`, {}, options);
}

export async function getRoles(options) {
  return await post('/api/roles/search');
}