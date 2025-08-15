import mongoose, {Schema} from "mongoose";

const userSchema = new Schema(
    {
        _id: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true, 
            index: true
        },
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowecase: true,
            trim: true, 
        },
        resume: {
            type: String, 
        },
        image: {
            type: String, // cloudinary url
            required: true,
        }
    },{ timestamps: true }
)

export const User = mongoose.model("User", userSchema)