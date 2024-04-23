import {initializeApp} from "firebase/app"
import { GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword,signInWithRedirect, updateProfile, signInWithPopup, signOut } from "firebase/auth"
import { getAnalytics } from "firebase/analytics"
import { getAuth } from "firebase/auth"
import {getFirestore,addDoc,collection,getDocs, getDoc,updateDoc, doc,onSnapshot, deleteDoc, query,orderBy, serverTimestamp} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
import {v4 as uuid} from 'uuid'

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_Storage_Bucket,
    messagingSenderId: import.meta.env.VITE_FIREBASE_Messaging_SenderId,
    appId: import.meta.env.VITE_FIREBASE_AppId,
    measurementId: import.meta.env.VITE_FIREBASE_MeasurementId
}
  
// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
export const db = getFirestore(app) 
export const storage = getStorage(app)

const googleProvider = new GoogleAuthProvider()

googleProvider.setCustomParameters({
  prompt: "select_account"
})

const auth = getAuth(app)

const usersRef = collection(db,'users')


const signInWithGoogle = async () => {
    await signInWithRedirect(auth,googleProvider).then(res=>{
    return res.user
  }).catch(err=>{
    console.log("error",err.message)
  })
}


export const handleSingInForm = async (name,email,password)=>{
      try{
         const res = await createUserWithEmailAndPassword(auth,email,password)
         const user = res.user
         await updateProfile(user,{name:name})
         addDoc(usersRef,{
               name:user.displayName,
               uid:user.uid,
               email:user.email
         })
        return user
      }catch(err){
        console.log('error is ',err.message)
        return null
      }
}

export const handleLogInForm = async (email,password)=>{
      try{
      const res = await signInWithEmailAndPassword(auth,email,password)
      const user = res.user
      return user
      }catch(err){
        console.log('error is ',err.message)
        return err
      }
}

const messageRef = collection(db,'messages')

export const sendMessage = async (message)=>{
             try {
              message.createdAt = serverTimestamp()
              const nnMessageRef = collection(db,'messages/')
              const newMesasgeRef = await addDoc(messageRef,message)

              const newMessage = await getDoc(newMesasgeRef)

              console.log('new messagesssssss',newMessage._document.data.value.mapValue)

              return {
                id:newMessage.id,
                title:newMessage._document.data.value.mapValue.fields.title.stringValue,
                content:newMessage._document.data.value.mapValue.fields.content.stringValue,
                uid:newMessage._document.data.value.mapValue.fields.uid.stringValue,
                email:newMessage._document.data.value.mapValue.fields.email.stringValue,
                createdAt:message.createdAt
              }
                 } 
              catch (error) {
              console.error('Error sending message:', error)
              return false
              }
}

export const showMessages = async ()=>{
       try{
        const q = query(messageRef, orderBy('createdAt', 'desc'))
       const data = await getDocs(q)
       const filterdData = data.docs.map((doc)=>{
        return {
          ...doc.data(),
          id:doc.id,
          createdAt: doc.data().createdAt?.toDate()?.toLocaleString()
        }
      })
       console.log('filtereddd',filterdData)
       return filterdData
       }catch(err){
        console.log(err)
       }
}

export const getMeassage = async (messageID)=>{
       const docMessageRef = doc(db,'messages',messageID)
       try{
          const res = await getDoc(docMessageRef)
          return {
            title:res._document.data.value.mapValue.fields.title.stringValue,
            content:res._document.data.value.mapValue.fields.content.stringValue,
            date:res._document.data.value.mapValue.fields.date.timestampValue
          }
       }catch(err){
        console.log(err)
        return false
       }
}

export const deleteMessages = async (messageID)=>{
             const messageDoc = doc(db,'messages',messageID)
             getDoc(messageDoc).then((data)=>{
                   console.log('removing message',data)
             })
             await deleteDoc(messageDoc)
}

export const editMessage = async (messageId,newMessage)=>{
       console.log('new message is',newMessage)
       const message = doc(db,'messages',messageId)
       await updateDoc(message,newMessage)
       return true 
}

export const subCollectionTest = async ()=>{
       try{
       const userRef = doc(db,'users','uNIseyUVGaVSn8zFEU1Bok59UqE3')
       const userMessagesRef = collection(userRef,'messages')
       await addDoc(userMessagesRef,{
        title:'hello'
       })
       console.log('meseages added succssfully')
      }catch(err){
        console.log('err',err)
      }
}

// export const unsubscribeMessageList = getDocs(messageRef).onSnapshot(snapshot => {
//         showMessages().then(res=>{
//           console.log('messagessss are :',res)
//           dispatch(changeMessageList(res))
//           console.log('new messages are ',messages)
//           setLoading(false)
//         })
// })





export {
    auth,
    signOut,
    signInWithGoogle,
    collection,
    query
}

export default app