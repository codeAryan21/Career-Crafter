import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
import dotenv from "dotenv"

dotenv.config({
    path: "./.env"
});

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // console.log("File is uploaded on cloudinary ", response.url);

        // Once the file has been uploaded remove it from the localPath
        fs.unlinkSync(localFilePath)
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath)
        return null;
    }
}

const deleteFromCloudinary = async (publicId, resourceType) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId, 
            { resource_type: resourceType }
        );
        // console.log("Successfully deleted from cloudinary : ", publicId);
        return result;
    } catch (error) {
        console.log("Error while deleting from cloudinary", error);
        return null;
    }
}

export { uploadOnCloudinary , deleteFromCloudinary}