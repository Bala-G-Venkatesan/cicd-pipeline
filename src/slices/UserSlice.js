import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import AxiosInstance from '../remote/Axios'


let initialState = {
  user: JSON.parse(localStorage.getItem("user")) || "",
  msg: "",
  token: "",
  USER_SIGNUP_LOADING: false,
  USER_SIGNUP_SUCCESS: false,
  USER_SIGNUP_ERROR: false,
  USER_LOGIN_LOADING: false,
  USER_LOGIN_SUCCESS: false,
  USER_LOGIN_ERROR: false,
};


let signUpRequest = createAsyncThunk("user/signUpRequest", async (formData) => {
  let response = await AxiosInstance.post("/user/register", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  console.log(response)
  return response.data
})



let signInRequest=createAsyncThunk('user/signInRequest',async (formData)=>
{
    let response=await AxiosInstance.post('/user/signin',formData,{
        headers:{
            "Content-Type":"multipart/form-data"
        }
    })
    console.log(response.data)
    return response.data
})


let UserSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        logout:(state)=>
        {
            state.user=""
            state.msg=""
            state.token=""
            localStorage.clear('user')
        }
    },
    extraReducers:(builder)=>
    {
        builder
        .addCase(signUpRequest.pending,(state)=>
        {
            state.USER_SIGNUP_LOADING=true
            state.USER_SIGNUP_SUCCESS=false
        })
        .addCase(signUpRequest.fulfilled,(state,action)=>
        {
            state.USER_SIGNUP_LOADING=false
            state.USER_SIGNUP_SUCCESS=true
            console.log(action.payload)
            let { success, msg } = action.payload;
            if(success)
            {
                let { data, msg, token } = action.payload;
                console.log("Why the hell i am running")
                state.user = data;
                state.msg=msg;
                state.token=token
                localStorage.setItem('user',JSON.stringify(data))
            } 
            else 
            {
                state.msg=msg;
            }
        })
        .addCase(signUpRequest.rejected,(state)=>
        {
            state.USER_SIGNUP_SUCCESS=false 
            state.USER_SIGNUP_ERROR=true
        })
        .addCase(signInRequest.pending,(state)=>
        {
            state.USER_LOGIN_LOADING=true
            state.USER_LOGIN_SUCCESS=false
        })
        .addCase(signInRequest.fulfilled,(state,action)=>
        {
            state.USER_LOGIN_LOADING=false
            state.USER_LOGIN_SUCCESS=true
            let {success,data,msg} = action.payload;
            if(success)
            {
                let {token}=action.payload;
                state.user = data;
                state.msg = msg;
                state.token=token;
                localStorage.setItem('user',JSON.stringify(data))
            }
            else 
            {
                state.msg = msg;
            }
        })
        .addCase(signInRequest.rejected,(state)=>
        {
            state.USER_LOGIN_SUCCESS=false 
            state.USER_LOGIN_ERROR=true
        })
    }
})




export const {logout}=UserSlice.actions
export default UserSlice.reducer
export {signUpRequest,signInRequest}