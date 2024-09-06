import jwt from 'jsonwebtoken';
import User from '../models/userSchema.js'; 

const verifyAccessToken = async (req, res, next) => {
    // Get tokens from cookies or headers
    const accessToken = req.cookies.accessToken || req.headers['authorization']?.split(' ')[1];
    const refreshToken = req.cookies.refreshToken || req.headers['x-refresh-token'];

    try {
        if (!accessToken) {
            if (!refreshToken) {
                // No tokens provided
                return res.status(401).json({ error: 'Not authorized, no token provided' });
            }

            // Handle access token missing but refresh token provided
            const decodedRefreshToken = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

            const user = await User.findById(decodedRefreshToken.userId);
            if (!user || user.refreshToken !== refreshToken) {
                return res.status(401).json({ error: 'Invalid refresh token' });
            }

            // Generate a new access token
            const newAccessToken = jwt.sign(
                { userId: user._id },
                process.env.JWT_ACCESS_SECRET,
                { expiresIn: '15m' }
            );

            // Set the new access token in the cookies
            res.cookie('accessToken', newAccessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'Strict',
                maxAge: 15 * 60 * 1000 // 15 minutes
            });

            req.user = { id: user._id }; // Attach user info to the request object
            return next();
        }

        // Verify the access token
        const decodedAccessToken = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
        req.user = { id: decodedAccessToken.userId }; // Attach user info to the request object

        next(); // Continue to the next middleware or route handler
    } catch (error) {
        // Handle JWT errors
        if (error.name === 'TokenExpiredError') {
            // Handle expired token error
            return res.status(401).json({ error: 'Access token expired' });
        } else if (error.name === 'JsonWebTokenError') {
            // Handle invalid token error
            return res.status(401).json({ error: 'Invalid access token' });
        }

        next(error); 
    }
};

export default verifyAccessToken;