import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { logoutUser, selectUser } from '../../features/user/userSlice'

function Nav() {

  const user = useSelector(selectUser)

  const dispatch = useDispatch()

  
  const handleLogout = async ()=>{
        dispatch(logoutUser())
  }

  return (
    <div className='flex flex-row items-center justify-evenly'>
        <NavLink to='/'>home</NavLink>
        {user ? <>
        <div>{user?.email }</div>
        <button onClick={handleLogout}>logout</button>
        </> : 
        <NavLink to='/login'>login</NavLink> }
    </div>
  )
}

export default Nav