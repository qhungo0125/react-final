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

export async function unMappingStudent(params) {
  const { studentId } = params;
  if (!studentId || studentId === '') {
    console.error('studentId is required');
    return;
  }

  let url = `/admin/account/unmap`;
  const response = await ClientAxios.post(url, { studentId });

  if (response.error && response.error.message) {
    console.error(response.error.message);
    return response;
  }
  return response;
}

export async function getClasses(params) {
  const { page = 1, limit = 10, sort, filter } = params;

  let url = '/admin/classes?';

  const query = [`page=${page}`, `limit=${limit}`];

  if (sort) {
    query.push(`sort=${encodeURIComponent(JSON.stringify(sort))}`);
  }

  if (filter) {
    query.push(`filter=${encodeURIComponent(JSON.stringify(filter))}`);
  }

  url = url + query.join('&');

  const response = await ClientAxios.get(url);

  if (response.error && response.error.message) {
    console.error(response.error.message);
    return response;
  }
  return response;
}

export async function getClass({ id, fields = [] }) {
  if (!id) {
    console.error('id is required');
    return;
  }
  let url = `/class?id=${id}`;

  if (fields.length > 0) {
    url = url + '&fields=' + fields.join(',');
  }

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

export async function removeInvitationCode(params) {
  const { classId } = params;

  if (!classId || classId === '') {
    console.error('classId is required');
    return;
  }
  let url = `/admin/class/invitationcode/remove`;
  const response = await ClientAxios.post(url, {
    classId,
  });

  if (response.error && response.error.message) {
    console.error(response.error.message);
    return response;
  }
  return response;
}

export async function activeClass(params) {
  const { classId } = params;

  if (!classId || classId === '') {
    console.error('classId is required');
    return;
  }
  let url = `/admin/class/active`;
  const response = await ClientAxios.post(url, {
    classId,
  });

  if (response.error && response.error.message) {
    console.error(response.error.message);
    return response;
  }
  return response;
}

export async function deactiveClass(params) {
  const { classId } = params;

  if (!classId || classId === '') {
    console.error('classId is required');
    return;
  }
  let url = `/admin/class/inactive`;
  const response = await ClientAxios.post(url, {
    classId,
  });

  if (response.error && response.error.message) {
    console.error(response.error.message);
    return response;
  }
  return response;
}

export async function mapStudents(params) {
  const { students } = params;
  if (!students || students.length === 0) {
    console.error('students is required');
    return;
  }

  let url = `/admin/students/map`;
  const response = await ClientAxios.post(url, {
    students,
  });

  if (response.error && response.error.message) {
    console.error(response.error.message);
    return response;
  }
  return response;
}
