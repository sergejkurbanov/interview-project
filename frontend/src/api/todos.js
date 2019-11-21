import uuid from 'uuid/v4'
import { firestore, auth, firebase } from './firebase'

const usersDb = firestore.collection('users')

export const deleteTodo = todo =>
  usersDb.doc(auth.currentUser.uid).update({
    todos: firebase.firestore.FieldValue.arrayRemove(todo),
  })

export const toggleTodo = id => {
  const userDocRef = usersDb.doc(auth.currentUser.uid)

  firestore.runTransaction(async transaction => {
    const user = await transaction.get(userDocRef)
    const newTodos = [...user.data().todos]
    const toToggleIndex = newTodos.findIndex(todo => todo.id === id)

    newTodos[toToggleIndex].isCompleted = !newTodos[toToggleIndex].isCompleted

    transaction.update(userDocRef, { ...user.data(), todos: newTodos })
  })
}

export const createTodo = text => {
  const newTodo = {
    id: uuid(),
    text,
    isCompleted: false,
    createdAt: firebase.firestore.Timestamp.now(),
  }

  return usersDb.doc(auth.currentUser.uid).update({
    todos: firebase.firestore.FieldValue.arrayUnion(newTodo),
  })
}

export const createGetTodosSocket = (user, callback) =>
  usersDb.doc(user).onSnapshot(doc => {
    callback(doc.data().todos)
  })

const todosApi = {
  deleteTodo,
  toggleTodo,
  createTodo,
  createGetTodosSocket,
}

export default todosApi
