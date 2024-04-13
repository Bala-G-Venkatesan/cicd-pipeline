import React from 'react'
import styled from 'styled-components'
import { FaFacebook } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io";



const Footer = () => {
  return (
    <StyledFooter>
      <section className="px-8 md:px-16 py-8 bg-[#212121] mt-14">
        <div className="about mt-6 lg:mt-3">
          <h2>About</h2>
          <div className="contents">
            <p>Contact Us</p>
            <p>About Us</p>
            <p>Careers</p>
            <p>Press</p>
            <p>Corporate Information</p>
          </div>
        </div>
        <div className="group mt-6 lg:mt-3">
          <h2>Group Of Comapnies</h2>
          <div className="contents">
            <p>Urban Ladder</p>
            <p>Royal Oak</p>
            <p>Sleepy Head</p>
            <p>Durian</p>
          </div>
        </div>
        <div className="help mt-6 lg:mt-3">
          <h2>Help</h2>
          <div className="contents">
            <p>Payments</p>
            <p>Shipping</p>
            <p>Cancellation & Returns</p>
            <p>Report Infringement</p>
          </div>
        </div>
        <div className="consumer-policy mt-6 lg:mt-3">
          <h2>Consumer Policy</h2>
          <div className="contents">
            <p>Payments</p>
            <p>Shipping</p>
            <p>Cancellation & Returns</p>
            <p>Report Infringement</p>
            <p>Grievance Redressal</p>
            <p>EPR Compliance</p>
          </div>
        </div>
        <div className="mail-us border-l-[1px] border-gray px-4 mt-6 lg:mt-3">
          <h2>Mail</h2>
          <div className="contents">
            <p>Comfurniture Private Limited,</p>
            <p>Building CasaGrand</p>
            <p>ELCOT Avenue, Chennai</p>
            <p>Tamil Nadu India</p>
          </div>
          <div className="social flex mt-6">
            <p>
              <FaFacebook size={22} />
            </p>
            <p className="mx-3">
              <FaSquareXTwitter size={22} />
            </p>
            <p>
              <IoLogoYoutube size={22} />
            </p>
          </div>
        </div>
        <div className="address  mt-6 lg:mt-3">
          <h2>Registered Office Address</h2>
          <div className="contents">
            <p>Comfurniture Private Limited,</p>
            <p>Clove Embassy Tech Village</p>
            <p>Mclaren Block, Outer Ring Road</p>
            <p>Benagluru 560190</p>
            <p>
              Telephone: <span className="text-pink-600">044-456147999</span>
            </p>
          </div>
        </div>
      </section>
    </StyledFooter>
  );
}




let StyledFooter = styled.section`
  h2 {
    font-size: 1rem;
    text-transform: capitalize;
    color: #878787;
    font-weight: 300;
    margin-bottom: 1rem;
  }

  p {
    font-size: 0.8rem;
    font-weight: 500;
    color: white;
  }

  .contents {
    line-height: 1.3rem;
  }

  section {
    display: grid;
    grid-template-columns: 1fr;
  }
  @media (min-width: 768px) {
    section {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
  @media (min-width: 1280px) {
    section {
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    }
  }
`;


export default Footer