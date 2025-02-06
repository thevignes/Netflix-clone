import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { Auth } from "./firebase";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Home from "./Page/Home/Home";
import Login from "./Page/Login/Login";
import Player from "./Page/Player/Player";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
 
    const unsubscribe = onAuthStateChanged(Auth, (user) => {
      if (user) {
        console.log(user);
        console.log("User logged in successfully");
        navigate("/");
      } else {
        console.log("User logged out");
        navigate("/login");
      }
    });

   
    return () => unsubscribe();
  }, []); 

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/player/:id" element={<Player />} />
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
