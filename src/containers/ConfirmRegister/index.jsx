import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AuthenticationAPI } from '../../api/authentication';

const ConfirmRegister = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = React.useState({ isLoading: false });
  const navigate = useNavigate();

  React.useEffect(() => {
    const token = searchParams.get('token');

    const validateToken = async (token) => {
      setData({ isLoading: true });
      const res = await AuthenticationAPI.validateRegisterToken({ token });
      setData({ isLoading: false });
      if (!res.success) {
        alert(res.error?.message);
        navigate('/login');
      } else {
        // case success

        const callbackUrl = localStorage.getItem('callbackUrl');
        alert(res.message);
        if (callbackUrl) {
          localStorage.removeItem('callbackUrl');
          navigate(`../${callbackUrl}`), { relative: 'path' };
        } else {
          navigate('/login');
        }
      }
    };

    if (!token) {
      alert('Invalid token');
      navigate('/');
    } else {
      validateToken(token);
    }
  }, []);
  return <div></div>;
};

export default ConfirmRegister;
