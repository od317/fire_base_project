import {initializeApp} from "firebase/app"
import { GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, signInWithPopup } from "firebase/auth"
import { getAnalytics } from "firebase/analytics"
import { getAuth } from "firebase/auth"

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

const googleProvider = new GoogleAuthProvider()

googleProvider.setCustomParameters({
  prompt: "select_account"
})

const auth = getAuth(app)

const signInWithGoogle = async () => {
  signInWithPopup(auth,googleProvider).then(res=>{
    console.log('singed in and user is:',res.user)
    return res.user
  }).catch(err=>{
    console.log("error",err.message)
  })
}

export const handleSingInForm = async (name,email,password)=>{
      try{
         const res = await createUserWithEmailAndPassword(auth,email,password)
         const user = res.user
        //  await updateProfile(user,{displayName:name})
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

export {
    auth,
    signInWithGoogle
}

export default app