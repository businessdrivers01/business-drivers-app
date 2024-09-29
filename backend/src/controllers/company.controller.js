import { Company } from '../models/company.model.js';
import { apiResponse } from '../utils/apiResponse.js';
import { apiError } from '../utils/apiError.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { validationResult } from 'express-validator';
import { configDotenv } from 'dotenv';
configDotenv();

const generateAccessAndRefreshTokens = async (companyId) => {
    try {
        const company = await Company.findById(companyId);
        if (!company) {
            throw new apiError(404, "Company not found.");
        }
        const accessToken = company.generateAccessToken();
        const refreshToken = company.generateRefreshToken();

        company.refreshToken = refreshToken;
        await company.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (err) {
        console.log(err.message);
        throw new apiError(500, "Something went wrong while generating access and refresh tokens.");
    }
};

// Register Company
const registerCompany = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(new apiResponse(400, null, 'Validation failed', errors.array()));
        }

        const { companyName, pocName, pocId, companyNtn, email, password, bio } = req.body;
        const proofOfRegistrationFeeFile = req.files['proofOfRegistrationFee'] ? req.files['proofOfRegistrationFee'][0] : null;
        const avatarFile = req.files['avatar'] ? req.files['avatar'][0] : null;

        // Check if the company already exists
        const existingCompany = await Company.findOne({ email });
        if (existingCompany) {
            return res.status(400).json(new apiResponse(400, null, 'Company already registered, Please login.'));
        }

        // Validate file uploads
        const avatarLocalPath = avatarFile ? avatarFile.path : null;
        const proofOfRegistrationFeeLocalPath = proofOfRegistrationFeeFile ? proofOfRegistrationFeeFile.path : null;

        if (!avatarLocalPath || !proofOfRegistrationFeeLocalPath) {
            throw new apiError(400, "Both Avatar and Proof of Registration Fee files are required.");
        }

        // Upload files to Cloudinary
        const avatar = await uploadOnCloudinary(avatarLocalPath);
        const proofOfRegistrationFee = await uploadOnCloudinary(proofOfRegistrationFeeLocalPath);

        if (!avatar || !proofOfRegistrationFee) {
            throw new apiError(400, "File uploads failed. Please try again.");
        }

        // Create new company object
        const newCompany = new Company({
            companyName,
            pocName,
            pocId,
            companyNtn,
            email,
            password,
            proofOfRegistrationFee: proofOfRegistrationFee.secure_url,
            avatar: avatar.secure_url,
            bio: bio || "Tell freelancers about your company.",
            refreshToken: ""
        });

        // Save company to the database
        const savedCompany = await newCompany.save();
        const { password: _password, ...companyWithoutPassword } = savedCompany.toObject();

        res.status(201).json(new apiResponse(201, companyWithoutPassword, 'Company registered successfully.'));
    } catch (err) {
        console.error(err);
        res.status(500).json(new apiError(500, "Server error. Company registration failed."));
    }
};


// Login Company
const loginCompany = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json(new apiError(400, "Both Email and Password are required."));
        }

        const company = await Company.findOne({ email });
        if (!company) {
            return res.status(404).json(new apiError(404, "Company with this email does not exist. Please Sign up first."));
        }

        const isPasswordCorrect = await company.comparePassword(password);
        if (!isPasswordCorrect) {
            return res.status(400).json(new apiError(400, "Invalid Password. Please try again."));
        }

        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(company._id);

        const loggedInCompany = await Company.findById(company._id).select("-password -refreshToken");

        const cookiesOptions = {
            httpOnly: true,
            secure: true,
            sameSite: 'strict'
        };

        return res.status(200)
            .cookie("accessToken", accessToken, cookiesOptions)
            .cookie("refreshToken", refreshToken, cookiesOptions)
            .json(new apiResponse(200, {
                company: loggedInCompany, accessToken, refreshToken
            }, "Company successfully logged in."));
    } catch (err) {
        console.error(err);
        return res.status(500).json(new apiError(500, "Server error. Could not log in the company."));
    }
};


// Company Profile
const getCompanyProfile = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json(new apiError(400, "Id not found in request body."));
        }

        const company = await Company.findById(id).select("-password -refreshToken");
        if (!company) {
            return res.status(404).json(new apiError(404, "Company not found."));
        }

        return res.status(200).json(new apiResponse(200, company, "Company profile fetched successfully."));
    } catch (err) {
        console.error(err);
        return res.status(500).json(new apiError(500, "Server error. Could not fetch company profile."));
    }
};


// Logout Company
const logoutCompany = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json(new apiError(400, "Id not found in request body."));
        }

        const company = await Company.findById(id);
        if (!company) {
            return res.status(404).json(new apiError(404, "Company not found."));
        }

        company.refreshToken = null;
        await company.save();

        const cookiesOptions = {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            expires: new Date(0)
        };

        return res.status(200)
            .cookie("accessToken", "", cookiesOptions)
            .cookie("refreshToken", "", cookiesOptions)
            .json(new apiResponse(200, null, "Company successfully logged out."));
    } catch (error) {
        return res.status(500).json(new apiError(500, "Server error during logout."));
    }
};

const inactiveCompanies = async (req, res) => {
    try {
        const companies = await Company.find({ isActive: false }, 'companyName email');
        res.status(200).json(companies);
    } catch (err) {
        res.status(500).json({ error: err?.message || 'Server error' });
    }
};

const activeCompanies = async (req, res) => {
    try {
        const companies = await Company.find({ isActive: true }, 'companyName email');
        res.status(200).json(companies);
    } catch (err) {
        res.status(500).json({ error: err?.message || 'Server error' });
    }
};

const toggleCompanyStatus = async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);
        if (!company) {
            return res.status(404).json({ error: 'Company not found' });
        }

        company.isActive = !company.isActive;
        await company.save();

        // Send only a message instead of the full company object to minimize payload
        res.status(200).json({ message: 'Company status updated.' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};




export { registerCompany, loginCompany, logoutCompany, getCompanyProfile, inactiveCompanies, activeCompanies, toggleCompanyStatus };
