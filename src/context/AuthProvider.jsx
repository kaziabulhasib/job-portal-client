import React, { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import auth from "../firebase/firebase.init";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import toast from "react-hot-toast";

function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const provider = new GoogleAuthProvider();
  // google log in

  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  // create a new user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // manage user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("state captured ", currentUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  // sign in user
  const signinUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // logout user
  const logoutUser = () => {
    setLoading(true);
    signOut(auth)
      .then(() => {
        console.log("logged out user");
        setLoading(false);
        toast.success("logout sucessfully");
      })
      .catch((error) => {
        console.log(error.message);
        setLoading(false);
      });
  };
  // ----------------------------
  const authInfo = {
    user,
    loading,
    createUser,
    signinUser,
    logoutUser,
    googleLogin,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
