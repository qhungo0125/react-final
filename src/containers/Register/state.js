import React from 'react';
import useSWRMutation from 'swr/mutation';
import axios from '../../utils/axiosConfig';
import { AuthenticationAPI } from '../../api/authentication';

export const validateEmail = (email) => {
  const res = /\S+@\S+\.\S+/;
  return res.test(String(email).toLowerCase());
};

export async function postRequest(url, { arg }) {
  const response = await axios.post(url, arg);
  return response;
}

export default function useRegisterState() {
  const [loading, setLoading] = React.useState(false);

  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = React.useState({
    name: '',
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

  const handleNameChange = (e) => {
    console.log(e.target.value);
    handleDataChange({ key: 'name', value: e.target.value });
  };

  const handleEmailChange = (e) => {
    handleDataChange({ key: 'email', value: e.target.value });
  };

  const handlePasswordChange = (e) => {
    handleDataChange({ key: 'password', value: e.target.value });
  };

  const handleRegister = async () => {
    const { name, email, password } = formData;
    console.log(formData);
    try {
      //validation
      if (!name || !email || !password) {
        // Validate if fields are empty
        !name &&
          setErrors((data) => ({
            ...data,
            name: 'Name is required',
          }));
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
        setErrors((data) => ({
          ...data,
          email: 'Please enter a valid email',
        }));
        return;
      }
      // trigger to registration
      setLoading(true);

      const res = await AuthenticationAPI.register({
        name,
        email,
        password,
      });

      console.log('res >>>', res);
      setLoading(false);
      // save token to local storage
      // localStorage.setItem('token', res.headers['authorization']);
      alert(res.error.message);
      // redirect to dashboard
      // handle code here
    } catch (error) {
      console.log('error>>', error);
      alert('Error occues');
      localStorage.removeItem('token');
      // setErrors((data) => ({
      //   ...data,
      //   email: error.response.data.error.message,
      // }));
    }
  };

  return {
    formData,
    errors,
    handleEmailChange,
    handleNameChange,
    handlePasswordChange,
    handleRegister,
  };
}
