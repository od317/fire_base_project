import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = []

const POSTS_URL = 'https://jsonplaceholder.typicode.com/users'

export const fetchUsers = createAsyncThunk('users/fetchUsers', async ()=>{
       const res = await fetch(POSTS_URL)
       const data = await res.json()
       return data
})

export const usersSlice = createSlice({
    name:'users',
    initialState,
    reducers:{},
    extraReducers(builder){
        builder.addCase(fetchUsers.fulfilled,(state,action)=>{
               return action.payload
        })
    }
})

export const selectAllUsers = (state) => state.users

export default usersSlice.reducer