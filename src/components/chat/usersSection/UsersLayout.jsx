import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers, selectAllUsers } from '../../../features/users/usersSlice'
import UsersList from './UsersList'
import { store } from '../../../store'
import { db,collection} from '../../../firebase'
import { onSnapshot, query, where } from 'firebase/firestore'

store.dispatch(fetchUsers())

// let users = [

// ]

// for(let i=0;i<220;i++){
//     users.push(    {
//       name:"name",
//       lastMessage:'hello',
//       date:'09:00',
//       online:true,
//       photo:'https://lh3.googleusercontent.com/a/ACg8ocISoJBA5MezFgycat-m33VjK6UWGrR_Q61QOU0wfLu2WQ=s96-c'
//   })
// }


function UsersLayout() {

  const dispatch = useDispatch()
  const users = useSelector(selectAllUsers)

  console.log('osdamd',users)
  useEffect(() => {
    const q = query(collection(db, 'users'))
    const unsubscribe = onSnapshot(q, async (snapshot) => {
      
      console.log('users changed')
      dispatch(fetchUsers())

    })

    return () => unsubscribe()

  }, [dispatch])

  return (
      <UsersList></UsersList>
  )
}

export default UsersLayout