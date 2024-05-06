import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    value:false
}

const modalSlice = createSlice({
      initialState,
      name:'modal',
      reducers:{
        changeModal:(state,action)=>{
            state.value = action.payload
        }
      }
})


export const selectModal = (state) => state.modal.value 

export const {changeModal} = modalSlice.actions

export default modalSlice.reducer