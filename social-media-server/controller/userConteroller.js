import User from "../models/usermodel.js";
import Post from "../models/PostModel.js";
import Comment from "../models/commentsModel.js";

export const getTopUsersByPosts = async (req, res) => {
    try {
        const topUsers = await User.aggregate([
            {
                $lookup: {
                    from: "posts", 
                    localField: "_id",
                    foreignField: "userId",
                    as: "userPosts"
                }
            },
            {
                $addFields: {
                    postCount: { $size: "$userPosts" } 
                }
            },
            {
                $sort: { postCount: -1 } 
            },
            {
                $limit: 5 
            },
            {
                $project: {
                    _id: 1,
                    username: 1,
                    email: 1,
                    profilePicture: 1,
                    postCount: 1
                }
            }
        ]);

        res.status(200).json({ success: true, topUsers });
    } catch (error) {
        console.error("Error fetching top users:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
export const getUserPosts = async (req, res) => {
    try {
        const { userid } = req.params;

       
        const userPosts = await Post.find({ userId: userid }).select("id userId content");

        if (!userPosts.length) {
            return res.status(404).json({ success: false, message: "No posts found for this user" });
        }

        res.status(200).json({ success: true, posts: userPosts });
    } catch (error) {
        console.error("Error fetching user posts:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
export const getPostComments = async (req, res) => {
    try {
        const { postid } = req.params;

        
        const postComments = await Comment.find({ postid }).select("id postid content");

        if (!postComments.length) {
            return res.status(404).json({ success: false, message: "No comments found for this post" });
        }

        res.status(200).json({ success: true, comments: postComments });
    } catch (error) {
        console.error("Error fetching post comments:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};