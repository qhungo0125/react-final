import axios from '../utils/axiosConfig';

export async function getNotifications(params) {
  const { userId } = params;
  if (!userId || userId === '') {
    console.error('userId is required');
    return;
  }
  const res = await axios.get(`/notification?userid=${userId}`);
  if (res.error && res.error.message) {
    console.error(res.error.message);
    return res;
  }
  return res;
}
