import React,{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {selectUser} from '../../features/user/userSlice'
import { nanoid } from '@reduxjs/toolkit'
import {addMessage} from '../../features/Posts/PostsSlice'

function PostForm() {
    
  const user = useSelector(selectUser)  

  const dispatch = useDispatch()

  const handleformsubmit = (e)=>{
        e.preventDefault()
        if(!user)
           return 
        const message = {
            title:e.target.title.value,
            content:e.target.content.value,
            uid:user.uid,
            email:user.email,
        }
        dispatch(addMessage(message))
    }
  return (
    <div className='w-[50%]'>
        <form className='flex flex-col w-full bg-green-500 py-[5%]  items-center justify-evenly'
              onSubmit={handleformsubmit}>
              <input type="text" className='border-black border-[1px] mb-[5%] p-[2%]' placeholder='title' name={'title'} />        
              <input type="text" className='border-black border-[1px] p-[2%]' placeholder='content' name={'content'} />   
              <button type='submit'>add</button>    
        </form>
    </div>
  )
}

export default PostForm