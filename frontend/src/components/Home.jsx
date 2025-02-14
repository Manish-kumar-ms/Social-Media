import React, { useEffect, useState } from 'react'
import { handleError, handleSucess } from '../Utils';
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
    const [forms,setforms]=useState([]);
    const [loggedInUser,setloggedInUser]=useState('')
    const navigate=useNavigate()

    const handleLogout=()=>{
      localStorage.removeItem('token')
      localStorage.removeItem('loggedInUser')
      handleSucess('user Loggedout')
      setTimeout(() => {
        navigate('/login')
      }, 1000);
    }

    const fetchForm=async ()=>{
    try {
        const url='https://social-media-1-50hs.onrender.com/form/getallsubmission'

        const headers={
         
            headers: {
              Authorization: localStorage.getItem('token'),
              
            },
        }

        const response=await fetch(url,headers)
        const result=await response.json()
        if (result.success) {
            setforms(result.data);
          } else {
            handleError(result.message || 'Failed to fetch submissions');
          }
        } catch (error) {
          handleError('Something went wrong while fetching submissions');
        }
        
    
    }



    useEffect(()=>{
        if( localStorage.getItem('token')){
          setloggedInUser(localStorage.getItem('loggedInUser'))
          fetchForm()
        }
        else{
            navigate('/login')
        }
    },[ localStorage.getItem('token')])

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      {/* User Header */}
      <div className="bg-white shadow-md p-4 rounded-md w-full max-w-2xl text-center">
       
        <button
          onClick={handleLogout}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
        >
          Logout
        </button>

        <Link to="/formsubmit"
         
          className="mt-4 mx-6  bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300  "
        >
          Form
        </Link>

      </div>

      {/* Form Submissions */}
      <div className="mt-6 w-full max-w-3xl">
        {forms.length > 0 ? (
          forms.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-md p-6 rounded-md mb-4"
            >
              <h2 className="text-xl font-semibold text-gray-700">{item.name}</h2>
              <p className="text-gray-500">@{item.socialhandle}</p>

              {/* Display Images */}
              {item.image && Array.isArray(item.image) ? (
            <div className="mt-4 grid grid-cols-2 gap-4">
              {item.image.map((img, imgIndex) => (
                <img
                  key={imgIndex}
                  src={img}
                  alt={`${item.name} - Image ${imgIndex + 1}`}
                  className="w-full h-auto rounded-md"
                />
              ))}
            </div>
          ) : (
            // If it's not an array but a single image, display it
            item.image && (
              <img
                src={item.image}
                alt={item.name}
                className="mt-4 w-full h-auto rounded-md"
              />
            )
          )}
        </div>
      ))
    ) : (
      <p className="text-gray-500 text-center">No submissions found.</p>
    )}
      </div>
    </div>
  )
}

export default Home