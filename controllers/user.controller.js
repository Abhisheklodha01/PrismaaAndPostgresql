import prisma from '../db/index.js'

export const registerUser = async (req, res) => {
    const { email, name, password } = req.body

    try {
        const existedUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if (existedUser) {
            return res.status(400).json({
                message: "Email already exists please login"
            })
        }
        const newUser = await prisma.user.create({
            data:{
                name:name,
                email: email,
                password:password
            }
        })

        return res.status(200).json({
            message: "Register successfully",
            user: newUser
        })
    } catch (error) {
       return res.status(500).json({
        message: "Internal server error"
       })
    }
}