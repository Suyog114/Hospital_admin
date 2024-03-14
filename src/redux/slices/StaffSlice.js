import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { API_URL } from '../../api_config'

const initialState = {
  staff: [],
  loading: false,
  error: null
}


export const fetchStaffData = createAsyncThunk('staff/fetchStaffData', async (data) => {
  const res = await axios.get(`${API_URL}/staff/getAllStaff?name=${data.name}`)
  return res.data
})

const StaffSlice = createSlice({
  name: 'staff',
  initialState,
  reducers: {
    addStaffData: (state, action) => {
      state.staff.push(action.payload)
    },
    editStaffData: (state, action) => {
      const { id, newData } = action.payload
      const staffIndex = state.staff.findIndex(item => item.id === Number(id))
      if (staffIndex !== -1) {
        state.staff[staffIndex] = newData
      }
    },
    deleteStaffData: (state, action) => {
      const id = action.payload
      const staffIndex = state.staff.findIndex(item => item.id === Number(id))
      if (staffIndex !== -1) {
        state.staff.splice(staffIndex, 1)
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchStaffData.pending, (state) => {
      state.staff = []
      state.loading = true
      state.error = null
    }).addCase(fetchStaffData.fulfilled, (state, action) => {
      state.staff = action.payload
      state.loading = false
      state.error = null
    }).addCase(fetchStaffData.rejected, (state, action) => {
      state.staff = []
      state.loading = false
      state.error = action.payload
    })
  }
})

export const { addStaffData, editStaffData, deleteStaffData } = StaffSlice.actions
export default StaffSlice.reducer