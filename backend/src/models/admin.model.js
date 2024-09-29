import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { configDotenv } from 'dotenv';

configDotenv();

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: [3, 'Username must be at least 3 characters long']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            'Please provide a valid email address'
        ]
    },
    password: {
        type: String,
        required: true,
        minlength: [8, 'Password must be at least 8 characters long']
    },
    role: {
        type: String,
        enum: ['admin', 'superadmin'],
        default: 'admin',
    },
    refreshToken: {
        type: String,
    },
}, { timestamps: true });

// Instance method to compare passwords
adminSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Instance method to generate JWT access token
adminSchema.methods.generateAccessToken = function () {
    const accessTokenExpiry = process.env.ACCESS_TOKEN_EXPIRY || '1d';
    return jwt.sign(
        { id: this._id, email: this.email, role: this.role },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: accessTokenExpiry }
    );
};

// Instance method to generate JWT refresh token
adminSchema.methods.generateRefreshToken = function () {
    const refreshTokenExpiry = process.env.REFRESH_TOKEN_EXPIRY || '10d';
    return jwt.sign(
        { id: this._id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: refreshTokenExpiry }
    );
};

// Pre-save middleware to hash password before saving
adminSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Export the Admin model
export const Admin = mongoose.model('Admin', adminSchema);
