import './Login.css'
import { LoginStart, LoginSuccess, LoginFailed, Logout } from '../../redux/slices/UserSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'
import { API_URL } from '../../api_config'



function Login() {
  const user = useSelector(state => state?.user)
  const dispatch = useDispatch()

  const navigate = useNavigate()
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  })

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      dispatch(LoginStart())
      const res = await axios.post(`${API_URL}/user/loginUser`, loginData)
      localStorage.setItem('login_details', JSON.stringify(res?.data))
      dispatch(LoginSuccess(res?.data))
      navigate('/')
      toast.success('Successfully Logged In', {
        position: "top-right",
        theme: "colored"
      })
      
    } catch (error) {
      dispatch(LoginFailed(error?.response?.data?.message))
      toast.error(error?.response?.data?.message, {
        position: "top-center",
        theme: "colored"
      })
    }
  }

  const handleChange = (e) => {
    setLoginData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }
  return (
    <>
      <div className='loginContainer'>
        <form class="form" onSubmit={handleSubmit}>
          <p class="form-title">Sign In</p>
          <div class="input-container">
            <input placeholder="Enter Username" name='username' onChange={handleChange} type="text"></input>
          </div>
          <div class="input-container">
            <input placeholder="Enter password" name='password' onChange={handleChange} type="password"></input>
            <span>

            </span>
          </div>
          <button class="submit" type="submit">
            Sign in
          </button>
          {/* 
          <p class="signup-link">
            No account?
            <a href="">Sign up</a>
          </p> */}
        </form>

      </div>
    </>
  )
}

export default Login