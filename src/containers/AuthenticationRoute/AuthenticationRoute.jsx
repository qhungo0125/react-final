import React from 'react';
import { AuthenticationAPI } from '../../api/authentication';
import { useNavigate } from 'react-router-dom';
import { removeLS, saveLS } from '../../utils/format';
const AuthenticationRoute = ({ children }) => {
  const navigate = useNavigate();
  React.useEffect(() => {
    const userid = localStorage.getItem('userid');

    const autoLogin = async () => {
      const res = await AuthenticationAPI.loginWithUserId({ userId: userid });
      if (res && res.data) {
        const { access_token, _id: userId, role } = res.data;
        saveLS({
          token: access_token,
          userId: userId,
          role: role,
        });
        return;
      }
      removeLS();
      setLoading(false);
      alert('Error occurs');
      return;
    };

    if (userid) {
      autoLogin();
      return;
    }
    removeLS();
    navigate('/login');
    return;
  }, []);
  return children;
};

export default AuthenticationRoute;
