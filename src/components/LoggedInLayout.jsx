import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectUser } from '../features/user/userSlice'
import Nav from './nav/Nav'

function LoggedInLayout({children}) {
  
  const user = useSelector(selectUser)
  const navigate = useNavigate()


  useEffect(()=>{
      if(!user)
         navigate('/login')
      else
         window.scrollTo({top:0})   
  },[])
  
  return (
    <div className='pt-[2%] overflow-x-hidden  overflow-y-hidden '>
      <Nav></Nav>
      {children}
    </div>
  )
}

export default LoggedInLayout
