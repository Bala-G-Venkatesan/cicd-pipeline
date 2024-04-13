import React from 'react'
import { Link } from 'react-router-dom';

const InfoArticle = ({ name, image, price, id, description}) => {
  return (
    <article
      key={id}
      className="info-article grid-card rounded overflow-hidden"
    >
      <img
        src={image}
        alt=""
        className="min-h-[100px] max-h-[200px] h-[180px] w-[100%] min-w-[220px] md:min-w-[250px] md:w-[300px]  object-cover rounded-md overflow-hidden"
      />
      <div className="info flex flex-col items-start mt-4 md:mt-0">
        <h2 className="capitalize tracking-widest text-slate-700 font-bold text-lg mb-1">
          {name}
        </h2>
        <p className="text-sm text-pink-600 mb-2">$ {price / 100}</p>
        <p className="text-sm mb-1 text-slate-700">
          {description.slice(0, 120)}
        </p>
        <Link to={`/products/${id}`}>
          <button className="text-left text-sm mt-1 bg-pink-600 px-2 text-white mb-1 rounded cursor-pointer">
            Details
          </button>
        </Link>
      </div>
    </article>
  );
};

export default InfoArticle