import User from "../models/userSchema.js";

export const userCreate = async (req, res, next) => {
    try {
        console.log(req.body);
        
    } catch (error) {
        next(error)
    }
}