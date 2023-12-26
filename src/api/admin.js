import ClientAxios from '../utils/axiosConfig';

export async function getAccounts(params) {
  const { page = 1, limit = 10, role = 'student' } = params;
  let url = `/admin/accounts?page=${page}&limit=${limit}&role=${role}`;
  const response = await ClientAxios.get(url);

  if (response.error && response.error.message) {
    console.error(response.error.message);
    return response;
  }

  return response;
}
