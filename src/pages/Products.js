import React, { useEffect } from 'react'
import Filters from '../components/Filters'
import styled from 'styled-components'
import DisplayProducts from '../components/DisplayProducts'

const Products = () => {
  

  useEffect(()=>
  {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  },[])


  return (
    <StyledProducts>
      <main className="container min-h-screen">
        <Filters />
        <DisplayProducts />
      </main>
    </StyledProducts>
  )
}



let StyledProducts = styled.section`
  main {
    display: grid;
    margin-top:0.8rem;
  }

  @media (min-width: 768px) {
    main {
      display: grid;
      grid-template-columns: 3fr 9fr;
    }
  }
  @media (min-width: 1024px) {
    main {
      display: grid;
      grid-template-columns: 3fr 12fr;
    }
  }


`;

export default Products