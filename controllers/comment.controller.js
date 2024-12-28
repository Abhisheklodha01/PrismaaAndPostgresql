import prisma from "../db/index.js";

// insert operation
export const postComment = async (req, res) => {
    const { userId, postId, comment } = req.body;

    try {
        await prisma.post.update({
            where: {
                id: Number(postId),
            },
            data: {
                comment_count: {
                    increment: 1,
                },
            },
        });
        const newComment = await prisma.comment.create({
            data: {
                userId: Number(userId),
                postId: Number(postId),
                comment,
            },
        });

        return res.status(200).json({
            message: "Comment Posted successfully",
            comment: newComment,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error,
        });
    }
};

export const getComments = async (req, res) => {
    try {
        const comments = await prisma.comment.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                post: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                            },
                        },
                    },
                },
            },
        });
        return res.status(200).json({
            message: "Comments find successfully",
            comments,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error,
        });
    }
};

export const getCommentByID = async (req, res) => {
    const id = req.params.commentid;
    try {
        const user = await prisma.comment.findFirst({
            where: {
                id: id,
            },
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
                post: {
                    include: {
                        user: {
                            select: {
                                name: true,
                                email: true,
                            },
                        },
                    },
                },
            },
        });
        return res.status(200).json({
            message: "Comment find successfully",
            user,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error,
        });
    }
};
export const deleteComment = async (req, res) => {
    const id = req.params.commentid;
    const { postId } = req.body
    try {
        await prisma.post.update({
            where: {
                id: Number(postId),
            },
            data: {
                comment_count: {
                    decrement: 1,
                },
            },
        });
        const response = await prisma.comment.delete({
            where: {
                id,
            },
        });
        return res.status(200).json({
            message: "Comment deleted successfully",
            response,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error,
        });
    }
};

export const updateComment = async (req, res) => {
    const { comment, commentId } = req.body;
    try {
        await prisma.comment.update({
            where: {
                id: commentId,
            },
            data: {
                comment
            },
        });

        return res.status(200).json({
            message: "Comment Updated successfully",
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};
