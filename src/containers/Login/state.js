import React from 'react';
import { postRequest, validateEmail } from '../Register/state';
import useSWRMutation from 'swr/mutation';
import { useNavigate } from 'react-router-dom';

export function useLogin() {
  const navigate = useNavigate();
  const { data, trigger } = useSWRMutation('/accounts/auth/login', postRequest);

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
      const res = await trigger({
        email: email,
        password: password,
      });

      console.log('res>>>', res);

      // save token to local storage
      if (res && res.data) {
        const { access_token, _id: userId } = res.data;
        localStorage.setItem('token', access_token);
        localStorage.setItem('userid', userId);
        // alert('login successfully');
        navigate('/dashboard');
      } else {
        alert('Error occurs');
        // res.error ? alert(res.error.message) : alert('Error occurs');
      }
    } catch (error) {
      localStorage.removeItem('token');
      localStorage.removeItem('userid');
      setErrors((data) => ({
        ...data,
        email: error.response.data.error.message,
      }));
    }
  };

  return {
    formData,
    errors,
    handlePasswordChange,
    handleEmailChange,
    handleLogin,
  };
}
