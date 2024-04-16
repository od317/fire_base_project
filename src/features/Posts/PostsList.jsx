import React,{useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { selectAllPosts,selectError,selectStatus,fetchPosts, deleteMessage } from './PostsSlice'
import { onSnapshot } from 'firebase/firestore'
import {selectAllUsers} from '../users/usersSlice'
import { selectUser } from '../user/userSlice'
import { db, collection} from '../../firebase'
import Message from './Message'

const PostsList = () => {

    const dispatch = useDispatch()

    const users = useSelector(selectAllUsers)

    const user = useSelector(selectUser)


    const posts = useSelector(selectAllPosts)
    const error = useSelector(selectError)
    const status  = useSelector(selectStatus)

    const handleMessageDelete = (id)=>{
          dispatch(deleteMessage(id))
    }


    const renderedPosts = posts.map((post,i) => (
        <article 
        style={{backgroundColor:`${ post.uid === user?.uid ? '#3d3d3d' : '#0b81d6' }`}}
        className='flex flex-col text-center w-fit m-auto px-[5%] py-[5%] my-[5%] items-center justify-center' key={i}>
                 <Message post={post} handleMessageDelete={handleMessageDelete}></Message>
        </article>
    ))

    // useEffect(()=>{
    //   if(status === 'idle'){
    //     dispatch(fetchPosts())
    //   }
    // },[dispatch,status])

    useEffect(()=>{


      const unsubscribe = onSnapshot(collection(db, 'messages'), (snapshot) => {
            dispatch(fetchPosts())
          })
      return ()=> unsubscribe()
    },[dispatch])

    return (
        <section>
            <h2>Posts</h2>
            { renderedPosts ? <div>{renderedPosts}</div> : <label>loading</label>}
        </section>
    )
}

export default PostsList