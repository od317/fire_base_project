import { createSlice, nanoid,createAsyncThunk } from "@reduxjs/toolkit"
import { deleteMessages, sendMessage, showMessages,editMessage } from "../../firebase"

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'


const initialState = {
    posts:[],
    status:'idle',
    error:null
}


export const fetchPosts = createAsyncThunk('posts/fetchPosts',async ()=>{
       const data = await showMessages()
       return data
})

export const addMessage = createAsyncThunk('posts/addMessage',async (message)=>{
             const savedMessage = await sendMessage(message)
             return savedMessage
})

export const deleteMessage = createAsyncThunk('posts/deleteMessage',async(messageId)=>{
             await deleteMessages(messageId)
             return messageId
})

export const editMessageThunk = createAsyncThunk('posts/editMessageThunk',async (message)=>{
             console.log('editring message',message)
             await editMessage(message.id,message)
             return message
})

export const postsSlice = createSlice({
    name:'posts',
    initialState,
    reducers:{
        changeMessageList:(state,action)=>{
                          state.posts = action.payload
        },
        postAdded:{
            reducer (state,action){
            state.posts.push(action.payload)
            },
            prepare(title,content,userId){
                return {
                    payload:{
                        title,
                        content,
                        userId,
                        id:nanoid()
                    }
                }
            }
        }
    },
    extraReducers(builder){
        builder.addCase(fetchPosts.pending,(state,action)=>{
            state.status = 'loading'
        })
        .addCase(fetchPosts.fulfilled,(state,action)=>{
            state.status = 'succeeded'
            console.log('after fetcgin',action.payload)
            state.posts = action.payload  
        })
        .addCase(fetchPosts.rejected,(state,action)=>{
            state.status = 'failed'
            state.error = action.error.message
        })
        .addCase(deleteMessage.fulfilled,(state,action)=>{
                 console.log('message deleted successfully',action.payload)
                 state.posts = state.posts.filter((p)=>{
                    return p.id !== action.payload
                 })
        })
        .addCase(deleteMessage.rejected,(state,action)=>{
            console.log('unable to delete message')
        })
        .addCase(addMessage.fulfilled,(state,action)=>{
                 console.log('message sent successfully',action.payload)
        })
        .addCase(addMessage.rejected,(state,action)=>{
                console.log('message is not added')
        })
        .addCase(editMessageThunk.fulfilled,(state,action)=>{
                 console.log('message edit successfully')
                 state.posts = state.posts.map((p)=>{
                       if(p.id === action.payload.id){
                          return action.payload
                       }
                       return p
                 })
        })
        .addCase(editMessageThunk.rejected,(state,action)=>{
                 console.log('unable to edit message',action.payload)
        })
    }
})


export const selectAllPosts = (state) => state.posts.posts
export const selectStatus = (state)=> state.posts.status
export const selectError = (state)=> state.posts.error


export const {postAdded} = postsSlice.actions

export default postsSlice.reducer