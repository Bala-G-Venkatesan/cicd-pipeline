import React from 'react'
import { TbDirectionsOff } from "react-icons/tb";
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <section className="min-h-screen flex items-center flex-col">
      <h2 className="mt-16 font-light text-xl text-black flex items-center">Ahh Snap, Page you are looking for is not found &nbsp; <TbDirectionsOff size={22}/> </h2>
      <Link to='/products'>
        <button className="bg-pink-600 text-center text-white py-2 px-6 mt-4 rounded text-sm">
          Back To Shopping
        </button>
      </Link>
    </section>
  );
}


export default NotFound