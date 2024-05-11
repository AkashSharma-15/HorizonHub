import Jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const authorization = async (req, res, next) => {
    try {
        let token = req.headers.authorization
        if (!token) {
            return res.status(404).send({
                success: false,
                message: "Token required"
            })
        }

        const decode = Jwt.verify(token, process.env.JWT_SECRET)
        req.user = decode

        next()
    } catch (error) {
        console.log("Invalid token")
        res.status(404).send({
            success: false,
            message: "Invalid Token"

        })

    }
}

export const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id);
        if (user.role !== 1) {
            return res.status(401).send({
                success: false,
                message: "UnAuthorized Access",
            });
        } else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            error,
            message: "Error in admin middelware",
        });
    }
};