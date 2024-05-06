import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get5Users, searchForUsers } from "../../firebase";

const initialState = {
    value: [],
    pending:true,
    error:false
}

export const getReco = createAsyncThunk('usersSearch/getReco', async () => {
    const res = await get5Users()
    return res
})

export const searchUsers = createAsyncThunk('usersSearch/searchUsers', async (search)=>{
    const res = await searchForUsers(search)
    return res
})

const usersSearchSlice = createSlice({
    initialState,
    name: "usersSearch",
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getReco.fulfilled, (state, action) => {
                console.log('get 5 user succ ', action.payload)
                state.value = action.payload
                state.pending = false
                state.error = false
            })
            .addCase(getReco.rejected, (state, action) => {
                console.log('error getting 5 user')
                state.pending = false
                state.error = true
            })
            .addCase(getReco.pending, (state, action) => {
                     state.pending = true
                     state.error = false
            })
            .addCase(searchUsers.fulfilled,(state,action)=>{
                console.log('search succ')
                state.value = action.payload
                state.pending = false
                state.error = false
            })
            .addCase(searchUsers.pending,(state,action)=>{
                state.pending = true
                state.error = false
            })
            .addCase(searchUsers.rejected,(state,action)=>{
                console.log('error searching',action.error)
                state.pending = false
                state.error = true
            })
    }
})

export const selectUsersSearch = (state) => state.usersSearch

export default usersSearchSlice.reducer