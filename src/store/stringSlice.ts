import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from '../plugins/axios/api';
import Cookies from 'js-cookie';
import { HeadersDefaults } from 'axios';
import { stringState } from '../ts';

export const getString = createAsyncThunk(
  'auth/getString',
  async () => {
    const response = await api.get(`/accounts/profile/profile/`)
    return {response}
  },
)

const stringSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
  },
  reducers: {
    logout(state: stringState, action: PayloadAction) { 
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getString.pending, (state:stringState, action:PayloadAction) => {
        state.loading = true;
    });
    builder.addCase(getString.fulfilled, (state:stringState,  { payload }:PayloadAction<{}>) => {
        state.loading = false;
    });
    builder.addCase(getString.rejected, (state:stringState) => {
        state.loading = false;
    });
  },
});

export default stringSlice.reducer;
export const { } = stringSlice.actions;