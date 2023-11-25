import ClientAxios from '../utils/axiosConfig';

export const AuthenticationAPI = {
  register: async (params) => {
    const { first_name, email, password } = params;
    const response = await ClientAxios.post('/accounts/auth/register', {
      first_name,
      email,
      password,
    });
    return response;
  },
  validateRegisterToken: async ({ token }) => {
    // console.log('token', {
    //   activation_token: token,
    // });
    const data = await ClientAxios.post('/accounts/auth/activation', {
      activation_token: token,
    });
    return data;
  },
  forgotPassword: async ({ email }) => {
    const data = await ClientAxios.post('/accounts/auth/forgot', {
      email,
    });
    return data;
  },
};
