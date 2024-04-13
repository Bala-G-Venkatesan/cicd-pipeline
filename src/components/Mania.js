import React from 'react'
import { Link } from 'react-router-dom';

const Mania = () => {
  return (
    <section className="w-[100vw] my-6">
      <Link to='/products'>
        <img
          src="https://ii1.pepperfry.com/assets/babb3b38-0f73-4c55-95c6-5a3202ad9500.jpg"
          alt=""
          className="w-[100%] min-h-[200px] object-cover cursor-pointer"
        />
      </Link>
    </section>
  );
}

export default Mania