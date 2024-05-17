import { initializeApp } from "firebase/app"
import { GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithRedirect, updateProfile, signInWithPopup, signOut, EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth"
import { getAnalytics } from "firebase/analytics"
import { getAuth } from "firebase/auth"
import { getFirestore, addDoc, collection, getDocs, getDoc, updateDoc, doc, onSnapshot, deleteDoc, query, orderBy, serverTimestamp, setDoc, and, limit, startAt, endAt } from 'firebase/firestore'
import { getDownloadURL, getStorage, list, listAll, ref, uploadBytes } from 'firebase/storage'
import { v4 as uuid } from 'uuid'
import { where, or } from "firebase/firestore"
import { arrayUnion } from "firebase/firestore"


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

const usersRef = collection(db, 'users')


const signInWithGoogle = async () => {
  try {
    const res = await signInWithRedirect(auth, googleProvider)
    // const user = res.user
    // await addDoc(usersRef, {
    //   name: user.displayName,
    //   uid: user.uid,
    //   email: user.email
    // })
    await addUserToDb(res.user)
  } catch (err) {
    console.log(err)
  }
}

export const addUserToDb = async (user) => {
  try {
    const userRef = doc(db, 'users', user.uid)
    console.log('adding user', user)
    const userDoc = await getDoc(userRef)
    if (userDoc.exists()) {
      return
    }
    await setDoc(userRef, {
      name: user.displayName || user.name,
      email: user.email,
      photoUrl: user.photoURL || ''
    })
  } catch (err) {
    console.log('err adding user ', err)
  }
}

export const changeOnlineStatus = async (user, status) => {
  try {
    const userRef = doc(db, 'users', user.uid)
    await setDoc(userRef, {
      online: status,
    }, { merge: true })
  } catch (err) {
    console.log(err)
  }
}

export const handleSingInForm = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password)
    let user = res.user
    await updateProfile(user, { displayName: name })
    user = { ...user, displayName: name }
    // await addUserToDb(user)
    return user
  } catch (err) {
    console.log('error is ', err.message)
    return false
  }
}

export const handleLogInForm = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password)
    const user = res.user
    return user
  } catch (err) {
    console.log('error is ', err.message)
    return false
  }
}

export const getAllUsers = async () => {
  let filterdData = []
  try {
    const connections = await getConnections()
    const friends = await getFriends(connections)


    if (connections.length > 0) {
      const q = query(usersRef,
        where('__name__', 'in', connections)
      )
      const data = await getDocs(q)
      filterdData = data.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id
        }
      })
      filterdData = filterdData.filter((doc) => {
        return doc.id !== auth.currentUser.uid
      })

    }
    filterdData = [...filterdData, ...friends]
  } catch (err) {
    console.log('nope' + err)
  } finally {
    return filterdData
  }
}


const messageRef = collection(db, 'messages')

export const sendMessageF = async (message) => {
  message.createdAt = serverTimestamp()
  const res = await addDoc(messageRef, message)
  message.createdAt = new Date().toUTCString()

  const s_id = message.senderId
  const r_id = message.receiverId

  try {

    addFriend(s_id, r_id)
    addConnection(s_id, r_id)

  } catch (err) {
  } finally {
    return message
  }
}

export const sendMessage = async (message) => {
  try {

    message.createdAt = serverTimestamp()

    const newMesasgeRef = await addDoc(messageRef, message)

    const newMessage = await getDoc(newMesasgeRef)


    return {
      id: newMessage.id,
      title: newMessage._document.data.value.mapValue.fields.title.stringValue,
      content: newMessage._document.data.value.mapValue.fields.content.stringValue,
      uid: newMessage._document.data.value.mapValue.fields.uid.stringValue,
      email: newMessage._document.data.value.mapValue.fields.email.stringValue,
      createdAt: message.createdAt
    }
  }
  catch (error) {
    console.error('Error sending message:', error)
    return false
  }
}

export const showMessages = async (id) => {
  try {
    const q = query(messageRef,
      and(
        or(
          where('senderId', '==', auth.currentUser.uid),
          where('receiverId', '==', auth.currentUser.uid),
        ),
        or(
          where('senderId', '==', id),
          where('receiverId', '==', id)
        ),
      ),
      orderBy('createdAt', 'asc'))
    const data = await getDocs(q)
    const filterdData = data.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
        createdAt: doc.data().createdAt?.toDate()?.toLocaleString()
      }
    })
    return filterdData
  } catch (err) {
    console.log(err)
  }
}

export const getMeassage = async (messageID) => {
  const docMessageRef = doc(db, 'messages', messageID)
  try {
    const res = await getDoc(docMessageRef)
    return {
      title: res._document.data.value.mapValue.fields.title.stringValue,
      content: res._document.data.value.mapValue.fields.content.stringValue,
      date: res._document.data.value.mapValue.fields.date.timestampValue
    }
  } catch (err) {
    console.log(err)
    return false
  }
}

