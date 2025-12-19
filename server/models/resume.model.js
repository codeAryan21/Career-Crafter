import mongoose, { Schema } from "mongoose";

const resumeSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        template: {
            type: String,
            enum: ['modern', 'classic', 'creative'],
            default: 'modern'
        },
        personalInfo: {
            fullName: String,
            email: String,
            phone: String,
            address: String,
            linkedin: String,
            github: String
        },
        summary: String,
        experience: [{
            company: String,
            position: String,
            startDate: Date,
            endDate: Date,
            current: Boolean,
            description: String
        }],
        education: [{
            institution: String,
            degree: String,
            field: String,
            startDate: Date,
            endDate: Date,
            gpa: String
        }],
        skills: [String],
        projects: [{
            name: String,
            description: String,
            technologies: [String],
            url: String
        }],
        certifications: [{
            name: String,
            issuer: String,
            date: Date,
            url: String
        }]
    }, { timestamps: true }
);

export const Resume = mongoose.model("Resume", resumeSchema);