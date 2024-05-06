import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getReco, selectUsersSearch } from '../../features/usersSearch/usersSearchSlice'
import { store } from '../../store'


function UList() {


  const users = useSelector(selectUsersSearch)
  const dispatch = useDispatch()

  console.log('search usesr are ', users)

  useEffect(() => {
    dispatch(getReco())
  }, [])

  return (
    <div className=' h-[80%] max-h-[80%] overflow-y-scroll w-full'>

      {
        users.error ?
          <>
            <label htmlFor="">somthing went wrong</label>
          </>
          :
          users.pending ?
            <>
              <div>loading</div>
            </>
            :
            users.value.length > 0 ?
              <>
                {users.value.map((v, i) => (
                  <div key={v.id} className=' p-[5%] my-[5%]'>{v.name || v.displayName}</div>
                ))}
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