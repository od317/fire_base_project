import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { auth,signOut } from "../../firebase"

const initialState = {
       value:{
              user:null
       }
}

export const logoutUser = createAsyncThunk('user/logoutUser',async ()=>{
           try{
           await signOut(auth)
           return true
           }catch(err){
              return err
           }
})

export const userSlice = createSlice({
       initialState,
       name:'user',
       reducers:{
              login:(state,action)=>{
                     state.value.user = action.payload
              },
              logout:(state)=>{
                     state = null
              }
       },
       extraReducers(builder){
              builder.addCase(logoutUser.fulfilled,(state,action)=>{
                     console.log('logout successfully')
                     state.value.user = null
              })
              .addCase(logoutUser.rejected,(state,action)=>{
                     console.log('error logging out',action)
              })
       }
})

export const selectUser = (state)=> state.user.value.user

export const {login,logout} = userSlice.actions

export default userSlice.reducer