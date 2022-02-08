import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TeamType = {
  name: string;
};

export interface TeamProps {
  team: any;
}

const initialState: TeamProps = {
  team: null,
};

export const teamSlice = createSlice({
  name: 'TEAM',
  initialState,
  reducers: {
    setTeam: (state, action: PayloadAction<any>) => {
      state.team = action.payload;
    },
  },
});

export const { setTeam } = teamSlice.actions;

export default teamSlice;
