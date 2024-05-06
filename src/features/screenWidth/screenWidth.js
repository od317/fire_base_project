import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    value:window.innerWidth
}

export const screenWidthSlice = createSlice({
    initialState,
    name:'screenWidth',
    reducers:{
        changeWidth:(state)=>{
                   state.value = window.innerWidth
        }
    }
})

export const {changeWidth} = screenWidthSlice.actions

export const selectScreenWidth = (state) => state.screenWidth.value

export default screenWidthSlice.reducer