import {Routes,Route,Link, BrowserRouter, useLocation} from 'react-router-dom'
import { useRef, useState,useEffect } from 'react'
import { getAnalytics } from "firebase/analytics"
import Home from './pages/Home'
import Login from './pages/Login'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import {userContext} from './context/userContext'


export default function App(){
  const [user,setUser] = useState(null)
  useEffect(() => {
    const auth = getAuth()
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
    return () => unsubscribe()
   },[])

    return(<>
          <userContext.Provider value={user}>
           <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/login' element={<Login/>}/>
           </Routes>
           </userContext.Provider>
    </>)
}