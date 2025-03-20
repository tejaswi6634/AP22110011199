import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    postId: { type: Number, required: true },
    content: { type: String, required: true }
});

const comments = mongoose.model("Comment", CommentSchema);
export default comments;
