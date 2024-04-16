import React from 'react'
import PostsList from '../../features/Posts/PostsList'
import AddPostForm from '../../features/Posts/AddPostForm'
import PostForm from './PostForm'
function HomeLayout() {
  return (
    <div className='w-full flex flex-col items-center justify-center'>
      home page
      <br />
      <PostForm></PostForm>
      <PostsList></PostsList>
    </div>
  )
}

export default HomeLayout