import React from 'react'
import styled from 'styled-components'

const About = () => {
  return (
    <StyledAbout>
      <section className="container min-h-[600px]">
        <div className="portside">
          <img
            src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className='rounded-md shadow-lg'
          />
        </div>
        <div className="starboard">
          <h2 className="text-[rgb(16,42,66)] text-3xl font-semibold text-center">
            Our Story
          </h2>
          <div className="w-[100px] h-[4px] bg-pink-600 flex justify-start text-left mx-auto my-2"></div>
          <p className="text-slate-700 text-sm my-4">
            Comfurniture company achieved remarkable growth by prioritizing
            quality craftsmanship, embracing e-commerce, forming strategic
            partnerships, and staying adaptable to market trends. company's
            journey from modest beginnings to becoming a significant player in
            the industry was marked by a combination of innovative design,
            strategic business decisions, online presence, customer-centric
            practices, and adaptability to market dynamics. Their commitment to
            customer satisfaction, international expansion, and innovative
            designs propelled them from a small enterprise to a major player in
            the industry.
          </p>
        </div>
      </section>
    </StyledAbout>
  );
}

let StyledAbout = styled.section`
  section {
    display: grid;
    grid-template-columns: 1fr;
    align-items: center;
    gap:2rem;
  }

  @media (min-width: 768px) {
    section {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
  }
  p 
  {
    line-height: 1.5rem;
  }
`;

export default About