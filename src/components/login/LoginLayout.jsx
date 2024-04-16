import React ,{useContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import SignIn from './SignIn'
import Login from './Login'
import {auth, handleLogInForm, handleSingInForm} from '../../firebase'
import { signInWithGoogle } from '../../firebase'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../../features/user/userSlice'

export default function LoginLayout() {
  
  const navigate = useNavigate()
  const [signin,setSignin] = useState(false)  
  const [loading,setLoading] = useState(false)
  
  const user = useSelector(selectUser)
  
  const dispatch = useDispatch()


  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const handleSignInFormSubmit = async e=>{
        e.preventDefault()
        try{
        const res  = await handleSingInForm("",email,password)
        if(res.email){
           navigate('/')
        }
        }catch(err){
          console.log('err',err.message)
        }
  }

 const handleLoginFormSubmit = async e=>{
        e.preventDefault()
        try{
          const res  = await handleLogInForm(email,password)
          if(res.email){
            navigate('/')
          }
        }catch(err){
            console.log('err',err.message)
          }
  }

 const handleSignInWithGoogle = async ()=>{
      try{ 
      await signInWithGoogle()
      navigate('/')
      }catch(err){
        console.log('faild to login ')
      }
 }


  useEffect(() => {
       if(user?.name?.length>0)
         navigate('/')
  }, [])

  return (<>
        
        { user && user?.name?.length>0 ? <>logged in</> :         
          <>
              <button onClick={()=>{
                setSignin(p=>!p)
                setEmail('')
                setPassword('')     
              }}>
              {
              !signin ? <>sign in</>:
                <>login</>
              }
              </button>
              <br />

              <button onClick={()=>{
                handleSignInWithGoogle()
              }} className=''>
                sign in with google
              </button>

              { loading && <button className='animate-spin'>b</button>}

              { signin ? 
              <SignIn email={email} handleEmailChange={setEmail} password={password} handlePasswordChange={setPassword} handleSignInFromSubmit={handleSignInFormSubmit}/>:
              <Login email={email} handleEmailChange={setEmail} password={password} handlePasswordChange={setPassword} handleLoginFromSubmit={handleLoginFormSubmit}/>}
          </>}
          </>
  )
}