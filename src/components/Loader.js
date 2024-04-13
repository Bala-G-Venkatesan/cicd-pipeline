import React from 'react'
import { Audio } from "react-loader-spinner";
const Loader = () => {

  return (
    <section>
      <div className="overlay fixed top-0 left-0 w-[100vw] h-screen z-30 text-pink-600 bg-black flex justify-center items-center opacity-50"></div>
      <div className='fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] opacity-100 z-50'>
        <Audio
          height="80"
          width="80"
          radius="9"
          color="#db2777"
          ariaLabel="loading"
          wrapperStyle
          wrapperClass
        />
      </div>
    </section>
  );
}

export default Loader