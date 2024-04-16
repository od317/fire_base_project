import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {editMessageThunk} from './PostsSlice'
import {selectUser} from '../user/userSlice'

function Message({post,handleMessageDelete}) {

  const [title,setTitle] = useState('')
  const [content,setContent] = useState('')

  const user = useSelector(selectUser)

  const dispatch = useDispatch()

  const handleMessageEdit = ()=>{
        if(title.length>0 && content.length>0)
        dispatch(editMessageThunk({
          title:title,
          content:content,
          uid:post.uid,
          email:post.email,
          id:post.id
        }))        
  }

  return (
    <>
    
            <h3>{post.title}</h3>
            <br />
            <p>{post.content}</p>
            <br />
            <p>{post.email}</p>
            <br />
            <label>author:{post.uid}</label>
            <br />
            <br />
           { post.uid === user?.uid && <>        
            <input type="text" name="title" value={title} onChange={(e)=>{
              setTitle(e.target.value)
            }} id="" />
            <br />
            <input type="text" name="content" value={content} onChange={(e)=>{
              setContent(e.target.value)
            }} id="" />
            <br />
            <button onClick={handleMessageEdit}>edit</button>
           <button onClick={()=>{
                handleMessageDelete(post.id)
            }} className='bg-red-500 p-[1%] m-[2%]'>delete</button>
            </>
            }
          <br /><br /><br />
          Posted on: {post.createdAt}
    </>
  )
}

export default Message