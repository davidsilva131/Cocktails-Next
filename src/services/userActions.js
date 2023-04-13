import { auth } from '../services/firebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth'

export const login = async (email, password) => {
  const loged = await signInWithEmailAndPassword(auth, email, password)
    .then(({ user }) => {
      const { uid } = user.auth.currentUser
      return uid
    })
  return loged
}
