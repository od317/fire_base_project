import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeMessage, selectMessages } from '../../../features/Messages/MessagesSlice'
import ScrollList from '../ScrollList'
import Message from './Message'

function MessagesList() {

  const dispatch = useDispatch()
  const messages = useSelector(selectMessages)
 
  

  return (
    <ScrollList top={true}>
        {messages.map((message, i) => (
          <label onClick={()=>{
            dispatch(removeMessage(message))
          }} key={i}
            className={`text-[150%] ${i % 2 || message.from ? 'self-end' : ''} opacity-1 transition-all duration-200 bg-c1 my-[5%] min-w-[40%] overflow-hidden break-words max-w-[70%] rounded-md p-[4%]`} htmlFor="">{message.content}{i + 1}</label>
        ))}
        {/* {messages.map((message, i) => (
          <label key={-i}
            style={{ transform: `translateY(${-(n - 1 - i) * 100}%)` }}
            className={`text-[150%] ${i % 2 || message.from ? 'self-end' : ''} opacity-1 transition-all duration-200 absolute bg-c1 my-[5%] min-w-[40%] overflow-hidden break-words max-w-[70%] rounded-md p-[4%]`} htmlFor="">{message.content}{i + 1}</label>
        ))} */}
    </ScrollList>
  )
}

export default MessagesList