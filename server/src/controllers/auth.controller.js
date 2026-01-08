import { User } from "../models/user.model.js";
import { AppError } from "../utils/AppError.js";
import { generateToken } from "../utils/jwt.js";
import bcrypt from "bcryptjs";

export const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        if(!name || !email || !password){
            return next(new AppError("All fields required",400))
        }

        const exist = await User.findOne({ email });

        if(exist){
            return next(new AppError("Email already exists",400));
        }

        const user = await User.create({
            name,
            email,
            password
        });

        const token = generateToken({ id: user._id });

        res.cookie("accessToken", token, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            path: "/",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.json({
            success: true,
            message: "User registered!",
            user,
            token
        });
        
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if(!email || !password){
            return next(new AppError("Email and Password required",400));
        }

        const user = await User.findOne({ email });

        if(!user){
            return next(new AppError("User not found",404));
        }

        const match = await bcrypt.compare(password, user.password);

        if(!match){
            return next(new AppError("Invalid credentials",400));
        }

        const accessToken = generateToken({ id: user._id });

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            path: "/",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.json({
            success: true,
            message: "Login successful!",
            user,
            token: accessToken
        });
        
    } catch (error) {
        next(error);
    }
};

export const logout = async (req, res, next) => {
    try {
        res.cookie("accessToken", "", {
            httpOnly: true,
            secure: false,
            path: "/",
            expires: new Date(0)
        });

        return res.status(200).json({
            success: true,
            message: "Logged out successfully!"
        });
        
    } catch (error) {
        next(error);
    }
};

export const getMe = async (req, res, next) => {
    res.status(200).json({
        success: true,
        user: req.user
    });
};