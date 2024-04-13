import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsData } from '../slices/ProductsSlice';
import ImageArticle from './ImageArticle';
import styled from 'styled-components';

const FeaturedProducts = () => {


    let {
      productsData,
    } = useSelector((state) => state.Products);
    let url = "https://course-api.com/react-store-products";


    let dispatch = useDispatch();

    useEffect(() => {
      dispatch(fetchProductsData(url));
    }, []);

  return (
    <StyledFeatured>
      <section className="h-auto pb-6 container flex flex-col items-center">
        <h2 className="text-[#102a42] text-3xl text-center font-semibold tracking-wider py-4">
          Featured Products
        </h2>
        <div className="w-[100px] h-[4px] bg-pink-600 text-center mx-auto"></div>
        <div className="featured mt-8 w-[100%]">
          {productsData.filter((items)=>
          {
            return items.featured
          }).map((product) => {
            let { name, price, image, id } = product;
            return (
              <ImageArticle
                key={id}
                name={name}
                price={price}
                image={image}
                id={id}
                className='w-[100%]'
              />
            );
          }).slice(0,3)}
        </div>
      </section>
    </StyledFeatured>
  );
}


let StyledFeatured = styled.section`
  .featured {
    display: grid;
    grid-template-columns: 1fr;
    gap:1rem;
    justify-content: space-between;
  }

  @media (min-width: 768px) {
    .featured {
      grid-template-columns: 1fr 1fr;
      gap:2rem;
      justify-content: space-between;
    }
  }

  @media (min-width: 1024px) {
    .featured {
      grid-template-columns: 1fr 1fr 1fr;
      justify-content: space-between;
    }
  }
`;

export default FeaturedProducts