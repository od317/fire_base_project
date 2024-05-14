import React,{useRef,useEffect} from 'react'

function ScrollList({children,top}) {
  
  const containerRef = useRef(null)

  useEffect(() => {
    if (containerRef.current && top ) {
         containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  },)

  return (
    <div ref={containerRef} className={`overflow-y-scroll h-[88%] flex-grow pb-[5%] 
                                        md:pb-[5%] md:flex-initial ${top ? 'md:w-[100%] pb-[40%]  md:pb-[0%]':'md:w-[25%] '} `}>
            <div className={`flex flex-col ${top ? 'justify-end p-[2%]':'p-[2%]'} relative min-h-full`}>
                {children}
            </div>
    </div>
  )
}

export default ScrollList