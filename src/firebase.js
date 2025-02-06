import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBhKWZzvUZNskqY2N0haeKK8vvuwuhsvDo",
  authDomain: "netflix-clone-2069b.firebaseapp.com",
  projectId: "netflix-clone-2069b",
  storageBucket: "netflix-clone-2069b.firebasestorage.app",
  messagingSenderId: "472500096193",
  appId: "1:472500096193:web:018a6414fa3f4f9d7a5840",
  measurementId: "G-QLVGBVXWYN",
};

const app = initializeApp(firebaseConfig);
const Auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(Auth, email, password);
    const user = res.user;


    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });

    console.log("User signed up successfully!");
  } catch (error) {
    console.error("Signup Error:", error);
    alert(error.message);
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(Auth, email, password);
    console.log("User logged in successfully!");
  } catch (error) {
    console.error("Login Error:", error);
    alert(error.message);
  }
};

const logout = async () => {
  try {
     signOut(Auth);
    console.log("User logged out successfully!");
  } catch (error) {
    console.error("Logout Error:", error);
    alert(error.message);
  }
};

export { Auth, db, login, signup, logout };
