import ClientAxios from '../utils/axiosConfig';

export const AuthenticationAPI = {
  getUser: async ({ userId }) => {
    const response = await ClientAxios.get(`/accounts/auth/profile/${userId}`);
    return response;
  },

  updateProfile: async (formData) => {
    const response = await ClientAxios.patch(
      `/accounts/auth/update`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response;
  },

  register: async (params) => {
    const { name, email, password, role } = params;
    const response = await ClientAxios.post('/accounts/auth/register', {
      name,
      role,
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
  updatePassword: async ({ password }) => {
    const data = await ClientAxios.post('/accounts/auth/reset', {
      password,
    });
    return data;
  },
};
