import {Router} from 'express'
import { forgotPassword, registerUser } from '../controllers/user.controller.js'


const router = Router()

router.post("/register", registerUser)
router.put("/forgot-password", forgotPassword)

export default router