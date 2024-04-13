import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { fetchSingleProductData } from '../slices/ProductsSlice';
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import styled from 'styled-components';
import Loader from '../components/Loader';
import { addToCart, fetchCart } from '../slices/CartSlice';

const SingleProduct = () => {

    

    
    let {SINGLE_PRODUCT_LOADING,singleProduct}=useSelector(state=>state.Products)
    let {user,token}=useSelector(state=>state.User)
    

    let {colors,company,description,name,price,stock,images}=singleProduct;
    let { id } = useParams();
    let dispatch=useDispatch()
    let single_url = "https://course-api.com/react-store-single-product?id=";
    single_url=single_url+id;

    let [mainImage,setMainImage]=useState(0)
    let [activeColor,setActiveColor]=useState(0)
    let [count,setCount]=useState(1)

    function ScrollToTop() {
      useEffect(() => {
        window.scrollTo({ top: 0, behavior:'smooth'});
      }, []);

      return null; // Render nothing, just perform the scroll action
    }



    let increase=()=>
    {
        if(count>=stock)
        {
           setCount(stock)
           return
        }
        setCount(count + 1);
    }


    let decrease=()=>
    {
        if(count<=1)
        {
            setCount(1)
            return
        }
        setCount(count-1)
    }
    

    let handleAddToCart=async ()=>
    {
      await dispatch(addToCart({ token,user:user._id, name, price, amount: count,stock:stock,productImage:images[0].url}));
      dispatch(fetchCart({ user: user._id }));
    }

    useEffect(()=>
    {
        dispatch(fetchSingleProductData(single_url))
    },[id])


    if (SINGLE_PRODUCT_LOADING) {
      return <Loader />;
    }
    
  return (
    <StyledSingleProduct>
      <main className="mt-8 min-h-screen">
        <ScrollToTop/>
        <section className="container h-auto w-[100%]">
          <article className="portside">
            <div className="main-image w-[100%] h-[350px] max-h-[80%]">
              <img
                src={images && images[mainImage].url}
                alt=""
                className="w-[100%] h-[100%] object-cover rounded-md"
              />
            </div>
            <div className="sub-images w-[100%] h-[60px] md:h-[70px] mt-4 lg:mt-6">
              {images &&
                images.map((items, idx) => {
                  let { url } = items;
                  return (
                    <img
                      alt="Main Image"
                      src={url}
                      onClick={() => setMainImage(idx)}
                      className="h-[60px] lg:h-[70px] w-[100%] object-cover rounded-md cursor-pointer"
                    />
                  );
                })}
            </div>
          </article>
          <article className="starboard text-slate-700 leading-8 mt-8 md:mt-0 flex flex-col justify-center items-start">
            <h2 className="text-3xl font-semibold capitalize text-slate-700 mt-0 pt-0">
              {name}
            </h2>
            <p className="text-pink-600 mt-[2px]">${price / 100}</p>
            <p className="text-sm mt-[2px]">{description}</p>
            <div className="object-pars border-b-[1px] mt-2 border-slate-700 w-[100%]">
              <p>Available : {stock === 0 ? "No Stock" : stock}</p>
              <p>Brand : {company}</p>
            </div>
            <div className="colors flex mt-4">
              {stock !== 0 &&
                colors &&
                colors.map((item, idx) => {
                  return (
                    <button
                      style={{ background: item }}
                      key={idx}
                      onClick={() => setActiveColor(idx)}
                      className="w-[23px] h-[23px] rounded-full flex justify-center items-center text-white mr-2"
                    >
                      {activeColor === idx ? <FaCheck /> : null}
                    </button>
                  );
                })}
            </div>
            {stock !== 0 && (
              <div className="count mt-3 flex select-none">
                <button className="" onClick={decrease}>
                  <FaMinus />
                </button>
                <h2 className="text-3xl min-w-[60px] flex justify-center font-semibold">
                  {count}
                </h2>
                <button className="" onClick={increase}>
                  <FaPlus />
                </button>
              </div>
            )}
            {stock !== 0 && user ? (
              <Link to="/cart">
                <button
                  className="bg-pink-600 px-3
             text-white rounded-sm mt-3"
                  onClick={handleAddToCart}
                >
                  Add To Cart
                </button>
              </Link>
            ) : (
              <Link to="/login">
                <button
                  className="bg-pink-600 px-3
             text-white rounded-sm mt-3"
                >
                  Login To Add 
                </button>
              </Link>
            )}
          </article>
        </section>
      </main>
    </StyledSingleProduct>
  );
}



let StyledSingleProduct = styled.section`
  .sub-images {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-column-gap: 0.4rem;
    align-items: flex-end;
  }
  @media (min-width: 768px) {
    section {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-column-gap: 1rem;
    }
    .sub-images {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
      grid-column-gap: 0.4rem;
    }
  }

  @media (min-width: 1024px) {
    section {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-column-gap: 2rem;
    }
    .sub-images {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
      grid-column-gap: 1rem;
    }
  }
`;

export default SingleProduct