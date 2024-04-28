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
    <div ref={containerRef} className={` ${view ? '':'translate-x-[150%]'} transition-all duration-200 overflow-y-scroll absolute z-[3] bg-bg1 w-full h-full`}>
      <div className=' relative'>
        <MessagesList messages={messages}/>
        <MessageInput></MessageInput>
      </div>
    </div>
  )
}

export default MessagesLayout