import ClientAxios from '../utils/axiosConfig';

export async function getClassScores(params) {
  const { classId } = params;
  if (!classId) {
    console.error('classId is required');
    return;
  }
  const response = await ClientAxios.get(
    `/score/class-scores?classId=${classId}`,
  );
  if (response.error && response.error.message) {
    console.error(response.error.message);
    return response;
  }
  return response;
}

export async function setStudentScore(params) {
  const { studentId, scores, teacherId } = params;
  if (!studentId || !scores || !teacherId) {
    console.error('studentId, scores and teacherId are required');
    return;
  }

  const response = await ClientAxios.post(`/score/create`, {
    studentId,
    scores,
    teacherId,
  });
  if (response.error && response.error.message) {
    console.error(response.error.message);
    return response;
  }
  return response;
}

export async function uploadScores(params) {
  const { listScores } = params;
  if (!listScores) {
    console.error('listScores is required');
    return;
  }

  const response = await ClientAxios.post(`/score/update-scores`, {
    listScores,
  });

  if (response.error && response.error.message) {
    console.error(response.error.message);
    return response;
  }
  return response;
}

export async function approveRequest(params) {
  const { value, teacherId, studentId, scoreId, requestId } = params;
  if (!value || !teacherId || !studentId || !scoreId || !requestId) {
    console.error(
      'value, teacherId, studentId ,requestId and scoreId are required',
    );
    return;
  }

  const response = await ClientAxios.post(`/score/update-score`, {
    value,
    teacherId,
    studentId,
    scoreId,
    requestId,
  });

  if (response.error && response.error.message) {
    console.error(response.error.message);
    return response;
  }
  return response;
}

export async function rejectRequest(params) {
  const { requestId } = params;
  if (!requestId) {
    console.error('requestId is required');
    return;
  }

  const response = await ClientAxios.post(`/score/request/reject`, {
    requestId,
  });

  if (response.error && response.error.message) {
    console.error(response.error.message);
    return response;
  }
  return response;
}
