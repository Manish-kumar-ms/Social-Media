import { uploadImageToCloudinary } from "../clodinary/Utils.js";
import UserForm from "../Models/Form.js";

export const formsubmission=async(req,res)=>{
    try {
        
       const{name,socialhandle}=req.body;

       
       if(!name || !socialhandle ){
        return res.status(404)
        .json({message:"something is missing in both",
            success:false,
        })
       }



     const alreadyexist= await UserForm.findOne({socialhandle})

     if(alreadyexist){
        return res.status(400)
        .json({message:"user already submit the form",
            success: false
        })
     }
      
   

      // Array to hold the URLs of uploaded images
    const uploadedImages = [];

    // Get the files from the request
    const files = Array.isArray(req.files.image)
      ? req.files.image
      : [req.files.image];

    // Upload each file to Cloudinary
    for (const file of files) {
      const image = await uploadImageToCloudinary(
        file,
        process.env.FOLDER_NAME,
        1000,
        1000
      );
      uploadedImages.push(image.secure_url); // Save the secure URL of the uploaded image
    }



       await UserForm.create({
        name,
        socialhandle,
        image :uploadedImages
       })
       
       return res.status(201)
      .json({message:"from submission is sucessfull",
          success: true
      })


    } catch (error) {
        console.log(error)
        return res.status(400)
        .json({message:"there is some problem on form submisssion",
            success: false
        })
    }
}


export const getallsubmission=async(req,res)=>{
       try {
        const submission=await UserForm.find();

        if(!submission){
            return res.status(404).json({
            message:"No one submit the form yet",
        success:false
        })
        }

        return res.status(200).json({
            message:"fetch all the submission",
            success:true,
            data:submission
        })

        
       } catch (error) {
        return res.status(500).json({
            message: "Failed to fetch submissions",
            success: false,
            error: error.message,
          });
       }
}