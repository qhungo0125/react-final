import React from 'react';
import { AuthenticationAPI } from '../../api/authentication';

const useForgotState = () => {
  const [forgotData, setForgotData] = React.useState({
    // data: {},
    email: '',
    isLoading: false,
    isError: false,
    errorMessage: '',
    successMessage: '',
  });

  const setEmail = React.useCallback((e) => {
    setForgotData((current) => ({ ...current, email: e.target.value }));
  }, []);

  const submitForgot = React.useCallback(async () => {
    console.log({
      email: forgotData.email,
    });

    setForgotData((current) => ({
      ...current,
      isLoading: false,
    }));

    const data = await AuthenticationAPI.forgotPassword({
      email: forgotData.email,
    });
    console.log('data>>>', data);

    if (!data.success) {
      setForgotData((current) => ({
        ...current,
        isLoading: false,
        isError: true,
        errorMessage: data.error && data.error.message,
      }));
    } else {
      alert(data.message);
      setForgotData((current) => ({
        ...current,
        email: '',
        isLoading: false,
      }));
    }
  }, [forgotData]);

  return { data: forgotData, setEmail, submitForgot };
};

export default useForgotState;
