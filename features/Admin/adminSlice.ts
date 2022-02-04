import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TeamProps {
  name: string;
  slug: string;
}
export interface AdminProps {
  team: TeamProps;
}

const initialState: AdminProps = {
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
  },
});

export const { reset, setTeam } = adminSlice.actions;

export default adminSlice;
