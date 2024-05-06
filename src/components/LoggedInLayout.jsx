import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectModal } from '../features/modal/modalSlice'
import { selectUser } from '../features/user/userSlice'
import Modal from './modal/Modal'
import Nav from './nav/Nav'

function LoggedInLayout({children}) {
  
  const user = useSelector(selectUser)
  const navigate = useNavigate()

  const modal = useSelector(selectModal)

  useEffect(()=>{
      if(!user)
         navigate('/login')
      else
         window.scrollTo({top:0})   
  },[])
  
  return (<>
    
    {modal && <Modal></Modal>}
    
    <div className='p-[1%] overflow-x-hidden flex flex-col h-screen overflow-y-hidden '>
      <Nav></Nav>
      {children}
    </div>
    </>
  )
}

export default LoggedInLayout
