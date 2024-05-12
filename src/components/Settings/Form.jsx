import React from 'react'

function Form({ handleSubmit, type, name, loading }) {
  return (
    <div className='p-[1%] my-[5%] md:w-[33.3%] md:my-[1%] md:flex flex-col items-center justify-center'>
      <form className='flex flex-col' onSubmit={handleSubmit}>

        <label className='' htmlFor="">change {name}</label>
        {name === "password" && <label className='mt-[1%]'>old password</label>}
        <input disabled={loading} placeholder={name} name='input1' className=' text-black p-[1.5%] my-[2%]' type={type} />

        {name === "password" &&
          <>
            <label htmlFor="">new {name}</label>
            <input disabled={loading} name='input2' className=' text-black my-[2%] p-[1.5%]' type={type} />

            <label htmlFor="">confirm {name}</label>
            <input disabled={loading} name='input3' className=' text-black my-[2%] p-[1.5%] ' type={type} />
          </>}

        <button disabled={loading} className=' bg-c1 p-[1%] mt-[2%] md:p-[2%] disabled:bg-opacity-50'>change</button>
      </form>
    </div>
  )
}

export default Form