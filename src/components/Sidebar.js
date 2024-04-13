import React from 'react'
import { LiaTimesSolid } from "react-icons/lia";
import { useDispatch, useSelector } from 'react-redux';
import { closeSidebar } from '../slices/MiscSlice';
import { links } from '../utils/data';
import { FaCartArrowDown } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";
import { Link } from 'react-router-dom';





const Sidebar = () => {
    let dispatch=useDispatch()
    let {sidebarStatus}=useSelector(state=>state.Misc)

    let handleClose=()=>
    {
        dispatch(closeSidebar())
    }
    
  return (
    <section
      className={`${
        sidebarStatus
          ? "absolute top-0 left-0 w-[100vw] h-screen bg-pink-500 text-white z-40 translate-x-0 transition-transform lg:hidden"
          : "translate-x-[100%] hidden"
      }`}
    >
      <div className="container">
        <header className="flex w-[100%] justify-between py-4">
          <h2 className="text-2xl protest">
            <Link to='/' onClick={handleClose}>ComFurniture</Link>
          </h2>
          <button onClick={handleClose}>
            <LiaTimesSolid size={24} />
          </button>
        </header>
        <ul className="links mt-8">
          {links.map((items) => {
            let { id, name, url } = items;
            return (
              <p className="my-4" key={id}>
                <Link to={url} onClick={handleClose}>
                  {name}
                </Link>
              </p>
            );
          })}
        </ul>
        <footer className="flex justify-center mt-8">
          <Link to="/cart" onClick={handleClose}>
            <button className="flex items-center mx-4 text-md">
              Cart
              <span className="ml-2">
                <FaCartArrowDown size={26} />
              </span>
            </button>
          </Link>
          <Link to="/login" onClick={handleClose}>
            <button className="flex items-center mx-4 text-md">
              Login
              <span className="ml-2">
                <FaUserPlus size={26} />
              </span>
            </button>
          </Link>
        </footer>
      </div>
    </section>
  );
}

export default Sidebar