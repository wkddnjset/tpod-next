import instance from '../config';

export default {
  emailLogin: async (variables: EmailParameter): Promise<AuthParameter> => {
    const { data } = await instance({
      method: 'POST',
      url: `/v1/user/email/login`,
      data: variables,
    });
    return data;
  },
  emailCheck: async (variables: EmailParameter): Promise<AuthParameter> => {
    const { data } = await instance({
      method: 'POST',
      url: `/v1/user/email/check`,
      data: variables,
    });
    return data;
  },
  socialLogin: async () => {
    const data = {};
    return data;
  },
  emailRegister: async (variables: RegisterParameter): Promise<AuthParameter> => {
    const { data } = await instance({
      method: 'POST',
      url: `/v1/user/email/register`,
      data: variables,
    });
    return data;
  },
};
