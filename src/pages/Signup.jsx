import React,{useEffect} from 'react'
import SingUpForm from '../components/LoginSignUp/SingUpForm'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { handleSingInForm } from '../firebase'
import {selectUser} from '../features/user/userSlice'
function SignUp() {

    const navigate = useNavigate()
    const user = useSelector(selectUser)
  
    const signIn = async (name,email,password)=>{
          try{
          console.log('starting to signUp')
          await handleSingInForm(name,email,password)
          navigate('/')
          }
          catch(err){
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
      <SingUpForm handler={signIn}/>     
    </div>
  )
}

export default SignUp