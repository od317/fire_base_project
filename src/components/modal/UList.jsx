import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../../features/user/userSlice'
import { selectAllUsers } from '../../features/users/usersSlice'
import { getReco, selectUsersSearch } from '../../features/usersSearch/usersSearchSlice'
import { addFriend, auth } from '../../firebase'
import { store } from '../../store'
import MainLoading from '../Loading/MainLoading'


function UList() {

  const users = useSelector(selectUsersSearch)

  const chatUsers = useSelector(selectAllUsers)

  const user = useSelector(selectUser)

  const dispatch = useDispatch()
  
  const addToChat = async (id)=>{
        await addFriend(user.uid,id)
  }

  const checkId = async (id)=>{
        var res = false
        if(chatUsers && chatUsers.length>0)
        await chatUsers.forEach((doc)=>{
          if(doc.id === id){
            res=true
          }
        })
        console.log(id,res)
        return res
  }

  useEffect(() => {
    dispatch(getReco())
  }, [])

  return (
    <div className=' h-[80%] max-h-[80%] p-[%] overflow-y-scroll '>

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
                  return(
                  <div key={v.id} className='flex flex-row justify-between p-[5%] my-[5%]'>
                    <label htmlFor="">
                      {v.name || v.displayName}
                    </label>
                    {(v.id !== user.uid && checkId(v.id) ) &&
                    <button onClick={()=>addToChat(v.id)} className='bg-c2 p-[1%] rounded-md'>add to chat</button>
                    }
                    </div>
                )})}
              </>
              :
              <>
                <label htmlFor="">no users found</label>
              </>
      }

    </div>
  )
}

export default UList