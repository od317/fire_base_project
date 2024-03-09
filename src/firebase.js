import { initializeApp} from "firebase/app"
import {GoogleAuthProvider,getAuth,signInWithPopup,signInWithEmailAndPassword,createUserWithEmailAndPassword,sendPasswordResetEmail,signOut} from "firebase/auth"
import {getFirestore,query,getDocs,collection,where,addDoc} from "firebase/firestore"
import { getAnalytics } from "firebase/analytics"

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
const db = getFirestore(app)

const googleProvider = new GoogleAuthProvider()

const auth = getAuth(app)

const signInWithGoogle = async ()=>{
      try{
         const res = await signInWithPopup(auth,googleProvider)
         const user = res.user
         const q = query(collection(db,"users"),where("uid","==",user.uid))
         const docs = await getDocs(q)
         if(docs.docs.length === 0){
            await addDoc(collection(db,"users"),{
                uid:user.uid,
                name:user.displayName,
                authProvider: "google",
                email: user.email,
            })
         }
         console.log('user is',user)
      }catch(err){
        console.log(err.message)
      }
}


const logInWithEmailAndPassword = async (email,password)=>{
          try{
             await signInWithEmailAndPassword(auth,email,password)
          }catch(err){
            console.log(err.message)
          }
}

const registerWithEmailAndPassword = async (name,email,password)=>{
    try{
        const res = await createUserWithEmailAndPassword(auth,email,password)
        const user = res.user
        await addDoc(collection(db,"users"),{
              uid:user.uid,
              name:name,
              authProvider:'local',
              email:email
        })
    }catch(err){
        console.log(err.meassage)
    }
}


const sendPasswordReset = async (email)=>{
      try{
         await sendPasswordResetEmail(auth,email)
         console.log('password is sent')  
      }
      catch(err){
        console.log(err.message)
      }
}


const logout = ()=>{
      signOut(auth)
}


export {
    auth,
    db,
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
  }

export default app