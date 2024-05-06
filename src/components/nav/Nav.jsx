import React,{useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { selectChatUser } from '../../features/chatUser/chatUser'
import { selectModal } from '../../features/modal/modalSlice'
import { selectScreenWidth } from '../../features/screenWidth/screenWidth'
import { selectUser } from '../../features/user/userSlice'
import UserPhoto from '../user/UserPhoto'
import UserInfo from './UserInfo'
function Nav({children}) {
    
    const user = useSelector(selectUser)

    const chatUser = useSelector(selectChatUser)

    const screenW = useSelector(selectScreenWidth)

    const modal = useSelector(selectModal)

    useEffect(()=>{
    },[])

    return (
    <>
    <nav className=' z-[10] border-b-white whitespace-nowrap  mb-[0%]
     '>
         <UserInfo user={user}></UserInfo>
         { screenW < 786 && <UserInfo user={chatUser} chat={true}></UserInfo>}
{/* 
         <div 
         style={{transform:`${ viewMessages ?  'translateX(-100%)' : ''}`}}
         className='w-[100%]  border-b-[1px] transition-all bg-red-500 duration-200 pb-[2%] justify-between  inline-block'>
               <label className=' hidden sm:block' htmlFor="">{user?.displayName||user?.name}</label> 

               <UserPhoto photo={user?.photo}/>
               <button>
               <svg
               viewBox="0 0 24 24"
               fill="currentColor"
               height="2.5em"
               width="2.5em">
                     <path d="M10 18a7.952 7.952 0 004.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0018 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z" />
               </svg>
               </button>
         </div> */}

    </nav>
    {children}
    </>
  )
}




export default Nav