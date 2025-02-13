import express from 'express'
import { loginValidation, signupValidation } from '../Middlewares/AuthValidation.js'
import { login, signup } from '../controller/Authcontroller.js'
import { formsubmission } from '../controller/Formcontroller.js'

const router=express.Router()

router.post('/login',loginValidation,login)
router.post('/signup',signupValidation,signup)


export default router