import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductsData, sortProducts, updateProducts } from '../slices/ProductsSlice'
import Loader from './Loader'
import styled from 'styled-components'
import ImageArticle from './ImageArticle'
import InfoArticle from './InfoArticle'
import Aligner from './Aligner'



const DisplayProducts = () => {
    let {
      PRODUCTS_LOADING,
      filteredData,
      filters
    } = useSelector((state) => state.Products);
    let url = "https://course-api.com/react-store-products";

    let [gridActive,setGridActive]=useState(true)
    
    let dispatch=useDispatch()
    
    useEffect(()=>
    {
        dispatch(fetchProductsData(url))
    },[])

    // useEffect(()=>
    // {
    //     console.log("Vulnerable",productsData)
    // },[])

    // useEffect(() => {
    //   console.log("Vulnerable", productsData);
    // }, [productsData]);

    useEffect(()=>
    {
        dispatch(updateProducts())
        dispatch(sortProducts())
    },[filters])


    if(PRODUCTS_LOADING)
    {
        return <Loader/>
    }


  return (
    <StyledDisplayProducts>
      <Aligner gridActive={gridActive} setGridActive={setGridActive} filteredData={filteredData}/>
      <section className="h-auto w-[100%] py-6">
        <section className={`gallery ${gridActive ? 'griddy' : 'towery'}`}>
          {gridActive
            ? filteredData.map((product) => {
                let { name, price, image, id } = product;
                return (
                  <ImageArticle
                    key={id}
                    name={name}
                    price={price}
                    image={image}
                    id={id}
                  />
                );
              })
            : filteredData.map((product) => {
                let { name, price, image, id, description } = product;
                return (
                  <InfoArticle
                    key={id}
                    name={name}
                    price={price}
                    image={image}
                    id={id}
                    description={description}
                  />
                );
              })}
        </section>
      </section>
    </StyledDisplayProducts>
  );
}


let StyledDisplayProducts = styled.section`
  .gallery.griddy {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 0.5rem;
  }

  .gallery.towery {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 1.5rem;
  }

  .gallery.towery .grid-card {
    display: flex;
    flex-direction: column;
    grid-template-columns: 1fr;
  }

  @media (min-width: 900px) {
    .gallery.towery .grid-card {
      display: grid;
      grid-template-columns: 4fr 8fr;
    }
    .gallery.towery .grid-card .info{
      margin-left:0.7rem;
    }
  }

  @media (min-width: 900px) {
    .gallery.griddy {
      grid-template-columns: 1fr 1fr;
      row-gap: 0.7rem;
      column-gap: 1rem;
    }
  }

  @media (min-width: 1280px) {
    .gallery.griddy {
      grid-template-columns: 1fr 1fr 1fr;
      row-gap: 0.7rem;
      column-gap: 1rem;
    }
  }
`;


export default DisplayProducts