import User from "../models/userSchema.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import createError from "../utils/error.js";

// Utility function to handle errors
// const createError = (message, statusCode) => {
//     const error = new Error(message);
//     error.statusCode = statusCode;
//     return error;
// };

export const userCreate = async (req, res, next) => {
    try {
        const  { name, email, password } = req.body;
        
        // Check if all required fields are provided
        if (!name || !email || !password) {
            return next(createError('Name, email and password are required', 400))
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return next(createError('User already exists', 400))
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const user = new User({
            name,
            email,
            password: hashedPassword,
        });

        // Save the user to the database
        await user.save();
        
        // Respond with the created user (excluding the password)
        user.password = undefined;
        res.status(201).json({ message: 'User is created', user })
    } catch (error) {
        next(error)
    }
}

export const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Check if all required fields are provided
        if (!email || !password) {
            return next(createError('Email and password are required', 400)); // Bad Request
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return next(createError('User not found', 404)); // Not Found
        }

        // Check if the password is correct
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return next(createError('Incorrect password', 401)); // Unauthorized
        }

        const accessToken = jwt.sign(
            { userId: user._id }, // Payload
            process.env.JWT_ACCESS_SECRET, // Secret
            { expiresIn: '15m' } // Token expiration
        );

        const refreshToken = jwt.sign(
            { userId: user._id }, // Payload
            process.env.JWT_REFRESH_SECRET, // Secret
            { expiresIn: '7d' } // Token expiration
        );

        // Save the refresh token with the user in the database
        user.refreshToken = refreshToken;
        await user.save();

        // Set the tokens as cookies
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 15 * 60 * 1000 // 15 minutes
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
        
        res.status(200).json({ 
            message: 'Login successful', 
            user: { 
                id: user._id, 
                name: user.name, 
                email: user.email 
            }
        });
    } catch (error) {
        next(error)
    }
}