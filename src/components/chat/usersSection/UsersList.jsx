import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeChatUser, changeUser, selectChatUser } from '../../../features/chatUser/chatUser'
import { selectUser } from '../../../features/user/userSlice'
import { selectAllUsers } from '../../../features/users/usersSlice'
import { changeMessagesView } from '../../../features/ViewMessages/viewMessagesSlice'
import UsersPhoto from '../../user/UsersPhoto'
import ScrollList from '../ScrollList'

function UsersList() {

  const dispatch = useDispatch()

  const user = useSelector(selectUser)

  const users = useSelector(selectAllUsers)

  const chatUser = useSelector(selectChatUser)


  useEffect(() => {
    if (users.length > 0 && !chatUser) {
      dispatch(changeChatUser(users[0]))
    }
  }, [users])

  return (
    <ScrollList>
      {users.map((item, i) => {
        if (item.id !== user?.uid)
          return (
            <div key={i} className='w-full'>
              <div onClick={() => {
                dispatch(changeMessagesView(true))
                dispatch(changeUser(item))
              }}
                className={`flex flex-row p-[2%] my-[3%] 
        ${chatUser?.id === item?.id ? 'bg-opacity-[50%]' : 'hover:bg-opacity-[20%]'}  
         bg-opacity-0 bg-zinc-900  transition-all  duration-200  cursor-pointer rounded-md`}>
                <UsersPhoto photo={item.photo || item.photoUrl} status={item.online} />
                <div className='flex flex-col flex-grow px-[2%] items-start justify-start'>
                  <p className='font-bold text-[120%]
                                     md:text-[100%]'>{item.name}</p>
                  <p className='text-gray-300
                                       md:text-[90%]'>{item.lastMessage}</p>
                </div>
                <label htmlFor="">{item.date}</label>
              </div>
            </div>)
      })
      }
    </ScrollList>
  )
}

export default UsersList