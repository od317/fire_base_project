import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updatePhoto } from '../../features/user/userSlice'
import { savePhoto } from '../../firebase'

function PhotoChange({setMessage}) {

    const [photo, setPhoto] = useState(null)
    const [photoLoading, setPhotoLoading] = useState(false)
    const dispatch = useDispatch()
     
    const changePhoto = async (e) => {
        setMessage('')
        try{
        e.preventDefault()
        if (!photo){
            setMessage('No photo selected')
            return
        }

        if (!photo.type.startsWith('image/')) {
                setMessage('Selected file is not an image')
                return
        }
        const newPhoto =  await savePhoto(photo)
        dispatch(updatePhoto(newPhoto))
        setMessage('photo chagned successfully')
        }catch(err){
            console.log(err)
        }
    }

    return (
        <>
            <form onSubmit={changePhoto} 
            className=' p-[1%] my-[5%] md:w-[33.3%] md:my-[1%] md:flex flex-col items-center justify-center'>
                <label htmlFor="">change photo</label>
                <input className=' md:my-[.2%] my-[1%] p-[1%] md:p-[0.5%] bg-c1' onChange={(e) => {
                    setPhoto(e.target.files[0])
                }} type="file" name="" id="" />
                <button className='mt-[.2%] bg-c1 p-[1%] '>change photo</button>
            </form>
        </>
    )
}

export default PhotoChange