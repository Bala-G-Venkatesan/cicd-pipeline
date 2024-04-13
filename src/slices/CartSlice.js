import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosInstance from "../remote/Axios";



let initialState = {
  Cart: [],
  ADD_TO_CART_LOADING: false,
  ADD_TO_CART_SUCCESS: false,
  ADD_TO_CART_ERROR: false,
  DELETE_FROM_CART_LOADING: false,
  DELETE_FROM_CART_SUCCESS: false,
  DELETE_FROM_CART_ERROR: false,
  FETCH_CART_LOADING: false,
  FETCH_CART_SUCCESS: false,
  FETCH_CART_ERROR: false,
  INCREASE_CART_LOADING: false,
  INCREASE_CART_SUCCESS: false,
  INCREASE_CART_ERROR: false,
  DECREASE_CART_LOADING: false,
  DECREASE_CART_SUCCESS: false,
  DECREASE_CART_ERROR: false,
};


let addToCart=createAsyncThunk('cart/addToCart',async ({token,name,price,amount,user,stock,productImage})=>
{
    let response=await AxiosInstance.post('cart/addtocart',{name,price,amount,user,stock,productImage},{
        headers:{
            authorization:token
        }
    })
    return response.data
})


let fetchCart=createAsyncThunk('cart/fetchCart',async ({user})=>
{
    let response=await AxiosInstance.post('cart/getcartitems',{user})
    console.log(response,"ORS")
    return response.data.data
})

let increaseCart = createAsyncThunk("cart/increaseCart", async ({ user,name,stock}) => {
  let response = await AxiosInstance.post("cart/increase", { user,name,amount:1,stock});
  return response.data;
});

let decreaseCart = createAsyncThunk(
  "cart/decreaseCart",
  async ({ user, name, amount,stock}) => {
    let response = await AxiosInstance.post("cart/decrease", {
      user,
      name,
      amount:1,
      stock
    });
    return response.data
  }
)


let deleteFromCart=createAsyncThunk('cart/deleteFromCart', async ({user,name})=>
{
    let response=await AxiosInstance.post('cart/removefromcart',{
        user,name
    })
    return response.data
})


let CartSlice=createSlice({
    name:'cart',
    initialState,
    extraReducers:(builder)=>
    {
        builder
          .addCase(addToCart.pending, (state) => {
            state.ADD_TO_CART_LOADING = true;
            state.ADD_TO_CART_SUCCESS = false;
          })
          .addCase(addToCart.fulfilled, (state, action) => {
            state.ADD_TO_CART_LOADING = false;
            state.ADD_TO_CART_SUCCESS = true;
          })
          .addCase(addToCart.rejected, (state) => {
            state.ADD_TO_CART_SUCCESS = false;
            state.ADD_TO_CART_ERROR = true;
          })
          .addCase(deleteFromCart.pending, (state) => {
            state.DELETE_FROM_CART_LOADING = true;
            state.DELETE_FROM_CART_SUCCESS = false;
          })
          .addCase(deleteFromCart.fulfilled, (state, action) => {
            state.DELETE_FROM_CART_LOADING = false;
            state.DELETE_FROM_CART_SUCCESS = true;
          })
          .addCase(deleteFromCart.rejected, (state) => {
            state.DELETE_FROM_CART_SUCCESS = false;
            state.DELETE_FROM_CART_ERROR = true;
          })
          .addCase(fetchCart.pending, (state) => {
            state.FETCH_CART_LOADING = true;
            state.FETCH_CART_SUCCESS = false;
          })
          .addCase(fetchCart.fulfilled, (state, action) => {
            state.FETCH_CART_LOADING = false;
            state.FETCH_CART_SUCCESS = true;
            state.Cart = action.payload;
          })
          .addCase(fetchCart.rejected, (state) => {
            state.FETCH_CART_SUCCESS = false;
            state.FETCH_CART_ERROR = true;
          })
          .addCase(increaseCart.pending, (state) => {
            state.INCREASE_CART_LOADING = true;
            state.INCREASE_CART_SUCCESS = false;
          })
          .addCase(increaseCart.fulfilled, (state, action) => {
            state.INCREASE_CART_LOADING = false;
            state.INCREASE_CART_SUCCESS = true;
          })
          .addCase(increaseCart.rejected, (state) => {
            state.INCREASE_CART_SUCCESS = false;
            state.INCREASE_CART_ERROR = true;
          })
          .addCase(decreaseCart.pending, (state) => {
            state.DECREASE_CART_LOADING = true;
            state.DECREASE_CART_SUCCESS = false;
          })
          .addCase(decreaseCart.fulfilled, (state, action) => {
            state.DECREASE_CART_LOADING = false;
            state.DECREASE_CART_SUCCESS = true;
          })
          .addCase(decreaseCart.rejected, (state) => {
            state.DECREASE_CART_SUCCESS = false;
            state.DECREASE_CART_ERROR = true;
          });
    }
})


// export const {calculateTotal}=CartSlice.actions
export default CartSlice.reducer
export {addToCart,fetchCart,increaseCart,decreaseCart,deleteFromCart}


