import React ,{useEffect, useState} from 'react'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,onAuthStateChanged} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import SignIn from './SignIn'
import Login from './Login'
export default function LoginLayout() {
  const navigate = useNavigate()
  const [signin,setSignin] = useState(false)

  const handleSignInFromSubmit = async e=>{
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        try{
            const auth = getAuth()
            await createUserWithEmailAndPassword(auth,email,password)
        }catch(err){
          console.error('Error registering user:', err.message)
        }
  }

  const handleLoginFromSubmit = async e=>{
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value
    try {
      const auth = getAuth()
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      console.error('Error logging in:', error.message)
    }
}

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user)
        // User is signed in
        navigate('/') // Redirect to dashboard
      } else {
        // No user is signed in
        navigate('/login') // Redirect to login page
      }
    })
    return unsubscribe
  }, [])

  return (
          <>
          <button onClick={()=>{
            setSignin(p=>!p)     
          }}>
            { signin ? <>sign in</>:
              <>login</>}
              </button>
              { signin ? 
              <SignIn handleSignInFromSubmit={handleSignInFromSubmit}/>:
              <Login handleLoginFromSubmit={handleLoginFromSubmit}/>}
          </>
  )
}