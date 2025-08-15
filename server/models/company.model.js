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
            lowecase: true,
            trim: true, 
        },
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        image: {
            type: String, // cloudinary url
            required: true,
        }
    },{ timestamps: true }
)

export const Company = mongoose.model("Company",companySchema);