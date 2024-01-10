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

export async function createRequest(params) {
  const {
    title,
    explain,
    actualScore,
    expectedScore,
    studentId,
    teacherId,
    classId,
    scoreId,
  } = params;
  if (
    !title ||
    !explain ||
    !studentId ||
    !teacherId ||
    !classId ||
    !actualScore ||
    !expectedScore ||
    !scoreId
  ) {
    console.error('Please fill in all information!');
    return;
  }

  const response = await ClientAxios.get(
    `/score/create-request'`, {
    title,
    explain,
    actualScore,
    expectedScore,
    studentId,
    teacherId,
    classId,
    scoreId,
  });

  if (response.error && response.error.message) {
    console.error(response.error.message);
    return response;
  }
  return response;
}
