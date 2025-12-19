import { Company } from "../models/company.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import bcrypt from 'bcrypt'
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js"
import { generateToken } from "../utils/generateToken.js"
import { Job } from "../models/job.model.js"
import { isValidObjectId } from "mongoose"
import { JobApplication } from "../models/jobApplication.model.js"

// Register a new company
const registerCompany = async (req, res) => {
    const { name, email, password } = req.body
    // Validation
    if ([name, email, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required")
    }

    const existedCompany = await Company.findOne({ email })
    if (existedCompany) {
        throw new ApiError(409, "Company with this email already exists")
    }

    const imageLocalPath = req.file?.path;
    if (!imageLocalPath) {
        throw new ApiError(400, "Image file is required")
    }

    let image;
    try {
        image = await uploadOnCloudinary(imageLocalPath)
        // console.log("Image uploaded successfully", image);

    } catch (error) {
        console.log("Error while uploading image", error);
        throw new ApiError(500, "Failed to upload image")
    }

    // check password strength
    if (password.length < 8) {
        throw new ApiError(400, "Password must be at least 8 characters long");
    }
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(password)) {
        throw new ApiError(400, "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character");
    }

    // Encrypt the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt)

    try {
        const company = await Company.create({
            name,
            email,
            password: hashPassword,
            image: image.url,
        })
        // console.log("Company created:", company);

        const createdCompany = await Company.findById(company._id).select("-password")
        if (!createdCompany) {
            throw new ApiError(500, "Something went wrong while registering a company")
        }

        const token = generateToken(company._id)

        // Set httpOnly cookie
        res.cookie('companyToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 30 * 24 * 60 * 60 * 1000
        });

        return res.status(201).json(new ApiResponse(200, { company: createdCompany, token }, "Company registered Successfully"));

    } catch (error) {
        console.log("Company creation failed");

        if (image) {
            await deleteFromCloudinary(image.public_id, "image")
        }

        throw new ApiError(500, "Something went wrong while registering a company and image were deleted")
    }

}

// Company login
const loginCompany = async (req, res) => {
    const { email, password } = req.body
    if (!email) {
        throw new ApiError(400, "Email is required")
    }
    if (!password) {
        throw new ApiError(400, "Password is required")
    }

    const company = await Company.findOne({ email })
    if (!company) {
        throw new ApiError(404, "Company with this email does not exist");
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, company.password)
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid email or password")
    }

    const token = generateToken(company._id)
    const loggedInUser = await Company.findById(company._id).select("-password")

    // Set httpOnly cookie
    res.cookie('companyToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 30 * 24 * 60 * 60 * 1000
    });

    return res.status(201).json(new ApiResponse(201, { company: loggedInUser, token }, "User loggedIn Successfully"));
}

// Get company data
const getCompanyData = async (req, res) => {
    const company = req.company
    return res.status(200).json(new ApiResponse(200, company, "Successfully fetched company data"));
}

// Post a new job
const postJob = async (req, res) => {
    const { title, description, category, level, location, salary } = req.body
    function isEmptyDescription(desc) {
        // !desc: Checks if desc is falsy (null, undefined, or empty string). If so, returns true (description is empty) || Remove HTML tags and whitespace
        return !desc || desc.replace(/<[^>]*>/g, '').trim() === '';
    }

    if(!title) throw new ApiError(400, "Title is required");
    if (isEmptyDescription(description)) throw new ApiError(400, "Description is required");
    if(!salary) throw new ApiError(400, "Salary is required");

    const companyId = req.company?._id;
    console.log(companyId);

    try {
        const newJob = new Job({
            title,
            description,
            location,
            salary,
            category,
            level,
            companyId
        })

        await newJob.save();

        return res.status(200).json(new ApiResponse(200, newJob, "Job added successfully"));
    } catch (error) {
        throw new ApiError(401, error.message);
    }

}

// Get company Job applicants
const getCompanyJobApplicants = async (req, res) => {
    const companyId = req.company._id

    // Find job applications for the user and populate related data
    const applications = await JobApplication.find({companyId})
    .populate('userId','fullName image resume')
    .populate('jobId','title category location salary level')
    .exec()

    return res.status(200).json(new ApiResponse(200, applications, "Fetched company job applicants"));
}

// Get company posted Jobs
const getCompanyPostedJobs = async (req, res) => {
    const companyId = req.company._id
    const jobs = await Job.find({ companyId })

    // Adding no. of applicants info in data
    const jobsData = await Promise.all(jobs.map(async (job) => {
        const applicants = await JobApplication.find({jobId: job._id});
        return {...job.toObject(), applicants: applicants.length};
    }))

    return res.status(200).json(new ApiResponse(200, jobsData, "Successfully gets the company posted jobs"));
}

// Change Job application status
const changeJobApplicationStatus = async (req, res) => {
    const {id, status} = req.body

    // Find job application data and update status
   const updated = await JobApplication.findOneAndUpdate(
        { _id: id },
        { status },
        { new: true }
    );

    if (!updated) {
        throw new ApiError(404, "Job application not found");
    }

    return res.status(200).json(new ApiResponse(200, updated, "Job application status updated"));
} 

