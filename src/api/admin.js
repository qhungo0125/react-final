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

export async function blockAccounts(params) {
  const { id } = params;
  if (!id || id === '') {
    console.error('id is required');
    return;
  }
  let url = `/admin/account/lock`;
  const response = await ClientAxios.post(url, { id });

  if (response.error && response.error.message) {
    console.error(response.error.message);
    return response;
  }

  return response;
}

export async function unblockAccounts(params) {
  const { id } = params;
  if (!id || id === '') {
    console.error('id is required');
    return;
  }
  let url = `/admin/account/unlock`;
  const response = await ClientAxios.post(url, { id });

  if (response.error && response.error.message) {
    console.error(response.error.message);
    return response;
  }

  return response;
}

export async function mappingStudent(params) {
  const { studentId, mapCode } = params;
  if (!studentId || studentId === '') {
    console.error('studentId is required');
    return;
  }

  if (!mapCode || mapCode === '' || mapCode.length !== 8) {
    console.error('mapCode is required');
    return;
  }

  let url = `/admin/account/map`;
  const response = await ClientAxios.post(url, { studentId, mapCode });

  if (response.error && response.error.message) {
    console.error(response.error.message);
    return response;
  }

  return response;
}

export async function getClasses(params) {
  const { page = 1, limit = 10 } = params;

  let url = `/admin/classes?page=${page}&limit=${limit}`;

  const response = await ClientAxios.get(url);

  if (response.error && response.error.message) {
    console.error(response.error.message);
    return response;
  }
  return response;
}

export async function createInvitationCode(params) {
  const { classId } = params;

  if (!classId || classId === '') {
    console.error('classId is required');
    return;
  }

  let url = `/admin/class/invitationcode`;

  const response = await ClientAxios.post(url, {
    classId,
  });

  if (response.error && response.error.message) {
    console.error(response.error.message);
    return response;
  }
  return response;
}
