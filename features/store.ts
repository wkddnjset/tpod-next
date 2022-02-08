import { configureStore } from '@reduxjs/toolkit';

import counterSlice from 'features/Count/counterSlice';
import loginFormSlice from 'features/LoginForm/loginFormSlice';
import adminSlice from 'features/Admin/adminSlice';
import teamSlice from 'features/Team/teamSlice';

export function makeStore() {
  return configureStore({
    reducer: {
      [counterSlice.name]: counterSlice.reducer,
      [loginFormSlice.name]: loginFormSlice.reducer,
      [adminSlice.name]: adminSlice.reducer,
      [teamSlice.name]: teamSlice.reducer,
    },
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
