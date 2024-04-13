import React, { useEffect, useState } from 'react'
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";

import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import {  decreaseCart, deleteFromCart, fetchCart, increaseCart, calculateTotal} from '../slices/CartSlice'
import { Link } from 'react-router-dom'
import styled from 'styled-components'


const Cart = () => {

   let { singleProduct } = useSelector(
     (state) => state.Products
   );

   let [subtotal,setSubTotal]=useState(0)
   let {
     stock,
   } = singleProduct;

  let dispatch=useDispatch()
  let {user}=useSelector(state=>state.User)
  let {FETCH_CART_LOADING,FETCH_CART_SUCCESS,Cart}=useSelector(state=>state.Cart)


  let handleIncrease=async (user,name)=>
  {
    await dispatch(increaseCart({ user, name,stock }));
    dispatch(fetchCart({ user: user._id }))
  }
  let handleDecrease =async (user, name) => 
  {
    await dispatch(decreaseCart({ user, name,stock}));
    dispatch(fetchCart({ user: user._id }));
  }

  let handleDelete=async (user,name)=>
  {
     await dispatch(deleteFromCart({user,name}))
     dispatch(fetchCart({ user: user._id }));
  }
  useEffect(()=>
  {
     dispatch(fetchCart({ user: user._id }))
  },[dispatch,user])


  useEffect(()=>
  {
    if(FETCH_CART_SUCCESS && Cart)
    {
      let total = Cart.cartItems.reduce((agg,temp)=>
      {
        return agg+temp.amount*(temp.price/100)
      },0)
      console.log(total+"ROSS VERY GOOD CHARACTER")
      setSubTotal(total);
    }
  },[Cart])



  // useEffect(()=>
  // {
  //    dispatch(fetchCart({ user: user._id }));
  //    return
  // },[Cart])


  if(FETCH_CART_LOADING)
  {
    return <Loader/>
  }

  if (FETCH_CART_SUCCESS && !Cart || Cart?.cartItems?.length === 0 || !user) {
    return (
      <div className='mx-auto w-[100%] flex items-center flex-col mt-8 min-h-screen'>
        <h2 className='text-xl text-slate-700'>Your cart is empty</h2>
        <Link to='/products'>
          <button className='text-md text-white px-4 py-2 bg-pink-600 mt-3 rounded-md'>Shop Now</button>
        </Link>
      </div>
    )
  }

  return (
    <StyledCart>
      <div className="container mx-auto text-slate-600 min-h-screen">
        <header>
          <p>Item</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Subtotal</p>
        </header>
        <section>
          {FETCH_CART_SUCCESS &&
            Cart?.cartItems.map((items, idx) => {
              let { name, amount, price, productImage } = items;
              return (
                <div
                  key={idx}
                  className="each-item text-center py-7 relative"
                >
                  <div className="item flex flex-col items-center justify-start lg:flex-row">
                    <img
                      src={productImage}
                      alt=""
                      className="w-[80px] h-[60px] min-w-[80px] min-h-[60px] max-w-[120px] object-cover rounded-md"
                    />
                    <h2 className="capitalize ml-2 text-black font-medium text-xs mt-2 md:mt-0 md:text-sm tracking-wider text-center md:text-left">
                      {name}
                    </h2>
                  </div>
                  <p className="text-pink-600 text-sm md:text-md">
                    ${price / 100}
                  </p>
                  <div className="quantity flex justify-center items-center font-semibold text-base translate-x-[-5%] md:md:translate-x-0">
                    <button onClick={() => handleDecrease(user, name)}>
                      <FaMinus />
                    </button>
                    <p className="mx-2">{amount}</p>
                    <button onClick={() => handleIncrease(user, name)}>
                      <FaPlus />
                    </button>
                  </div>
                  <div className="sub-total text-sm md:text-md translate-x-[-20%] md:translate-x-0">
                    <h2 className="text-pink-600">
                      {((price / 100) * amount).toFixed(2)}
                    </h2>
                  </div>
                  <button
                    className="delete absolute top-[50%] right-0 translate-y-[-50%] bg-pink-600 text-white px-1 py-1 rounded-sm"
                    onClick={() => handleDelete(user, name)}
                  >
                    <MdDelete size={18} />
                  </button>
                </div>
              );
            })}
        </section>
        <div className="billing border-[1px] border-t-[#bcccdc] py-4 flex flex-col justify-between md:flex-row">
          <div className="portside">
            <Link to="/products">
              <button className="py-[6px] px-3 bg-pink-600 text-white text-sm tracking-widest rounded-md">
                Keep Shopping
              </button>
            </Link>
          </div>
          <div className="starboard border-[1px] border-[#bcccdc] py-6 px-8 w-[100%] mx-auto md:mx-0 md:w-[60%] max-w-[450px] mt-4 md:mt-0">
            <div className="subtotal flex justify-start equal my-2">
              <h2 className="text-md font-semibold tracking-wider">Subtotal</h2>
              <h2 className="text-md font-semibold tracking-wider">
                $ {subtotal.toFixed(2)}
              </h2>
            </div>
            <div className="shipping flex justify-start border-b-2 border-[#bcccdc] mb-4 pb-4 equal">
              <p className="">Shipping</p>
              <p>$ 5.49</p>
            </div>
            <div className="total flex justify-start equal mt-4">
              <h2 className="text-md lg:text-xl font-bold tracking-wider text-black">
                Total
              </h2>
              <h2 className="text-md lg:text-xl font-bold tracking-wider text-black">
                $ {(subtotal + 5.49).toFixed(2)}
              </h2>
            </div>
            <button className="text-center mt-4 bg-pink-600 text-white w-[100%] py-2 rounded-sm text-sm lg:text-md">
              Order Now
            </button>
          </div>
        </div>
      </div>
    </StyledCart>
  );
}


let StyledCart=styled.section`

header
{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  justify-content: center;
  text-align: center;
  border-bottom: 1px solid #bcccdc;
  padding: 1.5rem 0;
}

.each-item 
{
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}
.equal
{
  display: grid;
  grid-template-columns: 1fr 1fr;
}

`

export default Cart