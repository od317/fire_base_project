import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { changeModal } from '../../features/modal/modalSlice'
import ModalForm from './ModalForm'
import UList from './uList'
function Modal() {

  const ref = useRef()
  const dispatch = useDispatch()

  useEffect(() => {

    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
         dispatch(changeModal(false))
      }
    }

    window.addEventListener('mousedown', handleClick)

    return () => {
      window.removeEventListener('mousedown', handleClick)
    }

  }, [ref])

  return (
    <div className=' absolute w-[100%] h-[100%] flex items-center rounded-sm justify-center bg-black bg-opacity-40 z-[20] '>
      <div ref={ref} className=' w-[90%] md:w-[35%] h-[90%] flex flex-col bg-bg1 rounded-t-sm '>

        <div className='flex text-[110%] flex-row bg-bg1 justify-between rounded-t-sm p-[4%]'>
          <label htmlFor="">search for users</label>
          <button onClick={() => {
            dispatch(changeModal(false))
          }}>
            <svg
              viewBox="0 0 512 512"
              fill="currentColor"
              height="1.5em"
              width="1.5em"
            >
              <path d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z" />
            </svg>
          </button>
        </div>

        <UList></UList>

        <ModalForm></ModalForm>

      </div>
    </div>
  )
}

export default Modal