import React from 'react'
import { useDispatch } from 'react-redux'
import { searchUsers } from '../../features/usersSearch/usersSearchSlice'

function ModalForm() {
  
  const dispatch = useDispatch()

  const handleSubmit =  (e)=>{
        e.preventDefault()
        const search = e.target.search.value
        if(search.length>0)
           dispatch(searchUsers(search))
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-row text-black bg-c1 rounded-b-sm p-[2%] flex-grow'>
          <input placeholder='enter user name' name='search' className='w-[80%] placeholder:text-white text-white  p-[1%] bg-c1' type="text" />
          <button className='w-[20%] flex items-center justify-center'>
          <svg
                        viewBox="0 0 24 24"
                        fill="white"
                        height="1.5em"
                        width="1.5em">
                        <path d="M10 18a7.952 7.952 0 004.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0018 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z" />
          </svg>
          </button>
    </form>
  )
}

export default ModalForm