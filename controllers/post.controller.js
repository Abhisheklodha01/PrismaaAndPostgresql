import prisma from '../db/index.js'

// insert operation
export const createPost = async (req, res) => {
    const { userId, title, description } = req.body

    try {
        
        const newPost = await prisma.post.create({
            data: {
                userId:Number(userId),
                title,
                description
            }    
        })

        return res.status(200).json({
            message: "Post Created successfully",
            Post:newPost
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error
        })
    }
}


export const getPosts = async (req, res) => {
    try {
      const posts = await prisma.post.findMany({
        include:{
            comment:{
                include:{
                    user:{
                       select:{
                        name:true
                       }
                    }
                }
            }
        }
      })
      return res.status(200).json({
       message: "Posts find successfully",
       posts
      })
    } catch (error) {
       return res.status(500).json({
              message: "Internal server error"
          })
     }
  }

export const getPostByID = async (req, res) => {
    const id = req.params.postid
  try {
    const user = await prisma.post.findFirst({
        where:{
            id:Number(id)
        },
        include:{
            comment:{
                include:{
                    user:{
                        select:{
                         name:true
                        }
                     }
                }
            }
        }
    })
    return res.status(200).json({
     message: "post find successfully",
     user
    })
  } catch (error) {
     return res.status(500).json({
            message: "Internal server error",
            error
        })
   }
}
export const deletePost = async (req, res) => {
    const id = req.params.postid
  try {
    const response = await prisma.post.delete({
        where:{
            id:Number(id)
        }
    })
    return res.status(200).json({
     message: "Post deleted successfully",
     response
    })
  } catch (error) {
     return res.status(500).json({
            message: "Internal server error",
            error
        })
   }
}


export const updatePost = async (req, res) => {
    const { title, postId, description } = req.body
    try {
        await prisma.post.update({
            where: {
                id:Number(postId)
            },
            data: {
                title,
                description
            }
        })

        return res.status(200).json({
            message: "Post Updated successfully"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}