import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../Firebase/Firebase.config";

export const AuthContext = createContext(null);

const AuthProvaider = ({ children }) => {
  const [user, serUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //sign up with email and password
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //sign in user in email and password
  const userSignIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //logout
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      serUser(currentuser);

      // const userInfo = { email: currentuser?.email };

      // if (currentuser) {
      //   axiosPublic.post(`/jwt`, userInfo).then((res) => {
      //     if (res.data.token) {
      //       localStorage.setItem("access-token", res.data.token);
      //     }
      //   });
      // } else {
      //   // remove token
      //   localStorage.removeItem("access-token");
      // }
      setLoading(false);
    });
    return () => {
      return unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    userSignIn,
    logOut,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvaider;
