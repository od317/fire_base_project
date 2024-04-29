import React from 'react'
import ScrollList from '../ScrollList'

function MessagesList({messages}) {
  return (
          <ScrollList top={true}>
            {messages.map((message,i)=>(
                   <label key={i} 
                   className={`text-[150%] ${i%2 ? 'self-end':''} bg-c1 my-[5%] min-w-[40%] overflow-hidden break-words max-w-[70%] rounded-md p-[4%]`} htmlFor="">{message.content}{i+1}</label>
            ))}
          </ScrollList>
  )
}

export default MessagesList