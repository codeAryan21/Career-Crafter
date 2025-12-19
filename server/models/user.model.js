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
        parsedResume: {
            skills: [String],
            experience: String,
            education: String,
            summary: String
        },
        preferences: {
            jobCategories: [String],
            locations: [String],
            salaryRange: {
                min: Number,
                max: Number
            }
        },
        profile: {
            skills: [String],
            experience: [{
                company: String,
                position: String,
                startDate: String,
                endDate: String,
                current: Boolean,
                description: String
            }],
            education: [{
                institution: String,
                degree: String,
                field: String,
                startDate: String,
                endDate: String,
                gpa: String
            }]
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
        },
        refreshToken: {
            type: String
        },
    }, { timestamps: true }
);

export const User = mongoose.model("User", userSchema);