import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'
import { API_URL } from '../../api_config';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchData = createAsyncThunk(
  'order/fetchData',
  async (data) => {
    const res = await axios.get(`${API_URL}/order/getAllOrder?name=${data.name}`);
    return res.data;
  }
);

export const customerSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addData: (state, action) => {
      state.data.push(action.payload);
    },
    editData: (state, action) => {
      const { id, status } = action.payload;
      const index = state.data.findIndex(data => data.id === Number(id));
      if (index !== -1) {
        state.data[index] = {...state.data[index], status };
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addData, editData, deleteData } = customerSlice.actions;

export default customerSlice.reducer;