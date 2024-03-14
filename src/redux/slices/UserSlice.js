import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  user: JSON.parse(localStorage.getItem('login_details')) || null,
  error: null
}

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    LoginStart: (state) => {
        state.isLoading= true
        state.user= null
        state.error= null
    },
    LoginSuccess: (state, action) => {
        state.isLoading= false
        state.user= action.payload
        state.error= null
    },
    LoginFailed: (state, action) => {
        state.isLoading= false
        state.user= null
        state.error= action.payload 
    },
    Logout: (state) => {
        state.isLoading= false
        state.user= null
        state.error= null
    }
  },
})

// Action creators are generated for each case reducer function
export const { LoginStart, LoginSuccess, LoginFailed, Logout } = UserSlice.actions

export default UserSlice.reducer