import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TeamProps {
  name: string;
  slug: string;
}

export interface UserProps {
  email: string;
  nickname: string;
  freeTrial: string;
}
export interface AdminProps {
  team: TeamProps;
  user: UserProps;
}

const initialState: AdminProps = {
  user: {
    email: '',
    nickname: '',
    freeTrial: '',
  },
  team: {
    name: '',
    slug: '',
  },
};

export const adminSlice = createSlice({
  name: 'ADMIN',
  initialState,
  reducers: {
    reset: () => initialState,
    setTeam: (state, action: PayloadAction<TeamProps>) => {
      state.team = action.payload;
    },
    setUser: (state, action: PayloadAction<UserProps>) => {
      state.user = action.payload;
    },
  },
});

export const { reset, setTeam, setUser } = adminSlice.actions;

export default adminSlice;
