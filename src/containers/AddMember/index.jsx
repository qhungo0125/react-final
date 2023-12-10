import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ClientAxios from '../../utils/axiosConfig';

const AddMember = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    const classId = searchParams.get('classId');
    const role = localStorage.getItem('role');
    const userid = localStorage.getItem('userid');

    const addMember = async ({ classId, teacherId, studentId }) => {
      let params = { classId };
      if (teacherId) params.teacherId = teacherId;
      if (studentId) params.studentId = studentId;

      const res = await ClientAxios.post('/class/add', params);
      if (res.error && res.error.message) {
        alert(res.error.message);
      }else{
        alert("You're added to class");
      }

    };

    if (!role || !userid) {
      alert('You must login to access this page');
      navigate('/login');
    } else {
      let params = { classId };
      if (role === 'admin') {
        params.teacherId = userid;
      }
      if (role === 'user') {
        params.studentId = userid;
      }
      addMember(params);
    }
  }, []);

  return;
};

export default AddMember;
