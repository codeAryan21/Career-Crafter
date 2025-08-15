import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Job } from "../models/job.model.js";
import { isValidObjectId } from "mongoose";

// Get all Jobs
const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ visible: true })
            .populate({ path: 'companyId', select: '-password' })

        return res.status(200).json(new ApiResponse(200, jobs, "Jobs fetched successfully"));
    } catch (error) {
        throw new ApiError(400, "Error while fetching jobs");
    }
}


// Get single job by Id
const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        if (!isValidObjectId(jobId)) {
            throw new ApiError(400, "Job ID is not valid")
        }

        const job = await Job.findById(jobId).populate({ path: 'companyId', select: '-password' })
        if (!job) {
            throw new ApiError(404, "Job not found")
        }

        return res.status(200).json(new ApiResponse(200, job , "Successfully fetched the Job by ID"));
    } catch (error) {
        console.error("Actual error while fetching job by ID:", error);
        throw new ApiError(400, "Error while fetching job by ID");
    }
}

export { getJobs, getJobById };