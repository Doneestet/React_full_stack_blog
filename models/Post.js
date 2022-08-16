import mongoose from "mongoose";


//It's our user & his types for Db
const PostSchema = new mongoose.Schema(
    
    {
        title: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: true,
            unique: true,
        },
        tags: {
            type: Array,
            default: [],
        },
        viewsCount: {
            type: Number,
            default: 0,
        },
        //connection between two files to connect user with his post
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },

        imageUrl: String,

    },
    {
        timestamps: true,
    }
);

export default mongoose.model('Post', PostSchema);