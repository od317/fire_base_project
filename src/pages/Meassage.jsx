import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { getMeassage } from '../firebase'
import { useSelector } from 'react-redux'

function Meassage() {
  const {id} = useParams()

  const [message,setMessage] = useState(null)
  
  // const message = useSelector((state)=>{
  //       state.messages.value.find((meassage)=> message.id === id)
  // })

  useEffect(()=>{
       getMeassage(id).then(res=>{
        console.log('view res is :',res)
        setMessage(res)
       })
  },[])

  return (
    <div>
       {message ?
       <div className='flex flex-col'>
             {message.title}
             <br />
             {message.content}
       </div>:
       <label>loading</label>}
    </div>
  )
}

export default Meassage
