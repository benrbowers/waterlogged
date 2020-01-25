import { auth } from './firebase'

//Logout
export const logOut = () =>
  auth.signOut()

export const signInWithGoogle = (provider) =>
auth.signInWithPopup(provider)