import express from 'express'
import dotenv from 'dotenv';
import AuthRouter from './Routes/AuthRouter.js'
import FormRouter from './Routes/FormRouter.js'
import connectDB from './Models/db.js';
import bodyParser from 'body-parser';
import cors from 'cors'


import fileUpload from 'express-fileupload';
import { cloudinaryConnect } from './clodinary/Cloudinary.js';

const app=express();
dotenv.config();

const PORT=process.env.PORT || 8080

app.get('/',(req,res)=>{
    res.send('enter')
})

app.use(express.json())
app.use(cors())


app.use(
    fileUpload({
      useTempFiles: true,
      tempFileDir: "/tmp/", // Temporary directory for file uploads
    })
  );

cloudinaryConnect();

app.use('/auth',AuthRouter)
app.use('/form',FormRouter)


app.listen(PORT,()=>{
    connectDB()
    console.log(`server is running on  ${PORT}`)
})