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
        const url="http://localhost:8000/form/formsubmission"

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
    <div>
      <h1>Form Submission</h1>

      <form onSubmit={handlesubmit} >

        <div>
        <label htmlFor="name">Name :</label>
        <input  onChange={handleChange}
         type="text"
        name='name'
        placeholder='enter your name'
        value={submitInfo.name}
        />
        </div>

        <div>
        <label htmlFor="socialhandle">socialhandle :</label>
        <input  onChange={handleChange} type="text"
        name='socialhandle'
        placeholder='enter your socialhandle name'
        value={submitInfo.socialhandle}
        />
        </div>

        <div>
        <label  htmlFor="image">Image :</label>
        <input    type="file"
        name='image'
        multiple
        onChange={handleFileChange} 
        />
        
        </div>

        <button>Submit</button>
       
      </form>
  <ToastContainer/>
    </div>
  )
}

export default Formsubmit