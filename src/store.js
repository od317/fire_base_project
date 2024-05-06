import { configureStore } from "@reduxjs/toolkit"
import postsReducer from './features/Posts/PostsSlice'
import usersReducer from './features/users/usersSlice'
import userReducer from './features/user/userSlice'
import darkThemeSliceReducer from "./features/Theme/themeSlice"
import viewMessageReducer from "./features/ViewMessages/viewMessagesSlice"
import messagesReducer from './features/Messages/MessagesSlice'
import chatUserReducer from './features/chatUser/chatUser'
import screenWidthReducer from "./features/screenWidth/screenWidth"
import modalReducer from "./features/modal/modalSlice"
import usersSearchReducer from './features/usersSearch/usersSearchSlice'

export const store = configureStore({
    reducer:{
    posts:postsReducer,
    user:userReducer,
    users:usersReducer,
    theme:darkThemeSliceReducer,
    viewMessages:viewMessageReducer,
    messages:messagesReducer,
    chatUser:chatUserReducer,
    screenWidth:screenWidthReducer,
    modal:modalReducer,
    usersSearch:usersSearchReducer
    }
})