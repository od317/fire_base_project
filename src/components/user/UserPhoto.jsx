import React,{useState} from 'react'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../../features/user/userSlice'

const UserPhoto = ({photo,status})=>{
    
    const [imgSrc,setImgSrc] = useState(photo || 'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg')
    
    const dispatch = useDispatch()

    const handleError = (err)=>{
          setImgSrc('https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg')
          console.log(err)
    }

    const logout = async ()=>{
          // dispatch(logoutUser())
          console.log('logoutttt')
    }

    return(
    <>
      <button onClick={logout} className='relative w-[15%] pb-[15%] rounded-full bg-red-500'>
          <img className='absolute rounded-full w-full h-full' src={imgSrc} onError={handleError} alt="" />
          {status &&
          <div className='w-full h-full flex absolute items-end justify-end'>           
              <svg className=' absolute'
                fill="#07f246"
                viewBox="0 0 16 16"
                height=".8em"
                width=".8em"
              >
                <path d="M16 8 A8 8 0 0 1 8 16 A8 8 0 0 1 0 8 A8 8 0 0 1 16 8 z" />
              </svg>
          </div>}

      </button>
    </>)
}
export default UserPhoto