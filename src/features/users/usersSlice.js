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
    value:[]
}

const POSTS_URL = 'https://jsonplaceholder.typicode.com/users'

export const fetchUsers = createAsyncThunk('users/fetchUsers', async ()=>{
       const res = await getAllUsers()
       return res
})

export const usersSlice = createSlice({
    name:'users',
    initialState,
    reducers:{},
    extraReducers(builder){
        builder.addCase(fetchUsers.fulfilled,(state,action)=>{
               console.log('all users fetched',action.payload)
               state.value = action.payload
        })
    }
})

export const selectAllUsers = (state) => state.users.value

export default usersSlice.reducer