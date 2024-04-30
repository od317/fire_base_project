import React,{useEffect,useRef, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addMessage } from '../../../features/Messages/MessagesSlice'
import { changeMessagesView, selectViewMessages } from '../../../features/ViewMessages/viewMessagesSlice'
import MessageInput from './MessageInput'
import MessagesList from './MessagesList'



function MessagesLayout({}) {


  const dispatch = useDispatch()
  const view = useSelector(selectViewMessages)

  const containerRef = useRef(null)

  const SendingMessage = (message)=>{
        dispatch(addMessage(message))
  }

  useEffect(() => {
    if (containerRef.current && top ) {
         containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  },)

  return (
    <div ref={containerRef} className={` ${view ? '':'translate-x-[150%]'}  fixed flex flex-col transition-all duration-200 overflow-y-scroll w-[96%] pr-[4%] z-[3] bg-bg1  h-[95vh] `}>
          <MessagesList />
          <MessageInput handleSendingMessage={SendingMessage} ></MessageInput>
    </div>
  )
}

export default MessagesLayout