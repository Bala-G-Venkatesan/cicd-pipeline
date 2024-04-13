import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom';
import { signInRequest } from '../slices/UserSlice';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoIosEye, IoIosEyeOff } from 'react-icons/io';


const Login = () => {



  let {user,USER_LOGIN_LOADING}=useSelector(state=>state.User)
  let navigate=useNavigate()
  let dispatch=useDispatch()
  const notify = (msg) => toast(msg)


  let [input,setInput]=useState({
    email:"",
    password:""
  })
  let [showPassword,setShowPassword]=useState(false)


  let handleInput=(e)=>
  {
     setInput((prev)=>
     {
        return {...prev,[e.target.name]:e.target.value}
     })
  }

  let handleSubmit=(e)=>
  {
      e.preventDefault()

      if(!input.email.trim())
      {
         notify("Email can't be empty")
         return
      }
      if(!input.password.trim())
      {
        notify("Password can't be empty")
        return
      }
      let formData=new FormData()
      formData.append('email',input.email)
      formData.append('password',input.password)
      dispatch(signInRequest(formData))
      setInput({
        email: "",
        password: "",
      })
  }
  

  useEffect(()=>
  {
    if(user)
    {
      navigate('/')
    }
  },[user])

  if(USER_LOGIN_LOADING)
  {
    return <Loader/>
  }


  return (
    <section className="mt-16 border-box">
      {/* <ToastContainer/> */}
      <div className="login-container w-[95vw] mx-auto max-w-[450px] bg-white flex flex-col justify-center px-3 md:px-6 py-6 text-slate-700 rounded-md shadow-md">
        <h2 className="text-xl text-center font-normal">
          Login To Your Account
        </h2>
        <form action="" className="w-[100%] my-2 mt-4">
          <div className="user-name w-[100%] mb-5">
            <span className="pb-20">Email</span>
            <input
              type="text"
              value={input.email}
              onChange={handleInput}
              name="email"
              className="w-[100%] outline-none px-2 py-1 h-[35px] rounded-sm mt-1 border-[1px] border-slate-300 focus:border-pink-600 shadow-sm"
            />
          </div>
          <div className="password mb-5 relative">
            <span className="pb-20">Password</span>
            <input
              type={showPassword ? "text" : "password"}
              value={input.password}
              onChange={handleInput}
              name="password"
              className="w-[100%] outline-none px-2 py-1 h-[35px] rounded-sm mt-1 border-[1px] border-slate-300 focus:border-pink-600 shadow-sm"
            />
            <span
              className="absolute top-[52%] right-2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <IoIosEye size={25} />
              ) : (
                <IoIosEyeOff size={25} />
              )}
            </span>
          </div>
          <div className="forgot mb-5">
            <p className="">Forgot Password ?</p>
          </div>
          <button
            onClick={handleSubmit}
            className="w-[100%] bg-pink-600 text-white py-1 rounded-sm mb-5"
          >
            Login
          </button>
          <div className="signup">
            <p className="text-center">
              Don't have an account?{" "}
              <Link to="/register" className="text-md text-pink-600">
                SignUp
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Login