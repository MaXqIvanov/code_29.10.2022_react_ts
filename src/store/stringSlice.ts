import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from '../plugins/axios/api';
import Cookies from 'js-cookie';
import { getNewString, getString, stringState } from '../ts';
import { Params } from 'react-router-dom';

export const getSpecialKey = createAsyncThunk('auth/getString', async () => {
  const response = await api.post(`v1/outlay-rows/entity/create`);
  return { response };
});
export const getTreeRows = createAsyncThunk('auth/getTreeRows', async () => {
  const response = await api.get(`/v1/outlay-rows/entity/${Cookies.get('eID')}/row/list`);
  return { response };
});
export const createRowInEntity = createAsyncThunk(
  'auth/createRowInEntity',
  async (params: {
    parentId: number | null;
    string: number;
    index: number;
    sub_string_index: number;
  }) => {
    const response = await api.post(`/v1/outlay-rows/entity/${Cookies.get('eID')}/row/create`, {
      equipmentCosts: 0,
      estimatedProfit: 0,
      machineOperatorSalary: 0,
      mainCosts: 0,
      materials: 0,
      mimExploitation: 0,
      overheads: 0,
      parentId: params.parentId,
      rowName: '',
      salary: 0,
      supportCosts: 0,
    });
    return { response, params };
  }
);
export const deleteRow = createAsyncThunk(
  'auth/deleteRow',
  async (params: {
    id: number | null | undefined;
    string: number;
    index: number;
    sub_string_index: number;
    last_string_index: number;
  }) => {
    const response = await api.delete(
      `/v1/outlay-rows/entity/${Cookies.get('eID')}/row/${params.id}/delete`
    );
    return { response, params };
  }
);
export const updateRowInEntity = createAsyncThunk(
  'auth/updateRowInEntity',
  async (params: {
    id: number;
    parentId: number | null;
    string: number;
    index: number;
    sub_string_index: number;
    rowName: string;
    salary: number;
    equipmentCosts: number;
    estimatedProfit: number;
    overheads: number;
    last_string_index: number;
  }) => {
    const response = await api.post(
      `/v1/outlay-rows/entity/${Cookies.get('eID')}/row/${params.id}/update`,
      {
        equipmentCosts: params.equipmentCosts,
        estimatedProfit: params.estimatedProfit,
        machineOperatorSalary: 0,
        mainCosts: 0,
        materials: 0,
        mimExploitation: 0,
        overheads: params.overheads,
        parentId: params.parentId,
        rowName: params.rowName,
        salary: params.salary,
        supportCosts: 0,
      }
    );
    return { response, params };
  }
);

const stringSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    stringAll: [],
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
        Cookies.set('eID', payload.response.data.id, { expires: 90 });
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
      (
        state: stringState,
        { payload }: PayloadAction<{ response: { data: getString; status: number } }>
      ) => {
        console.log(payload);
        if (payload.response.status < 300) {
          state.stringAll = payload.response.data;
        }
        state.loading = false;
      }
    );
    builder.addCase(getTreeRows.rejected, (state: stringState) => {
      state.loading = false;
    });
    // createEntity
    builder.addCase(createRowInEntity.pending, (state: stringState, action: PayloadAction) => {
      state.loading = true;
    });
    builder.addCase(
      createRowInEntity.fulfilled,
      (
        state: stringState,
        {
          payload,
        }: PayloadAction<{
          params: {
            parentId: number | null;
            string: number;
            index: number;
            sub_string_index: number;
          };
          response: { data: { current: getNewString }; status: number };
        }>
      ) => {
        console.log(payload);
        if (payload.response.status < 300) {
          if (payload.params.string === 0) {
            const response = { ...payload.response.data.current, child: [] };
            state.stringAll = [...state.stringAll, response];
          }
          if (payload.params.string === 1) {
            const response = { ...payload.response.data.current, child: [] };
            state.stringAll[payload.params.index].child = [
              ...state.stringAll[payload.params.index].child,
              response,
            ];
          }
          if (payload.params.string === 2) {
            state.stringAll[payload.params.index].child[payload.params.sub_string_index].child = [
              ...state.stringAll[payload.params.index].child[payload.params.sub_string_index].child,
              payload.response.data.current,
            ];
          }
        }
        state.loading = false;
      }
    );
    builder.addCase(createRowInEntity.rejected, (state: stringState) => {
      state.loading = false;
    });
    // deleteRow
    builder.addCase(deleteRow.pending, (state: stringState, action: PayloadAction) => {
      state.loading = true;
    });
    builder.addCase(
      deleteRow.fulfilled,
      (
        state: stringState,
        {
          payload,
        }: PayloadAction<{
          params: {
            id: number | null | undefined;
            string: number;
            index: number;
            sub_string_index: number;
            last_string_index: number;
          };
          response: { data: { changed: any }; status: number };
        }>
      ) => {
        if (payload.response.status < 300) {
          if (payload.params.string === 0) {
            state.stringAll.splice(payload.params.index, 1);
          }
          if (payload.params.string === 1) {
            state.stringAll[payload.params.index].child.splice(payload.params.sub_string_index, 1);
            state.stringAll[payload.params.index] = {
              ...state.stringAll[payload.params.index],
              ...payload.response.data.changed[0],
            };
          }
          if (payload.params.string === 2) {
            state.stringAll[payload.params.index] = {
              ...state.stringAll[payload.params.index],
              ...payload.response.data.changed[1],
            };
            state.stringAll[payload.params.index].child[payload.params.sub_string_index] = {
              ...state.stringAll[payload.params.index].child[payload.params.sub_string_index],
              ...payload.response.data.changed[0],
            };
            state.stringAll[payload.params.index].child[
              payload.params.sub_string_index
            ].child.splice(payload.params.last_string_index, 1);
          }
        }
      }
    );
    builder.addCase(deleteRow.rejected, (state: stringState) => {
      state.loading = false;
    });
    // updateRowInEntity
    builder.addCase(updateRowInEntity.pending, (state: stringState, action: PayloadAction) => {
      state.loading = true;
    });
    builder.addCase(
      updateRowInEntity.fulfilled,
      (
        state: stringState,
        {
          payload,
        }: PayloadAction<{
          params: {
            parentId: number | null;
            string: number;
            index: number;
            sub_string_index: number;
            last_string_index: number;
          };
          response: { data: { current: getNewString; changed: any }; status: number };
        }>
      ) => {
        console.log(payload);
        if (payload.response.status < 300) {
          if (payload.params.string === 0) {
            state.stringAll[payload.params.index] = {
              ...state.stringAll[payload.params.index],
              ...payload.response.data.current,
            };
          }
          if (payload.params.string === 1) {
            state.stringAll[payload.params.index] = {
              ...state.stringAll[payload.params.index],
              ...payload.response.data.changed[0],
            };
            state.stringAll[payload.params.index].child[payload.params.sub_string_index] = {
              ...state.stringAll[payload.params.index].child[payload.params.sub_string_index],
              ...payload.response.data.current,
            };
          }
          if (payload.params.string === 2) {
            state.stringAll[payload.params.index] = {
              ...state.stringAll[payload.params.index],
              ...payload.response.data.changed[1],
            };
            state.stringAll[payload.params.index].child[payload.params.sub_string_index] = {
              ...state.stringAll[payload.params.index].child[payload.params.sub_string_index],
              ...payload.response.data.changed[0],
            };
            state.stringAll[payload.params.index].child[payload.params.sub_string_index].child[
              payload.params.last_string_index
            ] = {
              ...state.stringAll[payload.params.index].child[payload.params.sub_string_index].child[
                payload.params.last_string_index
              ],
              ...payload.response.data.current,
            };
          }
        }
        state.loading = false;
      }
    );
    builder.addCase(updateRowInEntity.rejected, (state: stringState) => {
      state.loading = false;
    });
  },
});

export default stringSlice.reducer;
export const { logout } = stringSlice.actions;
