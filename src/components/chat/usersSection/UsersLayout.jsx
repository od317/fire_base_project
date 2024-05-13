import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers, selectAllUsers } from '../../../features/users/usersSlice'
import UsersList from './UsersList'
import { store } from '../../../store'
import { db,collection, auth} from '../../../firebase'
import { onSnapshot, or, query, where } from 'firebase/firestore'
import UsersLoading from '../../Loading/UsersLoading'

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
    const id = auth.currentUser.uid
    const connectionsRef = collection(db, 'connections')
    const q = query(connectionsRef,
      or(
        where('u1', '==', id),
        where('u2', '==', id)
      ))
    const unsubscribe = onSnapshot(q, async (snapshot) => {
      
      console.log('users changed')
      dispatch(fetchUsers())

    })

    return () => unsubscribe()

  }, [dispatch])

  useEffect(() => {
    const q = query(collection(db, 'users'),auth.currentUser.uid)
    const unsubscribe = onSnapshot(q, async (snapshot) => {
      
      console.log('users changed')
      dispatch(fetchUsers())

    })

    return () => unsubscribe()

  }, [dispatch])

  return (
    <>
      { 
      users.length>0 ?
      <UsersList></UsersList>:
      <UsersLoading/>
      }
    </>
  )
}

export default UsersLayout