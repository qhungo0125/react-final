import ClientAxios from '../utils/axiosConfig';

const addMember = async ({ invitationCode, classId, teacherId, studentId }) => {
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

export default addMember;
