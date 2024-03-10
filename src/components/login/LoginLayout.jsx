import React ,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import SignIn from './SignIn'
import Login from './Login'
import {auth} from '../../firebase'
import { signInWithGoogle } from '../../firebase'
export default function LoginLayout() {
  
  const navigate = useNavigate()
  const [signin,setSignin] = useState(false)  
  const [loading,setLoading] = useState(false)

  const handleSignInFormSubmit =  e=>{

  }

  const handleLoginFormSubmit =   e=>{
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
                if(signInWithGoogle()){
                  navigate('/')
                }
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