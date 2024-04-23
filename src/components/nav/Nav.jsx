import React,{useEffect} from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/user/userSlice'

function Nav({children}) {
    
    const user = useSelector(selectUser)

    useEffect(()=>{
         console.log('iserss',user)
    },[])

    return (
    <>
    <nav className=''>
         <div className='w-[100%] border-b-[1px] pb-[2%] justify-between border-b-white flex flex-row'>
               <label className=' hidden sm:block' htmlFor="">{user.displayName||user.name}</label> 
               <img className='rounded-full w-[15%]' src={user.photo} alt="" />
               <button>
               <svg
               viewBox="0 0 24 24"
               fill="currentColor"
               height="2.5em"
               width="2.5em">
                     <path d="M10 18a7.952 7.952 0 004.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0018 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z" />
               </svg>
               </button>
         </div>
    </nav>
    {children}
    </>
  )
}

export default Nav