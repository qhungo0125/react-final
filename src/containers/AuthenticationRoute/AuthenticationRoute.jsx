import React from 'react';
import { AuthenticationAPI } from '../../api/authentication';
import { useNavigate } from 'react-router-dom';
const AuthenticationRoute = ({ children }) => {
  const navigate = useNavigate();
  React.useEffect(() => {
    const userid = localStorage.getItem('userid');
    const autoLogin = async () => {
      const res = await AuthenticationAPI.loginWithUserId({ userId: userid });

      if (res && res.data) {
        const { access_token, _id: userId, role } = res.data;
        localStorage.setItem('token', access_token);
        localStorage.setItem('userid', userId);
        localStorage.setItem('role', role);
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('userid');
        localStorage.removeItem('role');
        setLoading(false);
        alert('Error occurs');
      }
    };
    if (userid) {
      autoLogin();
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      navigate('/login');
    }
  }, []);
  return children;
};

export default AuthenticationRoute;
