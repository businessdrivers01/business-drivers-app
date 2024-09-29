import { validationResult } from 'express-validator';
import { Admin } from '../models/admin.model.js';
import { apiError } from '../utils/apiError.js';
import { apiResponse } from '../utils/apiResponse.js';
import dotenv from 'dotenv';

dotenv.config();

const generateAccessAndRefereshTokens = async (adminId) => {
    try {
        const admin = await Admin.findById(adminId); // Change to Admin model
        if (!admin) {
            throw new apiError(404, "Admin not found.");
        }

        // Generate tokens using Admin methods
        const accessToken = admin.generateAccessToken();
        const refreshToken = admin.generateRefreshToken();

        // Save refreshToken in the admin document
        admin.refreshToken = refreshToken;
        await admin.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (err) {
        console.log(err.message);
        // Rethrow the error to be handled by loginAdmin or middleware
        throw new apiError(500, "Something went wrong while generating refresh and access tokens.");
    }
};

const registerAdmin = async (req, res) => {
    try {
        // Validate inputs
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(new apiError(400, 'Please enter valid credentials', errors.array()));
        }

        // Extract fields from request
        const { username, email, password, role, adminSignupKey } = req.body;

        // Validate the admin signup key
        if (adminSignupKey !== process.env.ADMIN_SIGNUP_KEY) {
            return res.status(403).json(new apiError(403, 'Invalid admin signup key.'));
        }

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json(new apiError(400, 'Admin already registered, please login.'));
        }

        // Create new Admin object
        const newAdmin = new Admin({
            username,
            email,
            password, // Password will be hashed before saving due to pre-save hook
            role: role || 'admin', // Default to 'admin' if no role is provided
            refreshToken: "", // Initialize empty refreshToken, can be updated later
        });

        // Save the new Admin to the database
        const savedAdmin = await newAdmin.save();

        // Remove password field before sending the response
        const { password: _password, ...adminWithoutPassword } = savedAdmin.toObject();

        res.status(201).json(new apiResponse(201, adminWithoutPassword, 'Admin registered successfully.'));
    } catch (err) {
        console.error(err);
        res.status(500).json(new apiError(500, "Server error. Admin registration failed."));
    }
};


const loginAdmin = async (req, res) => {

    try {

        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json(new apiError(400, "Both Email and Password are required."));
        }

        // Find admin by email
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(404).json(new apiError(404, "Admin with this email does not exist. Please contact the administrator."));
        }

        // Compare entered password with the stored hashed password
        const isPasswordCorrect = await admin.comparePassword(password);
        if (!isPasswordCorrect) {
            return res.status(400).json(new apiError(400, "Invalid password."));
        }

        // Generate access and refresh tokens
        const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(admin._id);

        // Retrieve admin details without sensitive fields (password and refreshToken)
        const loggedInAdmin = await Admin.findById(admin._id).select("-password -refreshToken");

        // Set cookie options
        const cookiesOptions = {
            httpOnly: true,
            secure: true,
            sameSite: 'strict'
        };

        // Return response with cookies and admin data
        return res.status(200)
            .cookie("accessToken", accessToken, cookiesOptions)
            .cookie("refreshToken", refreshToken, cookiesOptions)
            .json(
                new apiResponse(200, {
                    admin: loggedInAdmin,
                    accessToken,
                    refreshToken
                }, "Admin Successfully Logged In.")
            );
    } catch (err) {
        return res.status(500).json(new apiError(500, err.message));
    }
};

const logoutAdmin = async (req, res) => {
    try {
        // Extract admin ID from the request body
        const { id } = req.body;

        // If there's no ID in the request body, send an error response
        if (!id) {
            return res.status(400).json(new apiError(400, "Id not found in request body."));
        }

        // Find the admin by ID
        const admin = await Admin.findById(id);

        // If admin not found, send error response
        if (!admin) {
            return res.status(404).json(new apiError(404, "Admin not found"));
        }

        // Remove the refreshToken from the database
        admin.refreshToken = null;
        await admin.save();

        // Clear accessToken and refreshToken cookies
        const cookiesOptions = {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            expires: new Date(0) // Expire immediately to clear cookies
        };

        return res
            .status(200)
            .cookie("accessToken", "", cookiesOptions)
            .cookie("refreshToken", "", cookiesOptions)
            .json(new apiResponse(200, null, "Admin Successfully Logged Out."));
    } catch (error) {
        return res.status(500).json(new apiError(500, "Server error during logout"));
    }
};

const getAdminProfile = async (req, res) => {
    
    try {
        const { id } = req.body;
        const admin = await Admin.findById(id).select("-password -refreshToken");

        if (!admin) {
            return res.status(404).json(new apiError(404, "Admin not found"));
        }

        return res.status(200).json(new apiResponse(200, admin, "Admin profile retrieved successfully"));
    } catch (error) {
        return res.status(500).json(new apiError(500, "Server error while retrieving admin profile"));
    }
};



export { registerAdmin, loginAdmin, logoutAdmin, getAdminProfile };
