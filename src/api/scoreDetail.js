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
