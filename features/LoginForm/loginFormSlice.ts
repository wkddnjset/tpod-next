import Router from 'next/router';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CheckType {
  isRegister: boolean | null;
  nickname?: string;
}
export interface LoginFormProps {
  email: string;
  more: boolean;
  phone: string;
  code: string;
  token: string;
  isVerify: boolean;
  check: CheckType;
  error: any;
}

const initialState: LoginFormProps = {
  email: '',
  more: false,
  phone: '',
  code: '',
  token: '',
  isVerify: false,
  check: {
    isRegister: null,
    nickname: '',
  },
  error: {},
};

export const loginFormSlice = createSlice({
  name: 'LOGIN_FORM',
  initialState,
  reducers: {
    reset: () => initialState,
    setEmail: (state, action: PayloadAction<string>) => {
      if (action.payload && Router.router?.asPath === '/start') {
        Router.push('/start', '/start?type=email');
      } else if (action.payload === '' && Router.router?.asPath !== '/start') {
        Router.replace('/start');
      }
      state.email = action.payload;
    },
    setMore: (state, action: PayloadAction<boolean>) => {
      state.more = action.payload;
    },
    setPhone: (state, action: PayloadAction<string>) => {
      state.phone = action.payload;
    },
    setCode: (state, action: PayloadAction<string>) => {
      state.code = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setIsVerify: (state, action: PayloadAction<boolean>) => {
      state.isVerify = action.payload;
    },
    setCheck: (state, action: PayloadAction<CheckType>) => {
      state.check = action.payload;
    },
    setError: (state, action: PayloadAction<any>) => {
      state.error = action.payload;
    },
  },
});

export const { reset, setEmail, setMore, setPhone, setCode, setToken, setIsVerify, setCheck, setError } = loginFormSlice.actions;

export default loginFormSlice;
