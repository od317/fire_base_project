import React, { useEffect } from 'react'
import { auth, subCollectionTest } from '../firebase'
import { logout, selectUser } from '../features/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
function Chat() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const user = useSelector(selectUser)

    const logout = async()=>{
        try{
        await auth.signOut()
        }
        catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
       if(!user)
          navigate('/login')
    },[
      user
    ])

  return (
    <>
    { user && 
    <>
      <button onClick={subCollectionTest} className=''>send message</button>
    </>
    }
  </>
  )
}

export default Chat