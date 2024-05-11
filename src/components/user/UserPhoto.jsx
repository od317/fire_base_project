import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../../features/user/userSlice'
import useOutsideAlerter from '../../hooks/useOutsideAlerter'
import { useNavigate } from 'react-router-dom'

const UserPhoto = ({ photo }) => {

  const [imgSrc, setImgSrc] = useState(photo || 'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg')
  const [showOptions, setShowOptions] = useState(false)
  const optionsRef = useRef(null)
  
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleError = (err) => {
    setImgSrc('https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg')
    console.log(err)
  }

  const logout = async () => {
    dispatch(logoutUser())
  }

  useOutsideAlerter(optionsRef, setShowOptions)

  return (
    <>
      <div ref={optionsRef}  className='relative w-[15%] pb-[15%] rounded-full bg-red-500
                                        md:w-[3%] md:pb-[3%]'>
        <img className='absolute rounded-full w-full h-full' src={imgSrc} onError={handleError} alt="" />
        <div className={` ${showOptions ? ' scale-1 ' : 'scale-0'} w-[300%] translate-y-[40%] z-[20] transition-all duration-200  origin-top-left 
          flex items-center p-[20%] flex-col absolute justify-evenly  bg-c1 translate-x-[0%]`}>
          <button onClick={() => {
            logout()
          }} className='border-b-[1px] text-start pb-[2%] m-[5%]  border-b-c3 w-full'>logout</button>
          <button onClick={()=>{
             navigate('/settings')
          }} className='border-b-[1px] text-start pb-[2%] m-[5%]  border-b-c3 w-full'>settings</button>
          <button onClick={() => {
            setShowOptions(false)
          }} className='border-b-[1px] text-start pb-[2%] m-[5%]  border-b-c3 w-full'>close</button>
        </div>

      </div>
    </>)
}
export default UserPhoto