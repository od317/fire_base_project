import React,{useEffect,useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeMessagesView, selectViewMessages } from '../../../features/ViewMessages/viewMessagesSlice'
import MessageInput from './MessageInput'
import MessagesList from './MessagesList'

const messages = [
]

for(let i=0;i<20;i++){
    messages.push({
      content:'hello who are you addndnsandiwandias asdasdqwewqdasdqweqwe safwetrwer',
      date:'09:00'
    })
}

function MessagesLayout({}) {

  const dispatch = useDispatch()
  const view = useSelector(selectViewMessages)

  const containerRef = useRef(null)

  useEffect(() => {
    if (containerRef.current && top ) {
         containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  },)

  return (
    <div ref={containerRef} className={` ${view ? '':'translate-x-[150%]'}  fixed flex flex-col transition-all duration-200 overflow-y-scroll w-[96%] pr-[4%] z-[3] bg-bg1  h-[95vh] `}>
          <MessagesList messages={messages}/>
      <MessageInput></MessageInput>
    </div>
  )
}

export default MessagesLayout