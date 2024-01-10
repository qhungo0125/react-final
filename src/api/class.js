import ClientAxios from '../utils/axiosConfig';

export const addMember = async ({
  invitationCode,
  classId,
  teacherId,
  studentId,
}) => {
  let params = {};

  if (invitationCode) params.invitationCode = invitationCode;
  if (classId) params.classId = classId;
  if (teacherId) params.teacherId = teacherId;
  if (studentId) params.studentId = studentId;

  const res = await ClientAxios.post('/class/add', params);
  if (res.error && res.error.message) {
    alert(res.error.message);
  } else {
    alert("You're added to class");
  }
};

export const getClass = async (classId) => {
  let params = {};
  params.id = classId;
  console.log(params);
  const res = await ClientAxios.get('/class/', { params });
  return res;
};
