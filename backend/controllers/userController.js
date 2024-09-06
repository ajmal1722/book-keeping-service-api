import User from "../models/userSchema.js";
import bcrypt from 'bcryptjs';

export const userCreate = async (req, res, next) => {
    try {
        const  { name, email, password } = req.body;
        
        // Check if all required fields are provided
        if (!name || !email || !password) {
            const error = new Error('Name, email and password are required.');
            error.statusCode = 400; // Bad Request
            throw error;
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const error = new Error('User already exists.');
            error.statusCode = 400; // Bad Request
            throw error;
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 8);

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
        console.log(req.body);
        
        res.json({ message: 'success' })
    } catch (error) {
        next(error)
    }
}