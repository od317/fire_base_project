import React, { useState } from 'react'
import { signInWithGoogle } from '../../firebase'
import { NavLink } from 'react-router-dom'
function SingUpForm({handler}) {
   
  const [err,setError] = useState(false)

  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const handleSubmit = async (e)=>{
        e.preventDefault()

        if(name.length<=0 || email.length<=0 || password.length<=0){
            setError('you must enter email and password and name')
            return
        }
        console.log('submitting')
        setError(false)
        let res = handler(name,email,password)
        if(!res){
          setError('somthing went wrong')
        }
  }

  return (
   <>
   
   <form className='flex flex-col w-full items-start justify-center sm:w-[50%] md:w-[40%] lg:w-[35%]  pb-[5%]' onSubmit={handleSubmit} action="">

        <label className='text-[130%] my-[3%]' htmlFor="">name</label>
        <input type="text" 
        className=' w-full 
       text-black bg-c3 border-[1px] py-[1%] text-[110%]' name="name" value={name} onChange={(e)=>{setName(e.target.value)}}  />
    
        <label className='text-[130%] my-[3%]' htmlFor="">email</label>
        <input type="email" className=' w-full 
         text-black bg-c3 border-[1px] py-[1%] text-[110%]' name="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}  />
    
        <label className='text-[130%] my-[3%]' htmlFor="">password</label>
        <input type="password" className=' w-full 
         text-black bg-c3 border-[1px] py-[1%] text-[110%]' name="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}  />


        {err}


        <button className='mt-[6%] text-[120%] m-auto bg-c1 py-[1%] w-full' type='submit'>signUp</button>

        <button onClick={signInWithGoogle} type='button' className='m-auto mt-[5%]'>
            <svg
            viewBox="0 0 1024 1024"
            fill="currentColor"
            height="2em"
            width="2em"
         >
      <path d="M881 442.4H519.7v148.5h206.4c-8.9 48-35.9 88.6-76.6 115.8-34.4 23-78.3 36.6-129.9 36.6-99.9 0-184.4-67.5-214.6-158.2-7.6-23-12-47.6-12-72.9s4.4-49.9 12-72.9c30.3-90.6 114.8-158.1 214.7-158.1 56.3 0 106.8 19.4 146.6 57.4l110-110.1c-66.5-62-153.2-100-256.6-100-149.9 0-279.6 86-342.7 211.4-26 51.8-40.8 110.4-40.8 172.4S151 632.8 177 684.6C240.1 810 369.8 896 519.7 896c103.6 0 190.4-34.4 253.8-93 72.5-66.8 114.4-165.2 114.4-282.1 0-27.2-2.4-53.3-6.9-78.5z" />
             </svg>
        </button>

        <NavLink to='/login' type='button' className='m-auto my-[5%]'>login</NavLink>

    </form>
    

   
    </> 
  )
}

export default SingUpForm