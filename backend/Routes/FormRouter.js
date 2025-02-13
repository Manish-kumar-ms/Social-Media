import express from 'express'
import { formsubmission, getallsubmission } from '../controller/Formcontroller.js'
import { ensureAuthenticated } from '../Middlewares/Auth.js'

const router=express.Router()

router.post('/formsubmission',formsubmission)

router.get('/getallsubmission',ensureAuthenticated,getallsubmission)

export default router
