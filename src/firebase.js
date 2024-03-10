import {initializeApp} from "firebase/app"
import {GoogleAuthProvider,getAuth,signInWithPopup,signInWithEmailAndPassword,createUserWithEmailAndPassword,sendPasswordResetEmail,signOut} from "firebase/auth"
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

const googleProvider = new GoogleAuthProvider()

const auth = getAuth(app)


export {
    auth,
}

export default app