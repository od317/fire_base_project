import React ,{useEffect, useState} from 'react'
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../../firebase"
import { useNavigate } from 'react-router-dom'
import SignIn from './SignIn'
import Login from './Login'
import { useAuthState } from "react-firebase-hooks/auth"

export default function LoginLayout() {
  
  const navigate = useNavigate()
  const [signin,setSignin] = useState(false)
  const [user, loading, error] = useAuthState(auth)

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