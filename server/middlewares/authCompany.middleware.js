import { Company } from "../models/company.model.js";
import jwt from "jsonwebtoken"
import { ApiError } from "../utils/ApiError.js";

export const verifyCompanyJWT = async (req,res,next) => {
    try {
        const token = req.headers.token || req.headers.authorization?.split(" ")[1];
        if(!token){
            throw new ApiError(401, "Unauthorized request")
        }

        const decodedToken = jwt.verify(token,process.env.JWT_TOKEN_SECRET)
        
        const company = await Company.findById(decodedToken?.id).select("-password")
        if (!company) {
            throw new ApiError(401, "Invalid Access Token")
        }
    
        req.company = company;
        next()

    } catch (error) {
        console.log("Error:", error);
        throw new ApiError(401, error?.message || "Invalid access token")
    }
}