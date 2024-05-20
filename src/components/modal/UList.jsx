import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../../features/user/userSlice'
import { selectAllUsers } from '../../features/users/usersSlice'
import { getReco, selectUsersSearch } from '../../features/usersSearch/usersSearchSlice'
import { addFriend, auth } from '../../firebase'
import User from './User'
import { store } from '../../store'
import MainLoading from '../Loading/MainLoading'
import { async } from '@firebase/util'


function UList() {

  let users = useSelector(selectUsersSearch)
  const user = useSelector(selectUser)

  const dispatch = useDispatch()

  const addToChat = async (id) => {
    await addFriend(user.uid, id)
  }


  useEffect(() => {
    dispatch(getReco())
  }, [])


  return (
    <div className=' h-[80%] max-h-[80%] scroll  overflow-y-scroll '>

      {
        users.error ?
          <>
            <label htmlFor="">somthing went wrong</label>
          </>
          :
          users.pending ?
            <>
              <MainLoading></MainLoading>
            </>
            :
            users.value.length > 0 ?
              <>
                {users.value.map((v, i) => {
                  return (
                    <div key={v.id} className='flex flex-row justify-between p-[5%] my-[5%]'>
                      <User v={v} addToChat={addToChat}></User>
                    </div>
                  )
                })}
              </>
              :
              <>
                <label className='p-[4%]' htmlFor="">no users found</label>
              </>
      }

    </div>
  )
}

export default UList