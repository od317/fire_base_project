import React from 'react'

function Login({handleLoginFromSubmit,email,handleEmailChange,password,handlePasswordChange}) {
  return (
    <form className={'flex flex-col w-full h-screen items-center justify-center'} onSubmit={handleLoginFromSubmit}>
            <label htmlFor="">login</label>
            <input value={email} onChange={(e)=>{
              handleEmailChange(e.target.value)
            }} placeholder={'email'} className='w-[30%] bg-gray-500 text-black mb-[2%] p-[1%]' type="text" name="email" id="" />
            <input value={password} onChange={(e)=>{
              handlePasswordChange(e.target.value)
            }} placeholder={'password'} className='w-[30%] bg-gray-500 mb-[2%] p-[1%]' type="text" name="password" id="" />
            <button className='w-fit p-[1%] bg-red-500'>submit</button>
    </form>
  )
}

export default Login
