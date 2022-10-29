import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from '../plugins/axios/api';
import Cookies from 'js-cookie';
import { getString, stringState } from '../ts';

export const getSpecialKey = createAsyncThunk('auth/getString', async () => {
  const response = await api.post(`v1/outlay-rows/entity/create`);
  return { response };
});
export const getTreeRows = createAsyncThunk('auth/getTreeRows', async () => {
  const response = await api.get(`/v1/outlay-rows/entity/${Cookies.get('eID')}/row/list`);
  return { response };
});

const stringSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    string_all: [],
  },
  reducers: {
    logout(state: stringState, action: PayloadAction) {
      console.log('выйти из аккаунта');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSpecialKey.pending, (state: stringState, action: PayloadAction) => {
      state.loading = true;
    });
    builder.addCase(
      getSpecialKey.fulfilled,
      (state: stringState, { payload }: PayloadAction<{ response: { data: { id: number } } }>) => {
        state.loading = false;
        Cookies.set('eID', payload.response.data.id);
      }
    );
    builder.addCase(getSpecialKey.rejected, (state: stringState) => {
      state.loading = false;
    });

    builder.addCase(getTreeRows.pending, (state: stringState, action: PayloadAction) => {
      state.loading = true;
    });
    builder.addCase(
      getTreeRows.fulfilled,
      (state: stringState, { payload }: PayloadAction<{ response: { data: getString } }>) => {
        console.log(payload);
        state.loading = false;
        state.string_all = payload.response.data;
      }
    );
    builder.addCase(getTreeRows.rejected, (state: stringState) => {
      state.loading = false;
    });
  },
});

export default stringSlice.reducer;
export const { logout } = stringSlice.actions;
