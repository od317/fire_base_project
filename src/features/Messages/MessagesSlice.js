import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { uuidv4 } from "@firebase/util";
import { deleteMessages, sendMessageF, showMessages } from "../../firebase"

export const sendMessage = createAsyncThunk('messages/sendMessage', async (message) => {
    const res = await sendMessageF(message)
    return res
})

export const removeMessage = createAsyncThunk('messages/removeMessage', async (id) => {
    const res = await deleteMessages(id)
    return res
})

export const getMessages = createAsyncThunk('messages/getMessages',async(id)=>{
             const res = await showMessages(id)
             return res
})

const inMessages = [
]

for (let i = 0; i < 2; i++) {
    inMessages.push({
        content: 'hello who are you addndnsandiwandias asdasdqwewqdasdqweqwe safwetrwerwho are you addndnsandiwandias asdasdqwewqdasdqweqwe safwetrwerwho are you addndnsandiwandias asdasdqwewqdasdqweqwe safwetrwer',
        date: '09:00',
        id: uuidv4()
    })
}

const initialState = {
    value: [],
    pending:false
}

export const messagesSlice = createSlice({
    initialState,
    name: 'messages',
    reducers: {
        addMessage: {
            reducer: (state, action) => {
                state.value = [...state.value, { ...(action.payload), id: uuidv4() }]
            },
            prepare: (message) => {
                return {
                    payload: {
                        ...message
                    }
                }
            }
        },
        // removeMessage: (state, action) => {
        //     state.value = state.value.filter((message) => {
        //         return message.id !== action.payload.id
        //     })
        // },
        changeMessages:(state,action)=>{
            state.value = action.payload
            state.pending = false
        },
        changeMessagesStatus:(state,action)=>{
            state.pending = action.payload
        }
    },
    extraReducers: (build) => {
        build
            .addCase(sendMessage.fulfilled, (state, action) => {
                console.log('message added successfully')
            })
            .addCase(sendMessage.rejected, (state, action) => {
                console.log('failed to send messaged')
            })
            .addCase(getMessages.fulfilled,(state,action)=>{
                console.log('get messages succ',action.payload)
                state.value = action.payload
            }) 
            .addCase(removeMessage.fulfilled,(state,action)=>{
                console.log('messages removed succ')
            })
    }
})


export const selectMessages = (state) => state.messages.value
export const selectMessagesStatus = (state) => state.messages.pending

export const { addMessage, changeMessages ,changeMessagesStatus } = messagesSlice.actions

export default messagesSlice.reducer