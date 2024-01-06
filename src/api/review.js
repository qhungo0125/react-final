import ClientAxios from '../utils/axiosConfig';

export async function getClassReviews(params) {
  const { classId } = params;
  if (!classId) {
    console.error('classId is required');
    return;
  }

  const response = await ClientAxios.get(
    `/score/class-requests?classId=${classId}`,
  );

  if (response.error && response.error.message) {
    console.error(response.error.message);
    return response;
  }
  return response;
}
