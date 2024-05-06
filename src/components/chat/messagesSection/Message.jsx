import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectChatUser } from '../../../features/chatUser/chatUser'
import { removeMessage } from '../../../features/Messages/MessagesSlice'
import { selectUser } from '../../../features/user/userSlice'
import UsersPhoto from '../../user/UsersPhoto'

function Message({ message }) {

  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const chatUser = useSelector(selectChatUser)
  const [over, setOver] = useState(false)

  const deleteMessage = async () => {
    dispatch(removeMessage(message.id))
  }

  return (
    <>
      <div
        onMouseOver={() => {
          setOver(true)
        }}
        onMouseLeave={() => {
          setOver(false)
        }}
        className={`
      text-[150%] ${message.senderId === user.uid ? 'self-end bg-zinc-600' : 'bg-c1'} 
      opacity-1 transition-all duration-200
      my-[5%]   break-words max-w-[70%] rounded-md p-[4%]
      md:text-[100%] md:max-w-[40%] min-w-[1%] w-fit md:my-[2%] md:p-[1.2%] relative`} htmlFor="">
        {message.senderId === user.uid &&
          <div className={` scale-0 translate-y-[-20%] py-[2%] transition-all duration-200 origin-center ${over ? 'scale-100' : ''} pr-[.1rem] translate-x-[-140%] h-full max-w-[100%] absolute flex flex-col `}>
            <button onClick={deleteMessage} className='w-full  ' htmlFor="">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                viewBox="0 0 24 24"
                height="1.5rem"
                width="1.5rem"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <path d="M4 7h16M5 7l1 12a2 2 0 002 2h8a2 2 0 002-2l1-12M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3M10 12l4 4m0-4l-4 4" />
              </svg>
            </button>
          </div>
        }

        <label className={`  `} htmlFor="">
          {message.content}
        </label>

      </div>
    </>
  )
}

export default Message