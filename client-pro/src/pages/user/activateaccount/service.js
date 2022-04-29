import { get, post, put, del } from '/src/services/http-service';

export async function activateAccount(params) {
  const result = await post(`/api/auth/activate-account`, params);
  return result;
}
