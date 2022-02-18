import { get, post, put, del } from '/src/services/http-service';
// import request from 'umi-request';

export async function login(params) {
  const result = await post(`/api/auth/login`, params);
  return result;
}

