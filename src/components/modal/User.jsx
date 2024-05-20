import React from 'react'
import { selectChatUser } from '../../features/chatUser/chatUser'
import { selectAllUsers } from '../../features/users/usersSlice'
import { useSelector } from 'react-redux'

function User({ v, addToChat }) {

    const chatUsers = useSelector(selectAllUsers)

    let inChat = false

    chatUsers.forEach((u) => {
        if (u.id === v.id)
            inChat = true
    })

    return (
        <>
            <label className="flex flex-row items-center min-w-[50%]">
            <div className='relative w-[30%] pb-[30%] mr-[5%] rounded-full bg-gray-800 bg-opacity-30
                                        '>
                    <img className='absolute rounded-full min-w-full min-h-full'
                        src={v?.photoUrl ? v.photoUrl : 'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg'} alt="" />

                </div>
                <label htmlFor="">
                    {v.name || v.displayName}
                </label>
            </label>
            {
                (!inChat) ?
                    <>
                        <button onClick={() => addToChat(v.id)} className='bg-c1 p-[2%] h-fit flex items-center rounded-md'>add to chat</button>
                    </>
                    :
                    <>
                        <label htmlFor="" className='bg-white text-black p-[2%] flex h-fit items-center rounded-md'>in chat</label>
                    </>
            }
        </>
    )
}

export default User