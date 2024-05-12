import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { changeUName, selectUser } from '../../features/user/userSlice'
import { chagnePassWord, changeName, isSignedInWithGoogle } from '../../firebase'
import UserPhoto from '../user/UserPhoto'
import Form from './Form'
import PhotoChange from './PhotoChange'

function SettingsLayout() {

    const user = useSelector(selectUser)
    const dispatch = useDispatch()


    const [message, setMessage] = useState('')
    const [nameLoading, setNameLoading] = useState(false)
    const [passwordLoading, setPasswordLoading] = useState(false)


    const changeNameSubmit = async (e) => {
        if (nameLoading)
            return
        e.preventDefault()
        let name = e.target.input1.value
        if (name.length > 0) {
            setNameLoading(true)
            let res = await changeName(name)
            if (res) {
                dispatch(changeUName(name))
                setMessage('name changed successfully')
            }
            setMessage('somthing went wrong')
            setNameLoading(false)
        }
        else
            setMessage('invalid name')
    }

    const changePasswordSubmit = async (e) => {
        if (passwordLoading)
            return
        e.preventDefault()
        setPasswordLoading(true)

        let p1 = e.target.input1.value
        let p2 = e.target.input2.value
        let p3 = e.target.input3.value
        console.log(p1, p2, p3)

        if (p1.length === 0 || p2.length === 0 || p3.length === 0) {
            setMessage('all fields are required')
            return
        }

        if (p2 !== p3) {
            setMessage('Confirmed password dont match new password')
            return
        }

        const res = await chagnePassWord(p1, p2)
        setMessage(res)
        setPasswordLoading(false)

    }

    return (
        <div className=' '>
            <NavButton />

            <div className='flex flex-col pt-[5%] items-center justify-center'>
                <div className='relative w-[30%] pb-[30%] rounded-full bg-gray-800 bg-opacity-30
                                        md:w-[6%] md:pb-[6%]'>
                    <img className='absolute rounded-full w-full h-full'
                        src={user?.photo ? user.photo : 'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg'} alt="" />

                </div>

                <label className='mt-[1%]' htmlFor="">{user?.name || user?.displayName}</label>
            </div>


            <div className='px-[2%] md:flex md:flex-row md:items-start justify-between'>


                <PhotoChange setMessage={setMessage}></PhotoChange>


                <Form key={'name'} loading={nameLoading} name={'name'} type={'text'} handleSubmit={changeNameSubmit}></Form>

                {!user?.google && <Form name={'password'} loading={passwordLoading} type={'password'} handleSubmit={changePasswordSubmit}></Form>}
            </div>
            <label className='p-[1%]' htmlFor="">{message}</label>
        </div>
    )
}


function NavButton() {
    const navigate = useNavigate()
    return (
        <button
            onClick={() => {
                navigate('/')
            }}
            className='p-[1%] fixed' to='/'>
            <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                height="3rem"
                width="3rem"
            >
                <path d="M12.707 17.293L8.414 13H18v-2H8.414l4.293-4.293-1.414-1.414L4.586 12l6.707 6.707z" />
            </svg>
        </button>
    )
}

export default SettingsLayout