import React ,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import SignIn from './SignIn'
import Login from './Login'
import {auth} from '../../firebase'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"

export default function LoginLayout() {
  
  const navigate = useNavigate()
  const [signin,setSignin] = useState(false)  
  const [loading,setLoading] = useState(false)

  const handleSignInFormSubmit =  e=>{

  }

  const handleLoginFormSubmit =   e=>{
  }

  const signInWithGoogle = async () => {
        const auth = getAuth()
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth,provider).then(res=>{
          console.log('singed in and user is:',res.user)
          navigate('/')
        }).catch(err=>{
          console.log("error",err.message)
        })
  }

  useEffect(() => {

  }, [])

  return (
          <>
              <button onClick={()=>{
                setSignin(p=>!p)     
              }}>
              {
              !signin ? <>sign in</>:
                <>login</>
              }
              </button>
              <br />

              <button onClick={()=>{
                signInWithGoogle()
              }} className=''>
                sign in with google
              </button>

              { loading && <button className='animate-spin'>b</button>}

              { signin ? 
              <SignIn handleSignInFromSubmit={handleSignInFormSubmit}/>:
              <Login handleLoginFromSubmit={handleLoginFormSubmit}/>}
          </>
  )
}