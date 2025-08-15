import { Job } from "../models/job.model.js"
import { JobApplication } from "../models/jobApplication.model.js"
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"

// Get user data
const getUserData = async (req, res) => {

    // whenever we pass the token from frontend then our clerk middleware will convert the token into the .auth object that contains the userId and user details.
    const userId = req.auth.userId
    const user = await User.findById(userId)
    if(!user){
        throw new ApiError(404, "User not found!");
    }

    return res.status(200).json(new ApiResponse(200, user, "User data fetched successfully"));
}

// Apply for a job
const applyForJob = async (req, res) => {
    const { jobId } = req.body
    const userId = req.auth.userId
    const user = User.findById(userId)
    if(!user){
        throw new ApiError(404, "User not found");
    }

    const isAlreadyApplied = await JobApplication.find({ jobId, userId})
    if(isAlreadyApplied.length > 0){
        throw new ApiError(401, "Already applied for the job")
    }

    const job = await Job.findById(jobId)
    if(!job){
        throw new ApiError(404, "Job with this jobId not found");
    }

    const jobApplication = await JobApplication.create({
        userId,
        companyId: job.companyId,
        jobId
    })

    return res.status(200).json(new ApiResponse(200,"Successfully applied for the job"));
}

// Get user applied applications
const getUserJobApplications = async (req, res) => {
    const userId = req.auth.userId
    const user = User.findById(userId)
    if(!user){
        throw new ApiError(404, "User not found");
    }

    const applications = await JobApplication.find({ userId })
    .populate('companyId','name email image')
    .populate('jobId', 'title description category location level salary')
    .exec()

    if(!applications){
        throw new ApiError(404, "Applications not found for this user")
    }

    return res.status(200).json(new ApiResponse(200, applications, "Successfully fetched the user job applications"))
}

// Update user profile (resume)
const updateUserResume = async (req, res) => {
    const userId = req.auth.userId
    const user = User.findById(userId)
    if(!user){
        throw new ApiError(404, "User not found");
    }

    const resumeLocalPath = req.file?.path;
    if (!resumeLocalPath) {
        throw new ApiError(400, "Resume file is required")
    }

    let resume;
    try {
        resume = await uploadOnCloudinary(resumeLocalPath)
        console.log("Resume uploaded successfully", resume);

    } catch (error) {
        console.log("Error while uploading resume", error);
        throw new ApiError(500, "Failed to upload resume")
    }

    // Update the resume
    user.resume = resume.url
    await user.save()

    return res.status(200).json(new ApiResponse(200,null,"Resume updated successfully"))
}

export { getUserData , applyForJob, getUserJobApplications, updateUserResume }