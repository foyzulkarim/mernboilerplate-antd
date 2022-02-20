import { get, post, put, del } from '/src/services/http-service';
// import { request } from 'umi';

// export async function fakeRegister(params) {
//   return request('/api/register', {
//     method: 'POST',
//     data: params,
//   });
// }

// register api call
export async function registerUser(params) {
  const result = await post(`/api/auth/register`, params);
  return result;
}

// check username api call 
export async function checkUsername(params) {
  const result = await post(`/api/auth/check-username`, params);
  return result;
}