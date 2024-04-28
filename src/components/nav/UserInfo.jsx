import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeMessagesView, selectViewMessages } from '../../features/ViewMessages/viewMessagesSlice'
import UserPhoto from '../user/UserPhoto'

function UserInfo({user,chat}) {

  const viewMessages = useSelector(selectViewMessages)
  const dispatch = useDispatch()


  return (
        <div 
         style={{transform:`${ viewMessages ?  'translateX(-100%)' : ''}`}}
         className='w-[100%] border-b-[1px] transition-all duration-200  inline-block'>
            <div className='pb-[2%] flex flex-row  justify-between'>
               <label className=' hidden sm:block' htmlFor="">{user?.displayName||user?.name}</label> 

               <UserPhoto photo={user?.photo}/>

            { !chat ?               
               <button>
                <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                height="2.5em"
                width="2.5em">
                        <path d="M10 18a7.952 7.952 0 004.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0018 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z" />
                </svg>
               </button>
               :
               <button
                onClick={()=>{
                    dispatch(changeMessagesView(false))
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
               }
            </div>
         </div>
  )
}

export default UserInfo