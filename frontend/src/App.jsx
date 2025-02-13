import React, { useState } from 'react'
import Login from './components/Login'
import Home from './components/Home';
import { Navigate, Route, Router, Routes } from 'react-router-dom';
import Formsubmit from './components/Formsubmit';
import Signup from './components/Signup';


const App = () => {

 
  return (
    
    <div>
      
    <Routes>
    <Route path="/" element={<Navigate to="/signup"/>} />
      <Route path="/login" element={<Login  />} />
      <Route path="/signup" element={<Signup/>} />
      <Route
          path="/home"
          element={<Home  />}
        />
        <Route path="/formsubmit" element={<Formsubmit/>} />
    </Routes>
    </div>
     
  )
}

export default App