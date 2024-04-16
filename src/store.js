import { configureStore } from "@reduxjs/toolkit"
import postsReducer from './features/Posts/PostsSlice'
import usersReducer from './features/users/usersSlice'
import userReducer from './features/user/userSlice'
export const store = configureStore({
    reducer:{
    posts:postsReducer,
    user:userReducer,
    users:usersReducer,
}
})