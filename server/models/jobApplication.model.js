import mongoose, { Schema } from "mongoose";

const jobApplicationSchema = Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        companyId: {
            type: Schema.Types.ObjectId,
            ref: "Company",
            required: true
        },
        jobId: {
            type: Schema.Types.ObjectId,
            ref: "Job",
            required: true
        },
        status: {
            type: String,
            default: "Pending"
        }
        
    },{ timestamps: true }
)

export const JobApplication = mongoose.model("JobApplication", jobApplicationSchema)