import React , {useEffect} from 'react'
import LoginForm from '../components/LoginSignUp/LoginForm'
import { useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { handleLogInForm } from '../firebase'
import {selectUser} from '../features/user/userSlice'

function Login() {
   
    const navigate = useNavigate()
    const user = useSelector(selectUser)

   
    const logIn = async (email,password)=>{
        try{
          console.log('starting to login')
          await handleLogInForm(email,password)
          navigate('/')
        }catch(err){
          console.log(err)
        }
    }

    useEffect(()=>{
         if(user)
           navigate('/')
    },[])

  return (
    <div className='flex flex-col min-h-screen items-center justify-center w-full'>  
      <h1 className='text-[200%] sm:text-[150%] sm:mt-[2%]'>Chat App</h1>
      <LoginForm handler={logIn}/>     
    </div>
    )
}

export default Login