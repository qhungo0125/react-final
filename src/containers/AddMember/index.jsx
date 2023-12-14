import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ClientAxios from '../../utils/axiosConfig';
import addMember from '../../api/class';

const AddMember = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    const classId = searchParams.get('classId');
    const role = localStorage.getItem('role');
    const userid = localStorage.getItem('userid');

    if (!role || !userid) {
      alert('You must login to access this page');
      navigate('/login');
    } else {
      let params = { classId };
      if (role === 'teacher') {
        params.teacherId = userid;
      }
      if (role === 'student') {
        params.studentId = userid;
      }
      addMember(params);
    }
  }, []);

  return;
};

export default AddMember;
