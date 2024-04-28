import React, { useEffect,useState} from 'react'
import { auth, subCollectionTest } from '../firebase'
import { logout, selectUser } from '../features/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import UsersLayout from '../components/chat/usersSection/UsersLayout'
import MessagesLayout from '../components/chat/messagesSection/MessagesLayout'
import { selectViewMessages } from '../features/ViewMessages/viewMessagesSlice'
function Chat() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    
    const user = useSelector(selectUser)

    const viewMessages = useSelector(selectViewMessages)

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

    <div className={` max-h-screen  overflow-x-hidden ${ viewMessages ? 'overflow-y-hidden':''} z-[2] relative `}>
        <MessagesLayout />
        <UsersLayout />
    </div>
    
    </>
    }
  </>
  )
}

export default Chat