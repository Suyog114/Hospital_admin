import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { API_URL } from '../../api_config'

const initialState = {
  data: [],
  error: null,
  loading: false
}

export const fetchData = createAsyncThunk(
  'product/fetchData', async (data) => {
    const res = await axios.get(`${API_URL}/product/getAllProduct?srch=${data.srch}`)
    return res.data
  }
)

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addData: (state, action) => {
      state.data.push(action.payload)
    },
    editData: (state, action) => {
      const { id, newData } = action.payload
      const indexOfData = state.data.findIndex(item => item.id === Number(id))
      if (indexOfData !== -1) {
        state.data[indexOfData] = newData
      }
    },
    deleteData: (state, action) => {
      const id = action.payload
      const indexOfData = state.data.findIndex(item => item.id === Number(id))

      if (indexOfData !== -1) {
        state.data.splice(indexOfData, 1)
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
        state.loading = true
        state.data = []
        state.error = null
    }).addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
        state.error = null
    }).addCase(fetchData.rejected, (state, action) => {
        state.loading = false
        state.data = []
        state.error = action.payload
    })
  }
})


export const { addData, editData, deleteData } = productSlice.actions
export default productSlice.reducer