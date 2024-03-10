import React, { useContext } from 'react'
import { getAuth,signOut} from 'firebase/auth'
import {userContext} from '../../context/userContext'
import { NavLink } from 'react-router-dom'
function HomeLayout() {
  const user = useContext(userContext)
  const handleLogout = async () => {
    try {
      const auth = getAuth()
      await signOut(auth)
      window.open('https://support.google.com/accounts/answer/32050')
      // Logout successful
    } catch (error) {
      console.error('Error logging out:', error.message)
    }
  }

  return (
    <div>
      home
      <br />
      { user ?
      <>
      <button onClick={handleLogout}>logout {user.email}</button>
      </>
      :
      <>
        <NavLink to={'/login'}>login</NavLink>
      </>
      }
      </div>
  )
}

export default HomeLayout
