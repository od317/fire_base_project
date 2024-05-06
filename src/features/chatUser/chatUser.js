import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const changeUser = createAsyncThunk('chatUser/changeUser', async (user) => {
    return user
})

const initialState = {
    value: null
}

export const chatUser = createSlice({
    initialState,
    name: "chatUser",
    reducers: {
        changeChatUser:(state,action)=>{
                   state.value = action.payload
        }
    },
    extraReducers(builder) {
        builder.addCase(changeUser.fulfilled,(state,action)=>{
            console.log('changing user',action.payload)
            state.value = action.payload
        })
    }
})

export const selectChatUser = (state)=> state.chatUser.value

export const {changeChatUser} = chatUser.actions

export default chatUser.reducer