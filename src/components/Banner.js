import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Banner = () => {
  return (
    <StyledBanner>
      <section className="w-[100vw] py-16">
        <div className="portside">
          <img
            src="https://images.unsplash.com/photo-1558442086-8ea19a79cd4d?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="w-[100%] min-h-[300px] h-[100%] md:h-[450px] object-cover"
          />
        </div>
        <div className="starboard h-auto md:h-[450px] py-8 px-4 md:px-8">
          <h2 className="text-lg font-semibold tracking-wider">
            New Lower Price
          </h2>
          <p className="text-[13px] my-4">
            We've just reduced the prices of our favourite products, making them
            even more affordable. Take advantage of these lowered prices and
            discover a wide range of options.
          </p>
          <Link to='/products'>
            <button className="bg-[#3f2f25] py-2 px-4 text-sm rounded-md">
              Explore All
            </button>
          </Link>
        </div>
      </section>
    </StyledBanner>
  );
}


let StyledBanner = styled.section`
  section {
    display: grid;
    grid-template-columns: 1fr;
    object-fit: cover;
    align-items: center;
    /* grid-template-rows: 1fr 1fr; */
  }

  @media (min-width: 1024px) {
    section {
      display: grid;
      grid-template-columns: 2fr 1fr;
      /* grid-template-rows: 1fr; */
      object-fit: cover;
      align-items: center;
      /* width: 90vw;
      max-width: 1170px;
      margin: 0 auto; */
    }
  }

  .starboard {
    background-color: #574134;
  }

  button 
  {
    animation:expandcontract 1.5s infinite;
  }
  @keyframes expandcontract {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.15);
    }
    100% {
      transform: scale(1);
    }
  }
`;

export default Banner