import React from 'react';
import { postRequest, validateEmail } from '../Register/state';
import useSWRMutation from 'swr/mutation';
import { useNavigate } from 'react-router-dom';
import { MenuContext } from '../../context/MenuContext';

export function useLogin() {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const { data, trigger } = useSWRMutation('/accounts/auth/login', postRequest);
  const menuContext = React.useContext(MenuContext);
  const { updateTeacherId } = menuContext;

  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = React.useState({
    email: '',
    password: '',
  });

  const handleDataChange = ({ key, value }) => {
    setFormData((data) => ({
      ...data,
      [key]: value,
    }));
    setErrors((data) => ({
      ...data,
      [key]: '',
    }));
  };

  const handlePasswordChange = (e) => {
    handleDataChange({ key: 'password', value: e.target.value });
  };

  const handleEmailChange = (e) => {
    handleDataChange({ key: 'email', value: e.target.value });
  };

  const handleLogin = async () => {
    const { email, password } = formData;

    try {
      //validation
      if (!email || !password) {
        !email &&
          setErrors((data) => ({
            ...data,
            email: 'Email is required',
          }));
        !password &&
          setErrors((data) => ({
            ...data,
            password: 'Password is required',
          }));
        return;
      }
      if (!validateEmail(email)) {
        !email &&
          setErrors((data) => ({
            ...data,
            email: 'Please enter a valid email',
          }));
        return;
      }
      // trigger to registration
      setLoading(true);
      const res = await trigger({
        email: email,
        password: password,
      });

      setLoading(false);

      // save token to local storage
      if (res && res.data) {
        const { access_token, _id: userId, role } = res.data;
        localStorage.setItem('token', access_token);
        localStorage.setItem('userid', userId);
        localStorage.setItem('role', role);
        // alert('login successfully');
        // setTimeout()

        setTimeout(() => navigate('/classes'), 2000);
      } else {
        setLoading(false);

        alert('Error occurs');
        // res.error ? alert(res.error.message) : alert('Error occurs');
      }
    } catch (error) {
      setLoading(false);

      localStorage.removeItem('token');
      localStorage.removeItem('userid');
      setErrors((data) => ({
        ...data,
        email: error.response.data.error.message,
      }));
    }
  };

  return {
    loading,
    formData,
    errors,
    handlePasswordChange,
    handleEmailChange,
    handleLogin,
  };
}
