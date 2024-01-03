import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ClientAxios from '../../utils/axiosConfig';
import {addMember} from '../../api/class';

const AddMember = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    const classId = searchParams.get('classId');
    const role = localStorage.getItem('role');
    const cbRole = localStorage.getItem('cbRole');
    const userid = localStorage.getItem('userid');

    const register = async () => {
      let params = { classId };
      if (role === 'teacher') {
        params.teacherId = userid;
      }
      if (role === 'student') {
        params.studentId = userid;
      }
      await addMember(params);
    };

    if (!role || !userid) {
      alert('You must login to access this page');
      navigate('/login');
    } else {
      if (cbRole) {
        if (cbRole !== role) {
          alert('You do not have permission to join this class (invalid role)');
          navigate('/login');
          localStorage.removeItem('cbRole');
        } else {
          register();
        }
      } else {
        register();
      }
    }
  }, [navigate, searchParams]);

  return;
};

export default AddMember;
