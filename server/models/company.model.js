import mongoose, {Schema} from "mongoose";

const companySchema = Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true, 
        },
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        image: {
            type: String, // cloudinary url
            required: true,
        },
        // Company Profile Details
        description: {
            type: String,
            default: ""
        },
        website: {
            type: String,
            default: ""
        },
        industry: {
            type: String,
            default: ""
        },
        companySize: {
            type: String,
            enum: ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'],
            default: '1-10'
        },
        location: {
            type: String,
            default: ""
        },
        founded: {
            type: String,
            default: ""
        },
        resetPasswordToken: {
            type: String,
        },
        resetPasswordExpires: {
            type: Date
        },
        refreshToken: {
            type: String
        }
    },{ timestamps: true }
)

export const Company = mongoose.model("Company",companySchema);