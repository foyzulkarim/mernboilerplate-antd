import { get, post, put, del } from '/src/services/http-service';

// check username api call 
export async function forgotPassword(params) {
  const result = await post(`/api/auth/forgot-password`, params);
  return result;
}

export async function verifyToken(params) {
  const result = await post(`/api/auth/verify-token`, params);
  return result;
}

export async function resetPassword(params) {
  const result = await post(`/api/auth/reset-password`, params);
  return result;
}