import React, { useEffect, useState } from 'react'
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { FaRegCircleUser } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signUpRequest } from '../slices/UserSlice';
import Loader from '../components/Loader';

const SignUp = () => {

  let {USER_SIGNUP_LOADING,user} =
    useSelector((state) => state.User);
  let dispatch=useDispatch()
  let navigate=useNavigate()
  const notify = (msg) => toast(msg);



 

  let [input,setInput]=useState({
    firstName:"",
    lastName:"",
    email:"",
    password:""
  })

  let [showPassword,setShowPassword]=useState(false)
  let [profile,setProfile]=useState("")


  let handleChange=(e)=>
  {
     setInput((prev)=>
     {
       return {...prev,[e.target.name]:e.target.value}
     })
  }


  let handleProfile=(e)=>
  {
     setProfile(e.target.files[0]);
  }


   let handleSubmit = () => {

     if(!input.firstName.trim())
     {
        notify("First Name can't be empty")
        return;
     }
     if (!input.lastName.trim()) {
        notify("Last Name can't be empty");
        return;
      }
     if (!input.email.trim()) {
        notify("Email can't be empty");
         return;
       }
     if (!input.password.trim()) {
        notify("Password can't be empty");
          return;
        }
     let formData = new FormData();
     formData.append("firstName", input.firstName);
     formData.append("lastName", input.lastName);
     formData.append("email", input.email);
     formData.append("password", input.password);
     formData.append("profileImage", profile);
     dispatch(signUpRequest(formData));
     setInput({
       firstName: "",
       lastName: "",
       email: "",
       password: "",
     });
     setProfile("")
   };
  
  
  useEffect(()=>
  {
    if(user)
    {
      navigate("/");
    }
  },[user])


  if(USER_SIGNUP_LOADING)
  {
    return <Loader/>
  }

  console.log(profile+"MILAN")


  return (
    <section className="mt-8 overflow-y-auto">
      {/* <ToastContainer/> */}
      <div className="signup-container w-[95vw] max-w-[670px] mx-auto px-3 md:px-4 lg:px-6 py-6 lg:py-6 bg-white rounded-md shadow-lg text-slate-700 flex flex-col">
        <h2 className="text-xl text-center">Register As New User</h2>
        <div className="name w-[100%] flex flex-col justify-between mt-6 lg:flex-row">
          <div className="firstname">
            <span>First Name</span>
            <input
              type="text"
              name="firstName"
              value={input.firstName}
              onChange={handleChange}
              className="h-[32px] w-[100%] mt-1 px-2 outline-none rounded-sm border-[1px] border-slate-300 focus:border-pink-600 shadow-sm"
            />
          </div>
          <div className="lastname mt-4 lg:mt-0">
            <span>Last Name</span>
            <input
              type="text"
              name="lastName"
              value={input.lastName}
              onChange={handleChange}
              className="h-[32px] w-[100%] mt-1 px-2 outline-none rounded-sm border-[1px] border-slate-300 focus:border-pink-600 shadow-sm"
            />
          </div>
        </div>
        <div className="email my-4">
          <span>Email</span>
          <input
            type="text"
            name="email"
            value={input.email}
            onChange={handleChange}
            className="h-[32px] w-[100%] mt-1 px-2 outline-none rounded-sm border-[1px] border-slate-300 focus:border-pink-600 shadow-sm"
          />
        </div>
        <div className="password relative z-[2]">
          <span>Password</span>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={input.password}
            onChange={handleChange}
            className="h-[32px] w-[100%] mt-1 px-2 outline-none rounded-sm border-[1px] border-slate-300 focus:border-pink-600 shadow-sm"
          />
          <span
            className="absolute top-[52%] right-2 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <IoIosEye size={25} /> : <IoIosEyeOff size={25} />}
          </span>
        </div>
        <div className="profile mt-6 flex items-center">
          {profile ? (
            <img
              src={URL.createObjectURL(profile)}
              className="w-[35px] h-[35px] object-cover rounded-full"
            />
          ) : (
            <FaRegCircleUser size={35}/>
          )}
          <input
            type="file"
            id="img"
            alt='File'
            className="sr-only"
            onChange={handleProfile}
          />
          <label htmlFor="img" className="cursor-pointer ml-3">
            Choose Profile
          </label>
        </div>
        <button
          onClick={handleSubmit}
          className="mt-6 bg-pink-600 text-white py-1 rounded-sm text-base"
        >
          Register
        </button>
        <div className="login mt-6">
          <p className="text-center">
            Already have an account?{" "}
            <Link to="/login">
              <span className="text-pink-600">SignIn</span>
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default SignUp