export const deleteMessages = async (messageID) => {
  try {
    const messageDoc = doc(db, 'messages', messageID)
    await deleteDoc(messageDoc)
  } catch (err) {
    console.log('deletring message err', err)
  }
}

export const editMessage = async (messageId, newMessage) => {
  const message = doc(db, 'messages', messageId)
  await updateDoc(message, newMessage)
  return true
}

export const get5Users = async () => {
  const q = query(usersRef, limit(5))
  const data = await getDocs(q)
  const filterdData = data.docs.map((doc) => {
    return {
      ...doc.data(),
      id: doc.id
    }
  })
  return filterdData
}

export const searchForUsers = async (search) => {
  const q = query(
    usersRef,
    where('name', '>=', search),
    where('name', '<=', search + '\uf8ff')
  )
  const data = await getDocs(q)
  const filterdData = data.docs.map((doc) => {
    return {
      ...doc.data(),
      id: doc.id
    }
  })
  return filterdData
}

export const addFriend = async (s_id, d_id) => {

  try {

    const userRef = doc(db, 'users', s_id)
    const userData = await getDoc(userRef)
    const data = userData.data()
    if (data.friends && data.friends.includes(d_id)) {
      return
    }

    await updateDoc(userRef, {
      friends: arrayUnion(d_id)
    })
  } catch (err) {
    console.log('error adding friend', err)
  }
}

export const addConnection = async (s_id, d_id) => {

  try {

    const connectionsRef = collection(db, 'connections')
    const q = query(
      connectionsRef,
      or(
        where('value', '==', "" + d_id + s_id),
        where('value', '==', "" + s_id + d_id),
      )
    )
    const conData = await getDocs(q)
    if (conData.docs.length > 0) {
      return
    }
    await addDoc(connectionsRef, {
      value: "" + s_id + d_id,
      u1: s_id,
      u2: d_id
    })
  } catch (err) {
    console.log('error adding con', err)
  }
}

export const getFriends = async (connections) => {
  try {
    const userRef = doc(db, 'users', auth.currentUser.uid)
    let userData = await getDoc(userRef)
    userData = userData.data().friends
    let filterdData
    const q = query(usersRef,
      where('__name__', 'in', userData)
    )
    let res = await getDocs(q)
    filterdData = res.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id
      }
    })
    filterdData = filterdData.filter((doc) => {
      return !connections.includes(doc.id)
    })
    return filterdData
  } catch (err) {
    console.log('cant get user freinds', err)
    return []
  }
}

export const getConnections = async () => {
  try {
    const id = auth.currentUser.uid
    const connectionsRef = collection(db, 'connections')
    const q = query(connectionsRef,
      or(
        where('u1', '==', id),
        where('u2', '==', id)
      ))
    const res = await getDocs(q)
    let data = res.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id
      }
    })

    data = data.map((doc) => {
      if (doc.u1 == id)
        return doc.u2
      return doc.u1
    })

    return data
  } catch (err) {
    console.log('errsssssssss', err)
    return []
  }
}

export const changeName = async (newName) => {
  try {
    const userRef = doc(db, 'users', auth.currentUser.uid)
    await updateDoc(userRef, {
      name: newName
    })

    await updateProfile(auth.currentUser, {
      displayName: newName
    })
    console.log('name changed')
    return true
  } catch (err) {
    console.log('error changing the name', err)
    return false
  }
}


export const chagnePassWord = async (currentPassword, newPassword) => {
  try {
    const credentials = EmailAuthProvider.credential(auth.currentUser.email, currentPassword)
    await reauthenticateWithCredential(auth.currentUser, credentials)
    await updatePassword(auth.currentUser, newPassword)

    return 'password changed successfully'
  } catch (err) {
    console.log('error changing pass', err)
    return err.message
  }
}


export const isSignedInWithGoogle = () => {
  const currentUser = auth.currentUser;
  if (currentUser) {
    if (currentUser.providerData) {
      for (const userInfo of currentUser.providerData) {
        if (userInfo.providerId === 'google.com') {
          return true
        }
      }
    }
  }
  return false;
}


export const savePhoto = async (photo) => {
  try {
    const photoRef = ref(storage, `images/${auth.currentUser.uid}`)
    await uploadBytes(photoRef, photo)
    const savedPhoto = await getPhoto(`images/${auth.currentUser.uid}`)
    await updateProfile(auth.currentUser,{
      photoURL:savedPhoto
    })
    const userDoc = doc(db,'users',auth.currentUser.uid)
    await updateDoc(userDoc,{
      photoUrl:savedPhoto
    })
    console.log('image uploaded successfully')
    return savedPhoto
  } catch (err) {
    console.log('err uploading photo', err)
  }
}

export const getPhoto = async (path) => {
  const photoRef = ref(storage,path)
  const photo = await getDownloadURL(photoRef)
  return photo
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










