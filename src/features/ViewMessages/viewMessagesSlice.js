import { createSlice } from "@reduxjs/toolkit";

export const viewMessageSlice = createSlice({
    name:'viewMessages',
    initialState:{
        value:false
    },
    reducers:{
        changeMessagesView:(state,action)=>{
               state.value = action.payload
        }
    }
})

export const {changeMessagesView} = viewMessageSlice.actions

export const selectViewMessages = (state) => state.viewMessages.value

export default viewMessageSlice.reducer