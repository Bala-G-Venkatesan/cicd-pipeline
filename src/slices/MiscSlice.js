import { createSlice } from "@reduxjs/toolkit";



let initialState={
    sidebarStatus:false
}


let MiscSlice=createSlice({
    name:"Misc",
    initialState,
    reducers:{
        openSidebar:(state)=>
        {
            state.sidebarStatus=true
        },
        closeSidebar:(state)=>
        {
            state.sidebarStatus=false
        }
    }
})


export const {openSidebar,closeSidebar}=MiscSlice.actions
export default MiscSlice.reducer


