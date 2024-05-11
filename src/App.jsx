import {Routes,Route,Link, BrowserRouter, useLocation, useNavigate} from 'react-router-dom'
import { useRef, useState,useEffect } from 'react'
import app,{addUserToDb, auth, changeOnlineStatus, isSignedInWithGoogle} from './firebase'
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
import { changeWidth, selectScreenWidth } from './features/screenWidth/screenWidth'
import Settings from './pages/Settings'

export default function App(){
  
  const [loadingForUser,setLoadingForUser] = useState(true)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const currentUser = useSelector(selectUser)
  const screenWidth = useSelector(selectScreenWidth)

  const theme = useSelector(selectTheme)

  const revertTheme = ()=>{
        dispatch(changeTheme())
  }

  useEffect(() => {
    setLoadingForUser(true)
    
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if(user){
      
        await addUserToDb(user)

        dispatch(login({
          name:user.displayName || user.name,
          email:user.email,
          uid:user.uid,
          photo:user.photoURL,
          google:isSignedInWithGoogle()
        }))
      
        console.log('logged in user is',user)

        await changeOnlineStatus(user,true)

        // navigate('/')

      }
      
      else{
         navigate('/login')
         dispatch(logout())
        }
      setLoadingForUser(false)

    })

    const pageLeave = async ()=>{
          await changeOnlineStatus(auth.currentUser,false)
    }

    window.addEventListener('beforeunload',pageLeave)
    
    return () => {
      window.removeEventListener('beforeunload',pageLeave)
      unsubscribe()
    }
 
  },[])


  useEffect(()=>{
    
    const changeSW = ()=>{
          dispatch(changeWidth())
    }
    window.addEventListener('resize',changeSW)

    return()=>{
      window.removeEventListener('resize',changeSW)
    }

  },[screenWidth])


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

          <div className={` bg-bg1 min-h-screen  max-h-screen overflow-y-hidden max-w-screen  overflow-x-hidden  text-white`}>
            {loadingForUser ? <MainLoading/>:
                              <>
                              <Routes>
                                <Route path='/' element={
                                <LoggedInLayout>
                                  <Chat></Chat>
                                </LoggedInLayout>
                                }></Route>
                                <Route path='/settings' element={
                                  <Settings></Settings>
                                }>
                                </Route>
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