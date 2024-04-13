import React, { useEffect, useState } from 'react'
import rgbHex from "rgb-hex";
import { FaCheck } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux'
import { updateFilters } from '../slices/ProductsSlice'


const Filters = () => {

    let {productsData,filters}=useSelector(state=>state.Products)

    let dispatch=useDispatch()
    let CategoryFilters=['all',...new Set(productsData.map((items)=>
    {
        return items.category;
    }))]


    let CompanyFilters = [
      "all",
      ...new Set(
        productsData.map((items) => {
          return items.company;
        })
      ),
    ];

    let ColorFilters = [
      ...new Set(
        productsData.map((items) => {
          return items.colors;
        }).flat()
      ),
    ];

    let [activeCategory,setActiveCategory]=useState('All')
    let [activeCompany,setActiveCompany]=useState('All')
    let [activeColor,setActiveColor]=useState(0)


    let handleFilters=(e)=>
    {
        if (e.target.name === "category") {
          dispatch(
            updateFilters({ name: e.target.name, value: e.target.textContent })
          );
        }
        if(e.target.name==='company')
        {
             dispatch(
               updateFilters({ name: e.target.name, value: e.target.value })
             );
        }
        if (e.target.name === "color") {
            if(e.target.textContent==='all')
            {
                dispatch(
                  updateFilters({
                    name: e.target.name,
                    value: 'all',
                  })
                );
            }
            else 
            {
                 dispatch(
                   updateFilters({
                     name: e.target.name,
                     value: "#"+rgbHex(e.target.style.backgroundColor),
                   })
                 );
            }
        }
        if (e.target.name === "sort") {
          dispatch(
            updateFilters({ name: e.target.name, value: e.target.value })
          );
        }
        if (e.target.name === "search") {
          dispatch(
            updateFilters({ name: e.target.name, value: e.target.value })
          );
        }
        if (e.target.name === "shipping") {
          dispatch(
            updateFilters({ name: e.target.name, value: e.target.checked })
          );
        }
    }

    useEffect(()=>
    {
        console.log(filters)
    },[filters])

  return (
    <section className="h-auto mb-4 w-[100%] text-slate-600">
      <div className="category-filter flex flex-col items-start my-2">
        <input
          onChange={handleFilters}
          type="text"
          name="search"
          className="h-[32px] outline-none px-2 w-[170px] rounded text-sm"
          placeholder="Search..."
        />
      </div>
      <div className="category-filter flex flex-col items-start">
        <h2 className="font-semibold text-black text-sm">Category</h2>
        {CategoryFilters.map((item, idx) => {
          return (
            <button
              key={idx}
              name="category"
              className="capitalize text-sm py-1"
              style={{
                borderBottom:
                  activeCategory.toLowerCase() === item.toLowerCase()
                    ? "1px solid #475569"
                    : null,
              }}
              onClick={(e) => {
                handleFilters(e);
                setActiveCategory(item);
              }}
            >
              {item}
            </button>
          );
        })}
      </div>
      <div className="category-filter flex flex-col items-start mt-2">
        <h2 className="font-semibold text-black text-sm">Company</h2>
        <select
          name="company"
          id=""
          onChange={handleFilters}
          className="mt-2 outline-none w-[100px] h-[25px] px-1 capitalize text-sm"
        >
          {CompanyFilters.map((item, idx) => {
            return (
              <option
                key={idx}
                name="company"
                className="capitalize py-1 text-sm"
                style={{
                  borderBottom:
                    activeCompany.toLowerCase() === item.toLowerCase()
                      ? "1px solid #475569"
                      : null,
                }}
              >
                {item}
              </option>
            );
          })}
        </select>
      </div>
      <div className="color-filter flex flex-col items-start mt-2">
        <h2 className="font-semibold text-black text-sm mb-1">Colors</h2>
        <div className="color-chart flex items-center">
          <button
            className="mr-1 capitalize"
            name="color"
            onClick={(e) => {
              handleFilters(e);
              setActiveColor(null);
            }}
          >
            all
          </button>
          {ColorFilters.map((items, idx) => {
            return (
              <button
                key={idx}
                name="color"
                style={{ backgroundColor: items }}
                onClick={(e) => {
                  handleFilters(e);
                  setActiveColor(idx);
                }}
                className={`w-[20px] h-[20px] bg-[${items}] rounded-full flex justify-center items-center text-white mx-[2px]`}
              >
                {idx === activeColor ? <FaCheck /> : null}
              </button>
            );
          })}
        </div>
      </div>
      <div className="shipping-filter flex items-center my-3">
        <p className='text-sm mr-4'>Fast Shipping</p> <input type="checkbox" name='shipping' onClick={handleFilters}/>
      </div>
    </section>
  );
}



export default Filters
