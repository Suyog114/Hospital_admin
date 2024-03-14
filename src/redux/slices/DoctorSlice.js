import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { API_URL } from '../../api_config'

const initialState = {
  data: [],
  loading: false,
  error: null
}

export const fetchDoctorData = createAsyncThunk('doctor/fetchDoctorData', async (data) => {
  const res = await axios.get(`${API_URL}/doctor/getAllDoctor?name=${data.name}`)
  return res.data
})

export const doctorSlice = createSlice({
  name: 'doctor',
  initialState,
  reducers: {
    addDoctorData: (state, action) => {
      state.data.push(action.payload)
    },
    editDoctorData: (state, action) => {
      const { id, newData } = action.payload
      const indexOfData = state.data.findIndex(item => item.id === Number(id))

      if (indexOfData !== -1) {
        state.data[indexOfData] = newData
      }
    },
    deleteDoctorData: (state, action) => {
      const id = action.payload
      const indexOfData = state.data.findIndex(item => item.id === Number(id))

      if (indexOfData !== -1) {
        state.data.splice(indexOfData, 1)
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDoctorData.pending, (state) => {
      state.loading = true
      state.error = null
      state.data = []
    }).addCase(fetchDoctorData.fulfilled, (state, action) => {
      state.loading = false
      state.error = null
      state.data = action.payload
    }).addCase(fetchDoctorData.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
      state.data = []
    })
  }
})


export const { addDoctorData, editDoctorData, deleteDoctorData } = doctorSlice.actions;
export default doctorSlice.reducer