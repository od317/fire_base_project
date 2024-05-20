import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { selectChatUser } from '../../features/chatUser/chatUser'
import { changeModal } from '../../features/modal/modalSlice'
import { selectScreenWidth } from '../../features/screenWidth/screenWidth'
import { changeMessagesView, selectViewMessages } from '../../features/ViewMessages/viewMessagesSlice'
import UserPhoto from '../user/UserPhoto'
import UsersPhoto from '../user/UsersPhoto'

function UserInfo({ user, chat }) {

   const viewMessages = useSelector(selectViewMessages)
   const screenW = useSelector(selectScreenWidth)
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const chatUser = useSelector(selectChatUser)
   const [searchParams,setSearchParams] = useSearchParams()
   const chatUserId = searchParams.get('chatUser')

   return (
      <div
         // style={{ transform: `${viewMessages && screenW <768? 'translateX(-100%)' : ''}` }}
         className='w-[98%] pb-[1%] border-b-[2px] border-b-c1 relative transition-all  duration-200 max-w-screen inline-block '>
         <div className='pb-[2%] flex flex-row  justify-between
         md:justify-start md:items-center md:space-x-5 md:pb-[.2%]'>

            {!(chatUserId && chatUserId.length>0)|| screenW >= 768 ?
               <>
                  <UserPhoto photo={user?.photo} />
                  <label className=' hidden md:block ' htmlFor="">{user?.displayName || user?.name}</label>

                  <button
                  onClick={()=>{
                     dispatch(changeModal(true))
                  }}
                  >
                     <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        height="1em"
                        width="1em">
                        <path d="M10 18a7.952 7.952 0 004.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0018 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z" />
                     </svg>
                  </button>

               </>
               :
               <div className='w-[100%] flex flex-row justify-between
                 '>
                  <UserPhoto photo={chatUser?.photoUrl} />
                  <button
                     onClick={() => {
                        navigate(-1)
                     }
                     }
                  >
                     <svg
                        viewBox="0 0 512 512"
                        fill="currentColor"
                        height="2.5em"
                        width="2.5em"
                     >
                        <path d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z" />
                     </svg>
                  </button>
               </div>
            }
         </div>
      </div>
   )
}

export default UserInfo