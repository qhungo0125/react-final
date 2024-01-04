import ClientAxios from '../utils/axiosConfig';

export async function getScoreTypes() {
  const response = await ClientAxios.get(`/score/types`);
  if (response.error && response.error.message) {
    console.error(response.error.message);
    return response;
  }
  return response;
}

export async function getClassScoreTypes(params) {
  const { classId } = params;
  if (!classId) {
    console.error('classId is required');
    return;
  }
  const response = await ClientAxios.get(
    `/score/class-types?classId=${classId}`,
  );
  if (response.error && response.error.message) {
    console.error(response.error.message);
    return response;
  }
  return response;
}

export async function setScoreStructure(params) {
  const { name, percentage, classId } = params;
  if (!classId || !name || !percentage) {
    console.error('classId, name and percentage are required');
    return;
  }
  const response = await ClientAxios.post(`/score/create-type`, {
    name,
    percentage,
    classId,
  });
  if (response.error && response.error.message) {
    console.error(response.error.message);
    return response;
  }
  return response;
}
