import Sidebar from "./components/Sidebar/Sidebar"
import Product from "./pages/Product/Product"
import Dashboard from "./pages/Dashboard/Dashboard"
import Orders from "./pages/Orders/Orders"
import Doctors from "./pages/Doctors/Doctors"
import Login from "./pages/Login/Login"
import Staffs from "./pages/Staffs/Staffs"
import Customers from "./pages/Customers/Customers"
import AddProducts from "./components/modals/AddProducts"
import DeleteProduct from "./components/modals/Product/DeleteProduct"
import DeleteStaff from "./components/modals/Staff/DeleteStaff"
import AddDoctors from "./components/modals/Doctor/AddDoctors"
import AddStaffs from "./components/modals/AddStaff"
import AddCustomers from "./components/modals/Customer/AddCustomer"
import { Route, Routes } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import EditCustomer from "./components/modals/Customer/EditCustomer"
import DeleteCustomer from "./components/modals/Customer/DeleteCustomer"
import DeleteDoctor from "./components/modals/Doctor/DeleteDoctor"
import EditStaff from "./components/modals/Staff/EditStaff"
import ShowStaff from "./components/modals/Staff/ShowStaff"
import ShowOrder from "./components/modals/Order/ShowOrder"
import EditOrder from "./components/modals/Order/EditOrder"
import Patients from "./pages/Patients/Patients"
import ShowPatient from "./components/modals/Patient/ShowPatient"
import PatientMail from "./components/modals/Patient/PatientMail"
import { ToastContainer, toast } from 'react-toastify';
import EditProducts from "./components/modals/Product/EditProduct"
import EditDoctors from "./components/modals/Doctor/EditDoctor"
import ProtectedRoutes from "./components/ProtectedRoutes"




function App() {
  return (
    <>
      <Routes>
        <Route element={<ProtectedRoutes/>}>
        <Route path={'/'} element={<Dashboard />} />
        <Route path={'/products'} element={<Product />}>
          <Route path={'add'} element={<AddProducts />} />
          <Route path={'delete/:id'} element={<DeleteProduct />} />
          <Route path={'edit/:id'} element={<EditProducts />} />
        </Route>

        <Route path={'/patients'} element={<Patients />}>
          <Route path={'show/:id'} element={<ShowPatient />} />
          <Route path={'mail/:id'} element={<PatientMail />} />

        </Route>

        <Route path={'/orders'} element={<Orders />}>
          <Route path={'show/:id'} element={<ShowOrder />} />
          <Route path={'edit/:id'} element={<EditOrder />} />
        </Route>
        <Route path={'/doctors'} element={<Doctors />}>
          <Route path={'add'} element={<AddDoctors />} />
          <Route path={'delete/:id'} element={<DeleteDoctor />} />
          <Route path={'edit/:id'} element={<EditDoctors />} />
        </Route>
        <Route path={'/staffs'} element={<Staffs />}>
          <Route path={'add'} element={<AddStaffs />} />
          <Route path={'delete/:id'} element={<DeleteStaff />} />
          <Route path={'edit/:id'} element={<EditStaff />} />
          <Route path={'show/:id'} element={<ShowStaff />} />
        </Route>
        <Route path={'/customers'} element={<Customers />}>
          <Route path={'add'} element={<AddCustomers />} />
          <Route path={'edit/:id'} element={<EditCustomer />} />
          <Route path={'delete/:id'} element={<DeleteCustomer />} />
        </Route>
        </Route>
        <Route path={'/login'} element={<Login />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
