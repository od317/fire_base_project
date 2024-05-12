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

    const [message,setMessage] = useState('')
    const [nameLoading, setNameLoading] = useState(false)
    const [passwordLoading, setPasswordLoading] = useState(false)
    const [photoLoading, setPhotoLoading] = useState(false)


    const changeNameSubmit = async (e) => {
        if (nameLoading)
            return
        e.preventDefault()
        let name = e.target.input1.value
        if (name.length > 0) {
            setNameLoading(true)
            let res = await changeName(name)
            if (res){
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
        if (nameLoading)
            return
        e.preventDefault()
      
        let p1 = e.target.input1.value
        let p2 = e.target.input2.value
        let p3 = e.target.input3.value
        console.log(p1,p2,p3)

        if(p1.length === 0 || p2.length === 0 || p3.length === 0){
           setMessage('all fields are required')
           return
        }

        if(p2 !== p3){
           setMessage('confirm password donst match new password')
           return
        }

        chagnePassWord(p1,p2)
    
    }

    return (
        <div className=''>
            <NavButton />

            <div className='flex flex-col pt-[5%] items-center justify-center'>
                <UserPhoto photo={user?.photo} />
                <label className='mt-[1%]' htmlFor="">{user?.name || user?.displayName}</label>
            </div>

            <PhotoChange></PhotoChange>

            <div className='px-[2%]'>

                <Form key={'name'} loading={nameLoading} name={'name'} type={'text'} handleSubmit={changeNameSubmit}></Form>
                
                { !user?.google && <Form name={'password'} loading={passwordLoading} type={'password'} handleSubmit={changePasswordSubmit}></Form>}
                {message}
            </div>

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