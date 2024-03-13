import {Routes,Route,Link, BrowserRouter, useLocation} from 'react-router-dom'
import { useRef, useState,useEffect } from 'react'
import Home from './pages/Home'
import Login from './pages/Login'
import {userContext,loadingForUserContext} from './context/userContext'
import app,{auth} from './firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { getRedirectResult } from 'firebase/auth'

export default function App(){
  
  const [user,setUser] = useState(null)
  const [loadingForUser,setLoadingForUser] = useState(true)
  
  useEffect(() => {
    setLoadingForUser(true)
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if(user){
        console.log('user loged in !!',user)
      }
      setUser(user)
      setLoadingForUser(false)
    })
    return () => unsubscribe()
   },[])

    return(<>
          <userContext.Provider value={user}>
            <loadingForUserContext.Provider value={loadingForUser}>
            { loadingForUser ? <div>loading</div> :             
              <Routes>
                  <Route path='/' element={<Home/>}/>
                  <Route path='/login' element={<Login/>}/>
              </Routes>
            }
           </loadingForUserContext.Provider>
           </userContext.Provider>
    </>)
}