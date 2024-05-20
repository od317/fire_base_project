import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectChatUser } from '../../../features/chatUser/chatUser'
import { addMessage, changeMessages, changeMessagesStatus, getMessages, selectMessages, selectMessagesStatus, sendMessage } from '../../../features/Messages/MessagesSlice'
import { changeMessagesView, selectViewMessages } from '../../../features/ViewMessages/viewMessagesSlice'
import { collection, query, where, onSnapshot, or, orderBy, and } from 'firebase/firestore'
import { changeOnlineStatus, db } from '../../../firebase'
import { auth } from '../../../firebase'
import MessageInput from './MessageInput'
import MessagesList from './MessagesList'
import { selectUser } from '../../../features/user/userSlice'
import MessagesLoading from '../../Loading/MessagesLoading'



function MessagesLayout({ }) {


  const dispatch = useDispatch()
  const view = useSelector(selectViewMessages)

  const user = useSelector(selectUser)
  const chatUser = useSelector(selectChatUser)

  const messages = useSelector(selectMessages)
  const messagesStatus = useSelector(selectMessagesStatus)


  const containerRef = useRef(null)

  const SendingMessage = (message) => {
    dispatch(sendMessage({
      content: message.content,
      senderId: auth.currentUser.uid,
      receiverId: chatUser.id
    }))
  }

  useEffect(() => {
    if (containerRef.current && top) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  })

  useEffect(() => {
    
    let unsubscribe
    if(chatUser && user){
    const q = query(collection(db, 'messages'),
    and(
      or(
        where('senderId', '==', user?.uid),
        where('receiverId', '==', user?.uid),
      ),
      or(
        where('senderId', '==', chatUser?.id),
        where('receiverId', '==', chatUser?.id),
      ),
      ),
        orderBy('createdAt', 'asc')
      )

    unsubscribe = onSnapshot(q, (snapshot) => {
      const newMessages = snapshot.docs.map((doc) => {
        let m ={
          id: doc.id,
          ...doc.data()
        }
        m.createdAt = doc.data().createdAt?.toDate()?.toLocaleString()
        return m
      })
      dispatch(changeMessages(newMessages))
    })
    }
    else
       unsubscribe = ()=>{

       }
    return () => {
      unsubscribe()
    }

  }, [user, chatUser])

  useEffect(() => {
    if (chatUser) {
      dispatch(changeMessagesStatus(true))
      dispatch(getMessages(chatUser.id || chatUser.uid))
    }
  }, [chatUser])

  return (
    <div ref={containerRef} className={` 
    ${view ? '' : 'translate-x-[150%]'}  fixed flex flex-col transition-all duration-200 overflow-hidden w-[96%] pr-[4%] z-[3] bg-bg1  h-[95vh] 
     md:translate-x-[0%] md:w-[75%] md:relative md:pr-[0%] md:h-auto
    `}>
      {
       !messagesStatus?
      <>
      {
      messages.length>0?
      <MessagesList />
      :
      <label className='flex flex-col items-center justify-center w-full h-full'>start a chat by sending a message</label>
      }

      <MessageInput handleSendingMessage={SendingMessage} ></MessageInput>
      </>
      :
      <MessagesLoading></MessagesLoading>
      }
      </div>
  )
}

export default MessagesLayout