import {Router} from 'express'
import { forgotPassword, getUserByID, getUsers, registerUser } from '../controllers/user.controller.js'


const router = Router()

router.post("/register", registerUser)
router.put("/forgot-password", forgotPassword)
router.get("/getusers", getUsers)
router.get("/getuser/:id", getUserByID)


export default router