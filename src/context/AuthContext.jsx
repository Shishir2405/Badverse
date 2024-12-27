// context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth, db } from '../config/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Regular user signup
  async function signup(email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Set user role in Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        role: 'user',
        email: email
      });

      setCurrentUser({
        ...userCredential.user,
        role: 'user'
      });

      return userCredential;
    } catch (error) {
      throw error;
    }
  }

  // Regular user login
  async function login(email, password) {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const userDoc = await getDoc(doc(db, 'users', result.user.uid));
      const userData = userDoc.data();

      setCurrentUser({
        ...result.user,
        role: userData?.role
      });

      return result;
    } catch (error) {
      throw error;
    }
  }

  // Admin signup
  async function signupAsAdmin(email, password, adminCode) {
    if (adminCode !== "7649021965") {
      throw { code: 'auth/invalid-admin-code' };
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        role: 'admin',
        email: email
      });

      setCurrentUser({
        ...userCredential.user,
        role: 'admin'
      });

      return userCredential;
    } catch (error) {
      throw error;
    }
  }

  // Admin login
  async function loginAsAdmin(email, password, adminCode) {
    if (adminCode !== "7649021965") {
      throw { code: 'auth/invalid-admin-code' };
    }

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const userDoc = await getDoc(doc(db, 'users', result.user.uid));
      const userData = userDoc.data();

      if (userData?.role !== 'admin') {
        await signOut(auth);
        throw { code: 'auth/not-admin' };
      }

      setCurrentUser({
        ...result.user,
        role: 'admin'
      });

      return result;
    } catch (error) {
      throw error;
    }
  }

  // Logout
  async function logout() {
    try {
      await signOut(auth);
      setCurrentUser(null);
    } catch (error) {
      throw error;
    }
  }

  // Auth state observer
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          const userData = userDoc.data();
          setCurrentUser({ ...user, role: userData?.role });
        } catch (error) {
          console.error("Error fetching user data:", error);
          setCurrentUser(user);
        }
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    signupAsAdmin,
    loginAsAdmin,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}