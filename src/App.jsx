import {Routes,Route,Link, BrowserRouter, useLocation, useNavigate} from 'react-router-dom'
import { useRef, useState,useEffect } from 'react'
import app,{auth} from './firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { getRedirectResult } from 'firebase/auth'
import { showMessages,db,collection } from './firebase'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { login,logout, selectUser } from './features/user/userSlice'
import Chat from './pages/Chat'
import { changeTheme, selectTheme } from './features/Theme/themeSlice'
import MainLoading from './components/Loading/MainLoading'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import PasswordReset from './components/LoginSignUp/PasswordReset'
import Nav from './components/nav/Nav'
import LoggedInLayout from './components/LoggedInLayout'

export default function App(){
  
  const [loadingForUser,setLoadingForUser] = useState(true)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const currentUser = useSelector(selectUser)

  const theme = useSelector(selectTheme)

  const revertTheme = ()=>{
        dispatch(changeTheme())
  }

  useEffect(() => {
    setLoadingForUser(true)
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if(user){
        dispatch(login({
          name:user.displayName ? user.displayName : '',
          email:user.email,
          uid:user.uid,
          photo:user.photoURL
        }))
      }
      else{
         navigate('/login')
         dispatch(logout())
      }
      setLoadingForUser(false)
    })

    return () => unsubscribe()
   },[])

  
   useEffect(()=>{
     console.log(('currrrent',currentUser))
   },[currentUser])


    return(<>
          {/* ${theme ? 'bg-black text-white': 'bg-white text-black'} */}
          {/* <div className={` bg-bg1 min-h-screen text-white`}>
            {loadingForUser ? <MainLoading/>:
                              currentUser ?
                              <>
                              <Routes>
                                <Route path='/' element={<Chat></Chat>}></Route>
                              </Routes>
                              </>
                              :
                              <LoginSign></LoginSign>}
          </div> */}

          <div className={` bg-bg1 min-h-screen  max-h-screen overflow-y-hidden max-w-screen px-[2%] overflow-x-hidden  text-white`}>
            {loadingForUser ? <MainLoading/>:
                              <>
                              <Routes>
                                <Route path='/' element={
                                <LoggedInLayout>
                                  <Chat></Chat>
                                </LoggedInLayout>
                                }></Route>
                                <Route path='/login'>
                                  <Route path='' element={<Login/>}></Route>
                                  <Route path='resetPass' element={<PasswordReset/>}></Route>
                                </Route>
                                <Route path='/signup' element={<SignUp/>}></Route>
                              </Routes>
                              </>
                              }
          </div>

    </>)
}