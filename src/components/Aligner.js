import React from 'react'
import { TfiLayoutGrid3 } from "react-icons/tfi";
import { TfiLayoutGrid3Alt } from "react-icons/tfi";
import { BsGrid1X2 } from "react-icons/bs";
import { BsGrid1X2Fill } from "react-icons/bs";
import { updateFilters} from '../slices/ProductsSlice';
import { useDispatch} from 'react-redux';





const Aligner = ({gridActive,setGridActive,filteredData}) => {


  let dispatch = useDispatch();


   let handleSort = (e) => {
     if (e.target.name === "sort") {
       dispatch(updateFilters({ name: e.target.name, value: e.target.value }));
     }
   };
  return (
    <section>
      <div className="align text-slate-700 flex flex-col items-start justify-between leading-10 md:flex-row md:items-center">
        <div className="btn-section flex items-center">
          <span
            onClick={() => setGridActive(!gridActive)}
            className="cursor-pointer mr-2"
          >
            {gridActive ? <BsGrid1X2 size={24} /> : <BsGrid1X2Fill size={24} />}
          </span>
          <span
            onClick={() => setGridActive(!gridActive)}
            className="cursor-pointer"
          >
            {gridActive ? <TfiLayoutGrid3Alt size={24} /> : <TfiLayoutGrid3 size={24} />}
          </span>
        </div>
        <span>{filteredData.length} Products Found</span>
        <span className="h-[1px] w-[100%] md:flex md:w-[25%] lg:w-[50%] bg-slate-700"></span>
        <div className="sorter"> 
          <select
            name="sort"
            id=""
            className="outline-none bg-transparent pl-0 ml-0"
            onChange={handleSort}
          >
            <option value="a-z">Name (A-Z)</option>
            <option value="z-a">Name (Z-A)</option>
            <option value="price-low">Price (Lowest)</option>
            <option value="price-high">Price (Highest)</option>
          </select>
        </div>
      </div>
    </section>
  );
}

export default Aligner