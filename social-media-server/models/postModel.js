import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    userId: { type: Number, required: true },
    content: { type: String, required: true }
});

const posts = mongoose.model("Post", PostSchema);

export default posts;
