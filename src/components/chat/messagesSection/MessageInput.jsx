import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectViewMessages } from '../../../features/ViewMessages/viewMessagesSlice'
import { useAutosizeTextArea } from './useAutosizeTextArea'

function MessageInput({handleSendingMessage}) {
 
  const [message,setMessage] = useState('')
  const ref = useRef()

  const view = useSelector(selectViewMessages)

  const sendMessage = ()=>{
        handleSendingMessage({
          content:message,
          date:'09:00',
        })
  }

  useAutosizeTextArea(ref.current,message)


  return (
    <div className=' translate-y-[-100%] relative h-[9%] z-[5] text-[110%] bg-bg1 bottom-0  w-[100%] py-[2%] transition-all'>
        <div className='w-full  text-black flex absolute items-center justify-center  h-full flex-row'>
                <textarea className='max-h-[5rem] min-h-[3rem] bg-c3  text-[120%] w-[80%]' ref={ref} name="" value={message} onChange={(e)=>{
                  setMessage(e.target.value)
                }} id="" cols="30"></textarea>
                <button onClick={sendMessage} className='w-[20%] flex items-center  justify-center'>
                <svg
                  viewBox="0 0 1024 1024"
                  fill="#DFF5FF"
                  height="2em"
                  width="2em"
                >
                      <defs>
                        <style />
                      </defs>
                      <path d="M931.4 498.9L94.9 79.5c-3.4-1.7-7.3-2.1-11-1.2-8.5 2.1-13.8 10.7-11.7 19.3l86.2 352.2c1.3 5.3 5.2 9.6 10.4 11.3l147.7 50.7-147.6 50.7c-5.2 1.8-9.1 6-10.3 11.3L72.2 926.5c-.9 3.7-.5 7.6 1.2 10.9 3.9 7.9 13.5 11.1 21.5 7.2l836.5-417c3.1-1.5 5.6-4.1 7.2-7.1 3.9-8 .7-17.6-7.2-21.6zM170.8 826.3l50.3-205.6 295.2-101.3c2.3-.8 4.2-2.6 5-5 1.4-4.2-.8-8.7-5-10.2L221.1 403 171 198.2l628 314.9-628.2 313.2z" />
                </svg>
                </button>
        </div>
    </div>
  )
}

export default MessageInput