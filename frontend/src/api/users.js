import uuid from 'uuid/v4'
import { auth, firestore, firebase } from './firebase'

const usersDb = firestore.collection('users')

export const signupUser = async ({ email, password }) => {
  const authRes = await auth.createUserWithEmailAndPassword(email, password)

  usersDb.doc(authRes.user.uid).set({
    email,
    todos: [
      {
        id: uuid(),
        text: 'Log into this awesome app',
        isCompleted: true,
        createdAt: firebase.firestore.Timestamp.now(),
      },
      {
        id: uuid(),
        text: 'Try completing a todo by clicking it',
        isCompleted: false,
        createdAt: firebase.firestore.Timestamp.now(),
      },
    ],
  })
}

export const loginUser = ({ email, password }) =>
  auth.signInWithEmailAndPassword(email, password)

export const logoutUser = () => auth.signOut()

const usersApi = {
  signupUser,
  loginUser,
  logoutUser,
}

export default usersApi
