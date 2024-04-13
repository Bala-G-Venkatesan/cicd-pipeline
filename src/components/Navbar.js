import React, { useEffect } from 'react'
import { MdOutlineSegment } from "react-icons/md";
import { FaCartArrowDown } from "react-icons/fa";
import { FaRegCircleUser, FaUserPlus } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { openSidebar } from '../slices/MiscSlice';
import { fetchCart } from '../slices/CartSlice';



const Navbar = () => {
    let {user}=useSelector(state=>state.User)
    let { Cart, FETCH_CART_SUCCESS } = useSelector((state) => state.Cart);
    let dispatch=useDispatch()

    let {profileImage}=user;

    let handleClick=()=>
    {
        dispatch(openSidebar())
    }


    useEffect(()=>
    {
      dispatch(fetchCart({user: user._id}))
    },[])


  return (
    <nav className="h-[70px] bg-[100vw] bg-slate-200 overflow-hidden">
      <div className="container flex justify-between items-center h-[100%]">
        <header className="flex w-[100%] justify-between lg:w-auto">
          <Link to="/">
            <h2 className="text-3xl text-pink-600 protest">ComFurniture</h2>
          </Link>
          <button className="lg:hidden text-pink-600" onClick={handleClick}>
            <MdOutlineSegment size={24} />
          </button>
        </header>
        <ul className="links hidden text-slate-600 lg:flex">
          <li className="mx-4 tracking-wider">
            <Link to="/">Home</Link>
          </li>
          <li className="mx-4 tracking-wider">
            <Link to="/about">About</Link>
          </li>
          <li className="mx-4 tracking-wider">
            <Link to="/products">Products</Link>
          </li>
        </ul>
        <footer className="hidden text-white lg:flex items-center">
          {user && (
            <Link to="/cart">
              <button className="mx-1 px-3 py-1 bg-pink-600 text-sm rounded-md flex items-center">
                <p className="mr-2 text-base">Cart</p>
                <p className="relative w-[25px] h-[25px]">
                  <FaCartArrowDown className="w-[100%] h-[100%]" />
                  <span className="absolute top-[-10%] right-[-20%] bg-white text-pink-600 w-[15px] h-[15px] flex justify-center items-center rounded-full text-xs">
                    {(FETCH_CART_SUCCESS && Cart && Cart?.cartItems.length) ||
                      0}
                  </span>
                </p>
              </button>
            </Link>
          )}
          {!user ? (
            <Link to="/login">
              <button className="mx-1 px-3 py-1 bg-pink-600 text-sm rounded-md flex items-center">
                <p className="mr-2 text-base">Login</p>
                <p>
                  <FaUserPlus size={22} />
                </p>
              </button>
            </Link>
          ) : (
            <Link to="/profile">
              <button className="mx-1 ml-6 text-sm rounded-md flex items-center">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt=""
                    className="h-[34px] w-[34px] object-cover rounded-full"
                  />
                ) : (
                  <FaRegCircleUser size={34} className="text-slate-600" />
                )}
              </button>
            </Link>
          )}
        </footer>
      </div>
    </nav>
  );
}


export default Navbar