import React from 'react'
import styled from 'styled-components';
import {Link} from 'react-router-dom'

const Hero = () => {
  return (
    <StyledHero>
      <section>
        <div className="overlay min-h-[650px] w-[100vw] relative">
          <img
            src="https://images.unsplash.com/photo-1537726235470-8504e3beef77?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="h-[650px] w-[100vw] object-cover"
          />
          <div className="container text-white info absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]">
            <h2 className="text-3xl md:text-4xl font-bold md:w-[50%] tracking-wide leading-snug">
              Exclusive Furniture <br />
              At Your Finger Tips
            </h2>
            <p className="md:w-[50%] mt-4 text-sm md:text-base">
              Elevate your space with Comfurniture. Discover a
              curated collection of stylish and functional furniture. From
              modern sofas to timeless dining sets, find your perfect pieces.
              Transform your home effortlessly. Shop now for quality and style!
            </p>
            <Link to="/products">
              <button className="mt-4 bg-pink-600 py-2 px-6 text-base rounded-md">
                Shop Now
              </button>
            </Link>
          </div>
        </div>
      </section>
    </StyledHero>
  );
}



let StyledHero = styled.section`
  .overlay {
    position: relative;
  }
  .overlay::before {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 0.6;
  }
  /* .overlay::after {
    position: absolute;
    content: "";
    top: -38%;
    transform: skewY(-10deg);
    width: 100%;
    height: 50%;
    background-color: #db2777;
    opacity: 1;
    z-index: 1;
  } */

`;

export default Hero