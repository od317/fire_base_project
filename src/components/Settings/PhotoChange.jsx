import React, { useState } from 'react'
import { savePhoto } from '../../firebase'

function PhotoChange() {

    const [photo, setPhoto] = useState(null)

    const changePhoto = async (e) => {
        e.preventDefault()
        if (!photo)
            return
        savePhoto(photo)
    }

    return (
        <>
            <form onSubmit={changePhoto} 
            className=' flex flex-col items-center justify-center'>
                <input onChange={(e) => {
                    setPhoto(e.target.files[0])
                }} type="file" name="" id="" />
                <button className='mt-[1%] bg-c1 p-[1%] '>change photo</button>
            </form>
        </>
    )
}

export default PhotoChange