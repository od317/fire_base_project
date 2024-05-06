import React, { useEffect,useState} from 'react'
import { auth} from '../firebase'
import { logout, selectUser } from '../features/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import UsersLayout from '../components/chat/usersSection/UsersLayout'
import MessagesLayout from '../components/chat/messagesSection/MessagesLayout'
import { selectViewMessages } from '../features/ViewMessages/viewMessagesSlice'
import Modal from '../components/modal/Modal'
import { selectModal } from '../features/modal/modalSlice'
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
    <div className={` 
    max-h-screen  overflow-x-hidden  z-[2] relative flex-grow
    md:flex md:flex-row-reverse overflow-y-hidden w-full
    `}>
        <MessagesLayout />
        <UsersLayout />
    </div>
    
    </>
    }
  </>
  )
}

export default Chat