// Change Job visibility
const changeVisibility = async (req, res) => {
    const companyId = req.company._id
    const { jobId } = req.body
    if (!isValidObjectId(jobId)) {
        throw new ApiError(400,"Job ID is not valid")
    }

    const job = await Job.findById(jobId)
    if (!job) {
        throw new ApiError(404, "Job not found!");
    }

    // if the job matches with the companyId the only we change the visibility
    if (companyId.toString() == job.companyId.toString()) {
        job.visible = !job.visible
    }
    await job.save();

    return res.status(200).json(new ApiResponse(200, job, "Job visibility updated successfully"));
}

// Company logout
const logoutCompany = async (req, res) => {
    await Company.findByIdAndUpdate(
        req.company._id,
        {
            $unset: {
                refreshToken: 1
            }
        },
        { new: true }
    )

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
    }

    return res
        .status(200)
        .clearCookie("companyToken", options)
        .json(new ApiResponse(200, {}, "Company logged out successfully"));
};

// Update company profile
const updateCompanyProfile = async (req, res) => {
    const { description, website, industry, companySize, location, founded } = req.body;
    
    const company = await Company.findByIdAndUpdate(
        req.company._id,
        { 
            $set: {
                description: description || "",
                website: website || "",
                industry: industry || "",
                companySize: companySize || "1-10",
                location: location || "",
                founded: founded || ""
            }
        },
        { new: true }
    ).select('-password');

    if (!company) {
        throw new ApiError(404, "Company not found");
    }

    return res.status(200).json(
        new ApiResponse(200, company, "Company profile updated successfully")
    );
};

// Get public company profile (for users to view)
const getPublicCompanyProfile = async (req, res) => {
    const { companyId } = req.params;
    
    const company = await Company.findById(companyId)
        .select('-password -email -resetPasswordToken -resetPasswordExpires -refreshToken');
    
    if (!company) {
        throw new ApiError(404, "Company not found");
    }

    // Get company's active jobs count
    const activeJobsCount = await Job.countDocuments({ companyId, visible: true });
    
    return res.status(200).json(
        new ApiResponse(200, { ...company.toObject(), activeJobsCount }, "Company profile fetched successfully")
    );
};

// Get company analytics
const getCompanyAnalytics = async (req, res) => {
    const companyId = req.company._id;
    
    // Get total jobs posted
    const totalJobs = await Job.countDocuments({ companyId });
    const activeJobs = await Job.countDocuments({ companyId, visible: true });
    
    // Get total applications
    const totalApplications = await JobApplication.countDocuments({ companyId });
    
    // Get applications by status
    const pendingApplications = await JobApplication.countDocuments({ companyId, status: 'Pending' });
    const acceptedApplications = await JobApplication.countDocuments({ companyId, status: 'Accepted' });
    const rejectedApplications = await JobApplication.countDocuments({ companyId, status: 'Rejected' });
    
    // Get recent applications (last 30 days)
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const recentApplications = await JobApplication.countDocuments({ 
        companyId, 
        createdAt: { $gte: thirtyDaysAgo } 
    });
    
    // Get top performing jobs
    const topJobs = await JobApplication.aggregate([
        { $match: { companyId } },
        { $group: { _id: '$jobId', applicationCount: { $sum: 1 } } },
        { $sort: { applicationCount: -1 } },
        { $limit: 5 },
        { $lookup: { from: 'jobs', localField: '_id', foreignField: '_id', as: 'job' } },
        { $unwind: '$job' },
        { $project: { title: '$job.title', applicationCount: 1 } }
    ]);
    
    const analytics = {
        totalJobs,
        activeJobs,
        totalApplications,
        pendingApplications,
        acceptedApplications,
        rejectedApplications,
        recentApplications,
        topJobs
    };
    
    return res.status(200).json(
        new ApiResponse(200, analytics, "Analytics fetched successfully")
    );
};

// Delete job
const deleteJob = async (req, res) => {
    const { jobId } = req.body;
    const companyId = req.company._id;
    
    if (!isValidObjectId(jobId)) {
        throw new ApiError(400, "Invalid job ID");
    }
    
    const job = await Job.findById(jobId);
    if (!job) {
        throw new ApiError(404, "Job not found");
    }
    
    // Check if job belongs to company
    if (job.companyId.toString() !== companyId.toString()) {
        throw new ApiError(403, "Unauthorized to delete this job");
    }
    
    // Delete job applications for this job
    await JobApplication.deleteMany({ jobId });
    
    // Delete the job
    await Job.findByIdAndDelete(jobId);
    
    return res.status(200).json(
        new ApiResponse(200, {}, "Job deleted successfully")
    );
};

export {
    registerCompany, loginCompany, logoutCompany, getCompanyData, postJob, getCompanyJobApplicants, getCompanyPostedJobs,
    changeJobApplicationStatus, changeVisibility, updateCompanyProfile, getPublicCompanyProfile, getCompanyAnalytics, deleteJob
}