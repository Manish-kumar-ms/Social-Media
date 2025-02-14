import React, { useState } from 'react'
import { handleError, handleSucess } from '../Utils.js';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const Formsubmit = () => {
    const [submitInfo,setsubmitInfo]=useState({
        name:"",
        socialhandle:"",
        image:[],
    })

    const navigate = useNavigate();
    const handleChange=(e)=>{
      const {name,value}=e.target;

      setsubmitInfo({... submitInfo , [name]:value})

    }


    const handleFileChange = (e) => {
      const files = e.target.files; // Access all selected files
      setsubmitInfo({ ...submitInfo, image: files }); // Store the FileList object
    };

    const handlesubmit=async(e)=>{
      e.preventDefault()

      const {name,socialhandle,image}=submitInfo

      if(!name || !socialhandle || !image){
        return handleError("name handle and image is not found")

      }

      try {
        const url="https://social-media-1-50hs.onrender.com/form/formsubmission"

         // Create FormData to send file along with other fields
      const formData = new FormData();
      formData.append("name", name);
      formData.append("socialhandle", socialhandle);
      // Array.from(image).forEach((image) => formData.append("image", image));
      for (let i = 0; i < image.length; i++) {
        formData.append("image", image[i]);
      }

        const response= await fetch(url,{
           method: "POST",
           body: formData,
        })

        if (!response.ok) {
          // If the response is not successful (status 4xx or 5xx)
          const result = await response.json();
          return handleError(result.message || "An error occurred.");
        }

        const result= await response.json()

        const {success,message,error}=result
        if(success){
          handleSucess(message)
          setTimeout(() => {
            navigate('/home')
          }, 1000);
        }
        else if(error){
          const details=error?.details[0].message
          console.log(details)
        }
  

      } catch (error) {
        handleError(error)
      }


    }

    
  return (
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
  <div class="bg-white p-6 rounded-2xl shadow-md w-full max-w-md">
    <h1 class="text-2xl font-bold mb-6 text-center text-gray-700">Form Submission</h1>

    <form onSubmit={handlesubmit} class="space-y-4">
      <div>
        <label htmlFor="name" class="block text-gray-600 font-medium mb-1">Name:</label>
        <input
          onChange={handleChange}
          type="text"
          name="name"
          placeholder="Enter your name"
          value={submitInfo.name}
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="socialhandle" class="block text-gray-600 font-medium mb-1">Social Handle:</label>
        <input
          onChange={handleChange}
          type="text"
          name="socialhandle"
          placeholder="Enter your social handle"
          value={submitInfo.socialhandle}
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="image" class="block text-gray-600 font-medium mb-1">Image:</label>
        <input
          type="file"
          name="image"
          multiple
          onChange={handleFileChange}
          class="w-full text-gray-600 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-blue-500 file:text-white hover:file:bg-blue-600"
        />
      </div>

      <button class="w-full bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition duration-300">Submit</button>
    </form>

    <ToastContainer />
  </div>
</div>

  )
}

export default Formsubmit