import UserModel from "../Models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


export const signup=async(req,res)=>{
    try {
        const {name,email,password}=req.body
        if(!name || !email || !password){
            return res.status(400)
            .json({message:"something went wrong",
                success:false
            })
        }

        const user=await UserModel.findOne({email})
        if(user){
            return res.status(400)
            .json({message:"user already exist",
                success:false
            })
            
        }

        const hashedpassword=await bcrypt.hash(password,10)

        await UserModel.create({
            name,email,
            password:hashedpassword
        })

        return res.status(201).json({message:"account is created",
            success:true
        })


    } catch (error) {
        console.log(error)
        return res.status(400)
        .json({message:"there is some problem on registartion",
            success: false
        })
    }


}

export const login=async(req,res)=>{
      try {
        const {email,password}=req.body

        const user=await UserModel.findOne({email})
        
        if(!user){
            return res.status(403).
            json({message:"user not found with this mail",
                success:false
            })
        }

        const isequal=await bcrypt.compare(password,user.password)

        if(!isequal){
            return res.status(403)
            .json ({message :"user and password is wrong",success:false})
        }

        const jwtToken=jwt.sign(
            {email:user.email, _id:user._id},
            process.env.JWT_SECRET,
            {expiresIn :'24h'}
        )

        
      return res.status(201)
      .json({
          message:"login sucess",
          success: true,
          jwtToken,
          email,
          name:user.name
      })



      } catch (error) {
        console.log(error)
        return res.status(400)
        .json({message:"there is some problem on registartion",
            success: false
        })
    }
}