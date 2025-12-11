import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        fullName: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        resume: {
            type: String
        },
        resetPasswordToken: {
            type: String,
        },
        resetPasswordExpires: {
            type: Date
        },
        image: {
            type: String, // cloudinary url
            required: true
        }
    },
    { timestamps: true }
);

export const User = mongoose.model("User", userSchema);