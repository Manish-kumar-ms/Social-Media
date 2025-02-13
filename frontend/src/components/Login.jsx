import React, { useState } from 'react'
import { handleError, handleSucess } from '../Utils.js'
import {  Link, useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

const Login = () => {
    const[loginInfo,setloginInfo]=useState({
        email:"",
        password:""
    })


       
    const navigate=useNavigate()

    const handleChange=(e)=>{
     const {name,value}=e.target
     setloginInfo({...loginInfo,[name] :value})
    }


    const handleLogin=async(e)=>{
        e.preventDefault()
        const {email,password}=loginInfo
        if( !email || !password){
          return handleError('name ,email and password not found')
        } 

        try {

        const url="http://localhost:8000/auth/login"
        const response=await fetch(url,{
          method:"POST",
          headers:{
            'Content-Type' : 'application/json'
          },
          body :JSON.stringify(loginInfo)
        })

        if (!response.ok) {
                  // If the response is not successful (status 4xx or 5xx)
                  const result = await response.json();
                  return handleError(result.message || "An error occurred.");
                }

        const result=await response.json()
        console.log(result)

        const {success,message,error,jwtToken,name}=result

        

        if(success){
          localStorage.setItem('token',jwtToken)
          localStorage.setItem('loggedInUser',name)
          handleSucess(message)
          setTimeout(() => {
            navigate('/home')
          }, 1000);
        }
        else if(error){
          const details=error?.details[0].message
          handleError(details)
        }


          
        } catch (error) {
          handleError(error)
        }
    }

    
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
    <div className="bg-white shadow-lg p-6 rounded-lg w-96">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            autoFocus
            placeholder="Enter your email"
            value={loginInfo.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={loginInfo.password}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
          Login
        </button>
         <p className="text-sm text-gray-600 mt-4 text-center">
                Don't have an account?{" "}
                <Link to="/signup" className="text-blue-500 hover:underline">
                  Signup
                </Link>
              </p>
      </form>
      <ToastContainer />
    </div>
  </div>
  )
}

export default Login