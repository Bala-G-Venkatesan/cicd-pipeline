import React from 'react'
import styled from 'styled-components';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Link } from 'react-router-dom';


const ImageArticle = ({name,image,price,id}) => {
  return (
    <StyledImageArticle>
      <article
        key={id}
        className="image-article h-[220px] rounded overflow-hidden relative"
      >
        <div className="overlay h-[80%] w-[100%] flex justify-center items-center absolute rounded-md">
          <Link to={`/products/${id}`}>
            <div className="mag-back w-[40px] h-[40px] bg-pink-600 rounded-full flex justify-center items-center cursor-pointer z-40">
              <FaMagnifyingGlass size={20} className="text-white" />
            </div>
          </Link>
        </div>
        <img
          src={image}
          alt=""
          className="display-image h-[80%] w-[100%] object-cover rounded-md overflow-hidden"
        />
        <div className="info flex justify-between items-center h-[20%]">
          <h2 className="capitalize text-sm tracking-widest text-slate-700">
            {name}
          </h2>
          <p className="text-sm text-slate-700">${price / 100}</p>
        </div>
      </article>
    </StyledImageArticle>
  );
}



let StyledImageArticle = styled.section`
  .overlay {
    display: none;
    transition: background 0.5s ease;
  }
  .image-article:hover .overlay {
    display: flex;
    background: rgba(0, 0, 0, 0.4);
  }

  .image-article {
    position: relative;
  }
`;


export default ImageArticle