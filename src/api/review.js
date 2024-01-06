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

export async function sendChatContent(params) {
  const { accountId, requestId, content } = params;

  if (!accountId || !requestId || !content) {
    console.error('accountId, requestId and content are required');
    return;
  }

  const response = await ClientAxios.post(`/score/create-comment`, {
    accountId,
    requestId,
    content,
  });

  if (response.error && response.error.message) {
    console.error(response.error.message);
    return response;
  }
  return response;
}
