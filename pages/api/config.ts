import axios from 'axios';

const BASE_URL = 'https://api.tosspayments.com/v1';

export const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: process.env.NEXT_PUBLIC_TOSS_AUTH,
  },
});

// path: '/v1/billing/authorizations/card',
