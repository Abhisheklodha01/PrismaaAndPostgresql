import prisma from '../db/index.js'

// insert operation
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
            data: {
                name: name,
                email: email,
                password: password
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

// update operation

export const forgotPassword = async (req, res) => {
    const { password, email } = req.body
    try {
        const existedUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if (!existedUser) {
            return res.status(400).json({
                message: `user does not exists with this email ${email}`
            })
        }
        await prisma.user.update({
            where: {
                email
            },
            data: {
                password
            }
        })

        return res.status(200).json({
            message: "Password change successfully"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
        // include: {
        //     post:{
        //         select:{
        //             title:true,
        //             description:true,
        //             comment_count:true,
        //             id:true
        //         }
        //     }
        // }
        select:{
            _count:{
                select:{
                    post:true,
                    comment:true
                }
            }
        }
    })
    return res.status(200).json({
     message: "users and post find successfully",
     users
    })
  } catch (error) {
     return res.status(500).json({
            message: "Internal server error"
        })
   }
}

export const getUserByID = async (req, res) => {
    const id = req.params.id
  try {
    const user = await prisma.user.findFirst({
        where:{
            id:Number(id)
        }
    })
    return res.status(200).json({
     message: "users find successfully",
     user
    })
  } catch (error) {
     return res.status(500).json({
            message: "Internal server error",
            error
        })
   }
}
export const deleteUser = async (req, res) => {
    const id = req.params.id
  try {
    const response = await prisma.user.delete({
        where:{
            id:Number(id)
        }
    })
    return res.status(200).json({
     message: "users deleted successfully",
     response
    })
  } catch (error) {
     return res.status(500).json({
            message: "Internal server error",
            error
        })
   }
}