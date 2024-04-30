import { createSlice } from "@reduxjs/toolkit";
import { uuidv4 } from "@firebase/util";

const inMessages = [
]

for(let i=0;i<20;i++){
    inMessages.push({
      content:'hello who are you addndnsandiwandias asdasdqwewqdasdqweqwe safwetrwer',
      date:'09:00',
      id:uuidv4()
    })
}

const initialState = {
    value:inMessages
}

export const messagesSlice = createSlice({
       initialState,
       name:'messages',
       reducers:{
        addMessage:(state,action)=>{
            state.value = [...state.value,{...(action.payload),id:uuidv4()}]
        },
        removeMessage:(state,action)=>{
            state.value = state.value.filter((message)=>{
                        return message.id !== action.payload.id
            })
        }
       }
})


export const selectMessages = (state) => state.messages.value

export const {addMessage,removeMessage} = messagesSlice.actions

export default messagesSlice.reducer