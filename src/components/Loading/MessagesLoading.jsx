import React from 'react'

function MessagesLoading() {
  return (
    <div className='w-full h-full relative'>
      <div className='w-[98%] h-full px-[1%]  flex flex-col justify-end absolute'>
        <DummyMessage text={'osamasasdkjwdkl'} i={0} ></DummyMessage>
        <DummyMessage text={'osamasss'} i={1} ></DummyMessage>
        <DummyMessage text={'osama'} i={2} ></DummyMessage>
        <DummyMessage text={'osamaasdsadsad'} i={3} ></DummyMessage>
        <DummyMessage text={'osama'} i={4} ></DummyMessage>
        <DummyMessage text={'osamaasldkqwepkspoak'} i={5} ></DummyMessage>
      </div>
      <Loader></Loader>
    </div>
  )
}

function Loader() {
  return (<>
    <div className=' w-full h-full flex flex-row items-center backdrop-blur-sm justify-center '>
      <label className='animate-spin' htmlFor="">
        <svg fill="none" viewBox="0 0 24 24" height="3em" width="3em" >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M12 19a7 7 0 100-14 7 7 0 000 14zm0 3c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
            clipRule="evenodd"
            opacity={0.2}
          />
          <path
            fill="currentColor"
            d="M2 12C2 6.477 6.477 2 12 2v3a7 7 0 00-7 7H2z"
          />
        </svg>
      </label>
    </div>
  </>)
}
function DummyMessage({ text , i }) {
  return (

    <>
      <div
        className={`flex flex-row break-words ${i % 2 == 0 ? 'self-end justify-end ' : ' justify-start'}
           my-[5%] md:my-[1%] w-full`}>
        <div
          className={`
          text-[110%] ${i % 2 == 0 ? 'self-end bg-zinc-600' : 'bg-c1'} 
          opacity-1 transition-all duration-200
           text-start  flex items-center justify-start break-words max-w-[70%] rounded-md p-[4%]
          md:text-[100%] md:max-w-[40%] min-w-[1%] w-fit h-fit  md:p-[1.2%] relative`} htmlFor="">

          <label className={` break-words w-full `} htmlFor="">
            {text}
          </label>

        </div>
      </div>
    </>

  )
}

export default MessagesLoading