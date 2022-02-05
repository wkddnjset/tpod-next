import instance from '../config';

export default {
  auth: async (variables: BillingCreateParameter): Promise<BillingCreateResponse> => {
    const { data } = await instance({
      method: 'POST',
      url: `/api/billing/auth`,
      data: variables,
    });
    return data;
  },
};
