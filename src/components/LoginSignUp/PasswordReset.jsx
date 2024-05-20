import React,{useState} from 'react'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../../firebase'
import { NavLink } from 'react-router-dom'
function PasswordReset({}) {
    const [err,setError] = useState(false)
  
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
  
    const handleSubmit = async (e)=>{
          e.preventDefault()
  
          if(email.length<=0){
              setError('invalid email')
              return
          }
          try{
          setError(null)
          const res = await sendPasswordResetEmail(auth,email)
          console.log('password reseted succussfully',res)
          }catch(err){
            console.log('err',err)
          }
        }

    return (
    <>
   <div className='flex flex-col min-h-screen items-center justify-center w-full'>  
    <h1 className='text-[200%] sm:text-[150%] sm:mt-[2%]'>Chat App</h1>
    <form className='flex flex-col w-[95%] items-start justify-center sm:w-[50%] md:w-[40%] lg:w-[35%]  pb-[5%]' onSubmit={handleSubmit} action="">

         <label className='text-[130%] my-[3%]' htmlFor="">email</label>
         <input type="email" className=' w-full 
          text-black bg-white border-[1px] py-[1%] text-[110%]' name="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}  />

         {err&& <label className='text-red-800'>{err}</label>}
 
         <button className='mt-[6%] text-[120%] m-auto bg-c1 py-[1%] w-full' type='submit'>Reset Password</button>
 
         <NavLink to='/login' type='button' className='m-auto my-[5%]'>back to login page</NavLink>
     </form>
  </div>
     </> 
  )
}

export default PasswordReset