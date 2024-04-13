import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


let initialState={
    PRODUCTS_LOADING:false,
    PRODUCTS_SUCCESS:false,
    PRODUCTS_ERROR:false,
    SINGLE_PRODUCT_LOADING:false,
    SINGLE_PRODUCT_SUCCESS:false,
    SINGLE_PRODUCT_ERROR:false,
    singleProduct:{},
    productsData:[],
    filteredData:[],
    filters:{search:"",category:"all",company:"all",color:"all",sort:'a-z',shipping:false}
}


let fetchProductsData=createAsyncThunk('product/fetchProductsData',async (url)=>
{
    let response=await axios.get(url)
    console.log(response.data)
    return response.data;
})

let fetchSingleProductData = createAsyncThunk("product/fetchSingleProductData",async (url)=>
{
  let response=await axios.get(url)
  return response.data;
})


let ProductsSlice=createSlice({
    name:"product",
    initialState,
    reducers:{
        updateFilters:(state,action)=>
        {
            let {name,value}=action.payload;
            if(name)
            {
                return {...state,filters:{...state.filters,[name]:value}}
            }
        },
        updateProducts:(state,action)=>
        {
            let {category,company,color,search,shipping}=state.filters;
            let updatedProducts=[...state.productsData];
            

             if (category && category.toLowerCase() !== "all") {
               updatedProducts = updatedProducts.filter(
                 (item) => item.category === category
               )
             }

             if (company && company.toLowerCase() !== "all") {
               updatedProducts = updatedProducts.filter(
                 (item) => item.company.toLowerCase() === company.toLowerCase()
               );
             }

             if (color && color.toLowerCase() !== "all") {
               updatedProducts = updatedProducts.filter((item) =>
                 item.colors.includes(color.toLowerCase())
               );
             }

             if(search && search.length>0)
             {
                console.log("MANKIND")
                updatedProducts=updatedProducts.filter((item)=>
                {
                  return item.name.toLowerCase().includes(search.toLowerCase())
                })
             }

             if(shipping)
             {
               updatedProducts = updatedProducts.filter((item) => {
                 return item.shipping===true
               });
             }

            return {...state,filteredData:updatedProducts}
        },
        sortProducts:(state,action)=>
        {
           let updatedProducts=[...state.filteredData]
           let {sort}=state.filters;
           if(sort==='a-z')
           {
              updatedProducts=updatedProducts.sort((a,b)=>
              {
                 return a.name-b.name
              })
           }
           if (sort === "z-a") {
             updatedProducts = updatedProducts.sort((a, b) => {
               return b.name - a.name;
             }).reverse();
           }
           if (sort === "price-high") {
             updatedProducts = updatedProducts.sort((a, b) => {
               return b.price - a.price;
             });
           }
           if (sort === "price-low") {
             updatedProducts = updatedProducts.sort((a, b) => {
               return a.price - b.price;
             });
           }
           return {...state,filteredData:[...updatedProducts]}
        }
    },
    extraReducers:(builder)=>
    {
        builder
        .addCase(fetchProductsData.pending,(state)=>
        {
            state.PRODUCTS_LOADING=true
            state.PRODUCTS_SUCCESS=false
        })
        .addCase(fetchProductsData.fulfilled,(state,action)=>
        {
            state.PRODUCTS_LOADING=false 
            state.PRODUCTS_SUCCESS=true
            state.productsData = action.payload
            state.filteredData =action.payload
        })
        .addCase(fetchProductsData.rejected,(state)=>
        {
            state.PRODUCTS_SUCCESS=false
            state.PRODUCTS_ERROR=true
        })
        .addCase(fetchSingleProductData.pending,(state)=>
        {
          state.SINGLE_PRODUCT_LOADING=true 
          state.SINGLE_PRODUCT_SUCCESS=false
        })
        .addCase(fetchSingleProductData.fulfilled, (state,action) => {
          state.SINGLE_PRODUCT_LOADING = false
          state.SINGLE_PRODUCT_SUCCESS = true
          console.log(action.payload)
          state.singleProduct=action.payload;
        })
        .addCase(fetchSingleProductData.rejected, (state) => {
          state.SINGLE_PRODUCT_SUCCESS = false
          state.SINGLE_PRODUCT_ERROR = true
        })
    }
})




export const {updateFilters,updateProducts,sortProducts}=ProductsSlice.actions
export default ProductsSlice.reducer
export {fetchProductsData,fetchSingleProductData}