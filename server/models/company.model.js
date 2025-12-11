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
        resetPasswordToken: {
            type: String,
        },
        resetPasswordExpires: {
            type: Date
        }
    },{ timestamps: true }
)

export const Company = mongoose.model("Company",companySchema);