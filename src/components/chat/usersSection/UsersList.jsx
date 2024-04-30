import React from 'react'
import { useDispatch } from 'react-redux'
import { changeMessagesView } from '../../../features/ViewMessages/viewMessagesSlice'
import UsersPhoto from '../../user/UsersPhoto'
import ScrollList from '../ScrollList'

function UsersList({users}) {
  
  const dispatch = useDispatch()

  

  return (
        <ScrollList>
          {users.map((item,i)=>
          (<div key={i} onClick={()=>{
                dispatch(changeMessagesView(true))              
          }} className='flex flex-row w-full my-[5%] '>
                  <UsersPhoto photo={item.photo} status={true}/>
                  <div className='flex flex-col flex-grow px-[2%] items-start justify-start'>
                       <p className='font-bold text-[120%]'>{item.name}{i+1}</p>
                       <p className='text-gray-300'>{item.lastMessage}</p>
                  </div>
                  <label htmlFor="">{item.date}</label>
           </div>))}
        </ScrollList>   
  )
}

export default UsersList