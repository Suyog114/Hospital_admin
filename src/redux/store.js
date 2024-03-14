import { configureStore } from '@reduxjs/toolkit'
import customerSlice from './slices/CustomerSlice'
import productSlice from './slices/ProductSlice'
import doctorSlice from './slices/DoctorSlice'
import staffSlice from './slices/StaffSlice'
import orderSlice from './slices/OrderSlice'
import patientsSlice from './slices/PatientSlice'
import userSlice from './slices/UserSlice'

export const store = configureStore({
  reducer: {
    // doctor: doctorReducer,
    customer: customerSlice,
    product: productSlice,
    doctor: doctorSlice,
    staff: staffSlice,
    order: orderSlice,
    patient: patientsSlice,
    user: userSlice,
  },
})