import Router from 'next/router';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface LoginFormProps {
  email: string;
  more: boolean;
  phone: string;
  code: string;
  token: string;
  isVerify: boolean;
  isLoading: boolean;
  isRegister: boolean | null;
  nickname: string;
  error: any;
}

const initialState: LoginFormProps = {
  email: '',
  more: false,
  phone: '',
  code: '',
  token: '',
  isVerify: false,
  isLoading: false,
  isRegister: null,
  nickname: '',
  error: {},
};

export const loginFormSlice = createSlice({
  name: 'LOGIN_FORM',
  initialState,
  reducers: {
    reset: () => initialState,
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
      if (action.payload && Router.router?.asPath === '/auth/start') {
        Router.push('/auth/start', '/auth/start?type=email');
      } else if (action.payload === '' && Router.router?.asPath !== '/auth/start') {
        Router.replace('/auth/start');
      }
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
    setIsRegister: (state, action: PayloadAction<boolean | null>) => {
      state.isRegister = action.payload;
    },
    setNickname: (state, action: PayloadAction<string>) => {
      state.nickname = action.payload;
    },
    setError: (state, action: PayloadAction<any>) => {
      state.error = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { reset, setEmail, setMore, setPhone, setCode, setToken, setIsVerify, setIsRegister, setError, setNickname, setIsLoading } =
  loginFormSlice.actions;

export default loginFormSlice;
