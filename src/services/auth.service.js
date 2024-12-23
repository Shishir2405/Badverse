import { auth } from '../config/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';

export const authService = {
  async signup({ email, password }) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return {
      user: userCredential.user,
      token: await userCredential.user.getIdToken()
    };
  },

  async login({ email, password }) {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return {
      user: userCredential.user,
      token: await userCredential.user.getIdToken()
    };
  },

  async logout() {
    await signOut(auth);
  }
};