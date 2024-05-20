import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getAllUsers } from "../../firebase"


// let users = [

// ]

// for(let i=0;i<220;i++){
//     users.push(    {
//       name:"name",
//       lastMessage:'hello',
//       date:'09:00',
//       online:true,
//       photo:'https://lh3.googleusercontent.com/a/ACg8ocISoJBA5MezFgycat-m33VjK6UWGrR_Q61QOU0wfLu2WQ=s96-c'
//   })
// }

const initialState = {
    value:[],
    pending:false
}


export const fetchUsers = createAsyncThunk('users/fetchUsers', async ()=>{
       const res = await getAllUsers()
       return res
})

export const usersSlice = createSlice({
    name:'users',
    initialState,
    reducers:{},
    extraReducers(builder){
        builder.addCase(fetchUsers.pending,(state,action)=>{
            state.pending = false
        }).
        addCase(fetchUsers.fulfilled,(state,action)=>{
               console.log('all users fetched',action.payload)
               state.value = action.payload
               state.pending = false
        }).
        addCase(fetchUsers.rejected,(state,action)=>{
               console.log('rejected')
               state.pending = false

     })
    }
})

export const selectAllUsers = (state) => state.users.value
export const selectUsersPending = (state) => state.users.pending
export default usersSlice.reducer