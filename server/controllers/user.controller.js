import { Job } from "../models/job.model.js"
import { JobApplication } from "../models/jobApplication.model.js"
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js"
import bcrypt from 'bcrypt'
import { generateToken } from "../utils/generateToken.js"

// register user
const registerUser = async (req, res) => {
    const { fullName, email, username, password } = req.body

    // Validation
    if (!fullName) throw new ApiError(400, "Fullname is required");
    if (!email) throw new ApiError(400, "Email is required");
    if (!username) throw new ApiError(400, "Username is required");
    if (!password) throw new ApiError(400, "Password is required");

    // Check if user already exist or not
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }

    const imageLocalPath = req.file?.path;
    if (!imageLocalPath) {
        throw new ApiError(400, "Image file is required")
    }

    let image;
    try {
        image = await uploadOnCloudinary(imageLocalPath)
        console.log("Image uploaded successfully", image);

    } catch (error) {
        console.log("Error while uploading image", error);
        throw new ApiError(500, "Failed to upload image");
    }

    // check password length
    if (password.length < 6) {
        throw new ApiError(400, "Password must be at least 6 characters long");
    }

    // Encrypt the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt)

    try {
        const user = await User.create({
            username: username.toLowerCase(),
            fullName,
            email,
            password: hashPassword,
            image: image.url,
        })

        const createdUser = await User.findById(user._id).select("-password")
        if (!createdUser) {
            throw new ApiError(500, "Something went wrong while registering the user")
        }

        const token = generateToken(user._id)

        return res.status(201).json(new ApiResponse(200, { createdUser, token }, "Account created Successfully"))
    } catch (error) {
        console.log("User creation failed", error);

        if (image) {
            await deleteFromCloudinary(image.public_id, "image")
        }

        throw new ApiError(500, "Something went wrong while registering a user and images were deleted")
    }
}

// login user
const loginUser = async (req, res) => {
    const { email, username, password } = req.body

    if (!username && !email) {
        throw new ApiError(400, "username or email is required")
    }
    if (!password) {
        throw new ApiError(400, "Password is required")
    }

    const user = await User.findOne({
        $or: [{ username }, { email }]
    })
    if (!user) {
        throw new ApiError(404, "User does not exist")
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials")
    }

    const token = generateToken(user._id)

    const loggedInUser = await User.findById(user._id).select("-password")

    return res.status(201).json(new ApiResponse(201, { user: loggedInUser, token }, "User loggedIn Successfully"));
}

// Get user data
const getUserData = async (req, res) => {

    // whenever we pass the token from frontend then our clerk middleware will convert the token into the .auth object that contains the userId and user details.
    const userId = req.user._id
    const user = await User.findById(userId)
    if (!user) {
        throw new ApiError(404, "User not found!");
    }

    return res.status(200).json(new ApiResponse(200, user, "User data fetched successfully"));
}

// Apply for a job
const applyForJob = async (req, res) => {
    const { jobId } = req.body
    const userId = req.user._id
    const user = User.findById(userId)
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const isAlreadyApplied = await JobApplication.find({ jobId, userId })
    if (isAlreadyApplied.length > 0) {
        throw new ApiError(401, "Already applied for the job")
    }

    const job = await Job.findById(jobId)
    if (!job) {
        throw new ApiError(404, "Job with this jobId not found");
    }

    const jobApplication = await JobApplication.create({
        userId,
        companyId: job.companyId,
        jobId
    })

    return res.status(200).json(new ApiResponse(200, "Successfully applied for the job"));
}

// Get user applied applications
const getUserJobApplications = async (req, res) => {
    const userId = req.user._id
    const user = await User.findById(userId)
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const applications = await JobApplication.find({ userId })
        .populate('companyId', 'name email image')
        .populate('jobId', 'title description category location level salary')
        .exec()

    return res.status(200).json(new ApiResponse(200, applications, "Successfully fetched the user job applications"))
}

// update user profile details
const updateProfileDetails = async (req, res) => {
    const { fullName, username } = req.body

    if (!fullName) {
        throw new ApiError(400, "Fullname is required")
    }
    if (!username) {
        throw new ApiError(400, "Username is required")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                fullName,
                username
            }
        }, { new: true }
    ).select("-password")

    return res.status(200).json(new ApiResponse(200, user, "Profile details updated successfully"))
}

// update user Cover Image
const updateUserImage = async (req, res) => {
    try {
        const imageLocalPath = req.file?.path
        if (!imageLocalPath) {
            throw new ApiError(400, "Image file is missing")
        }

        // Deleting the previous image
        const userimage = await User.findById(req.user._id).select("image");
        if (userimage.image) {
            const publicId = userimage.image.split("/").pop().split(".")[0];
            await deleteFromCloudinary(publicId, "image");
        }

        const image = await uploadOnCloudinary(imageLocalPath)

        if (!image.url) {
            throw new ApiError(400, "Error while uploading image")

        }

        const user = await User.findByIdAndUpdate(
            req.user?._id,
            {
                $set: {
                    image: image.url
                }
            },
            { new: true }
        ).select("-password")

        return res.status(200).json(new ApiResponse(200, user, "Image updated successfully"))
    } catch (error) {
        throw new ApiError(500, error.message || "Failed to update image");
    }
}

// change current password
const changeCurrentPassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body
    if (!oldPassword || !newPassword) {
        throw new ApiError(400, "Old and new password are required");
    }

    const user = await User.findById(req.user?._id)
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // Verify old password
    const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password)
    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid old password")
    }

    // user does not use same password
    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
        throw new ApiError(400, "New password cannot be the same as old password");
    }

    // check password length
    if (newPassword.length < 6) {
        throw new ApiError(400, "Password must be at least 6 characters long");
    }

    // Encrypt the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save({ validateBeforeSave: false })

    return res.status(200) .json(new ApiResponse(200, { logout: true }, "Password changed successfully. Please log in again."));
}

// Update user resume
const updateUserResume = async (req, res) => {
    const resumeLocalPath = req.file?.path
    if (!resumeLocalPath) {
        throw new ApiError(400, "Resume file is missing")
    }

    const userResume = await User.findById(req.user._id).select("resume");
    if (userResume.resume) {
        const publicId = userResume.resume.split("/").pop().split(".")[0];
        await deleteFromCloudinary(publicId, "image");
    }

    const resume = await uploadOnCloudinary(resumeLocalPath)

    if (!resume.url) {
        throw new ApiError(400, "Error while uploading image")

    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                resume: resume.url
            }
        },
        { new: true }
    ).select("-password")

    return res.status(200).json(new ApiResponse(200, null, "Resume updated successfully"))
}

export { registerUser, loginUser, getUserData, applyForJob, getUserJobApplications, updateUserResume, 
        changeCurrentPassword, updateProfileDetails, updateUserImage }