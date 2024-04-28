import React from 'react'
import UsersList from './UsersList'

let users = [

]

for(let i=0;i<220;i++){
    users.push(    {
      name:"name",
      lastMessage:'hello',
      date:'09:00',
      online:true,
      photo:'https://lh3.googleusercontent.com/a/ACg8ocISoJBA5MezFgycat-m33VjK6UWGrR_Q61QOU0wfLu2WQ=s96-c'
  })
}


function UsersLayout() {
  return (
    <div className='z-[1] '>
          <UsersList users={users}></UsersList>
    </div>
  )
}

export default UsersLayout