import React from 'react'

function SignIn({handleSignInFromSubmit}) {
  return (
    <form className={'flex flex-col w-full h-screen items-center justify-center'} onSubmit={handleSignInFromSubmit}>
            <label htmlFor="">sign in</label>
            <input placeholder={'name'} className='w-[30%] bg-gray-500 text-black mb-[2%] p-[1%]' type="text" name="email" id="" />
            <input placeholder={'password'} className='w-[30%] bg-gray-500 mb-[2%] p-[1%]' type="text" name="password" id="" />
            <button className='w-fit p-[1%] bg-red-500'>submit</button>
    </form>
  )
}

export default SignIn
