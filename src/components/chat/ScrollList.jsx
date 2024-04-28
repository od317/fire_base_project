import React,{useRef,useEffect} from 'react'

function ScrollList({children,top}) {
  
  const containerRef = useRef(null)

  useEffect(() => {
    if (containerRef.current && top ) {
         containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  },)

  return (
    <div ref={containerRef} className=' overflow-y-scroll h-[88%] pb-[45%]'>
            <div className='flex flex-col  items-start  px-[1%] justify-end min-h-full'>
                {children}
            </div>
    </div>
  )
}

export default ScrollList