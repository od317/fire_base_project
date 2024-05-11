import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { auth,changeOnlineStatus,signOut } from "../../firebase"

const initialState = {
       value:{
              user:null
       }
}

export const logoutUser = createAsyncThunk('user/logoutUser',async ()=>{
           try{
           await changeOnlineStatus(auth.currentUser,false)
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
                     console.log('logged in ',action.payload)
                     state.value.user = action.payload
              },
              logout:(state)=>{
                     console.log('logging out')
                     state.value.user = null
              },
              changeUName:(state,action)=>{
                     console.log('changing name in redux')
                     if(state.value.user.name){
                            state.value.user.name = action.payload
                     }
                     else{
                            state.value.user.displayName = action.payload
                     }
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

export const {login,logout,changeUName} = userSlice.actions

export default userSlice.reducer