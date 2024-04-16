import {Routes,Route,Link, BrowserRouter, useLocation} from 'react-router-dom'
import { useRef, useState,useEffect } from 'react'
import Home from './pages/Home'
import Login from './pages/Login'
import app,{auth} from './firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { getRedirectResult } from 'firebase/auth'
import { showMessages } from './firebase'
import Meassage from './pages/Meassage'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { login,logout } from './features/user/userSlice'

export default function App(){
  
  const [loadingForUser,setLoadingForUser] = useState(true)
  
  const dispatch = useDispatch()

  useEffect(() => {
    
    setLoadingForUser(true)
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if(user){
        dispatch(login({
          name:user.displayName ? user.displayName : '',
          email:user.email,
          uid:user.uid
        }))
      }
      else{
         dispatch(logout())
      }
      setLoadingForUser(false)
    })

    return () => unsubscribe()
   },[])



    return(<>
            {loadingForUser ? <label>loading for user</label>:
                              <Routes>
                                  <Route path='/' element={<Home/>}/>
                                  <Route path='/login' element={<Login/>}/>
                                  <Route path='/message/:id' element={<Meassage/>}/>
                              </Routes>}
    </>)
}