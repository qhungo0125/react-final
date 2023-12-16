import React from 'react';
import useSWRMutation from 'swr/mutation';
import axios from '../../utils/axiosConfig';
import { AuthenticationAPI } from '../../api/authentication';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
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
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

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
    handleDataChange({ key: 'name', value: e.target.value });
  };

  const handleEmailChange = (e) => {
    handleDataChange({ key: 'email', value: e.target.value });
  };

  const handlePasswordChange = (e) => {
    handleDataChange({ key: 'password', value: e.target.value });
  };

  const handleRegister = async (role) => {
    const { name, email, password } = formData;
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
        role,
      });

      setLoading(false);
      if (res.error && res.error.message) {
        alert(res.error.message);
      } else {
        // case register success
        alert(res.message);

        if (searchParams.get('r')) {
          const url = searchParams.get('r');
          const cbRole = searchParams.get('cbRole');
          localStorage.setItem('callbackUrl', url);
          localStorage.setItem('cbRole', cbRole);
          navigate('/login');
        }
      }
    } catch (error) {
      setLoading(false);
      alert('Error occues');
      localStorage.removeItem('token');
      // setErrors((data) => ({
      //   ...data,
      //   email: error.response.data.error.message,
      // }));
    }
  };

  return {
    loading,
    formData,
    errors,
    handleEmailChange,
    handleNameChange,
    handlePasswordChange,
    handleRegister,
  };
}
