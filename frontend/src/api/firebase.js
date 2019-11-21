import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

firebase.initializeApp({
  apiKey: 'AIzaSyBzXSgCrU9EcfID_kzK13WMZCn-4OTiMBM',
  authDomain: 'sergejkurbanov-todo-app.firebaseapp.com',
  projectId: 'sergejkurbanov-todo-app',
})

const auth = firebase.auth()
const firestore = firebase.firestore()

export { auth, firestore, firebase }
