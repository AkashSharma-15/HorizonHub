import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import orderModel from '../models/orderModel.js'
import jwt from 'jsonwebtoken'
const user = {}

// register API

user.register = async (req, res) => {
    try {
        const { name, email, password, phone, address, answer } = req.body

        if (!name) { return res.send({ message: "Name is required" }) }
        if (!email) { return res.send({ message: "email is required" }) }
        if (!password) { return res.send({ message: "password is required" }) }
        if (!phone) { return res.send({ message: "phone Number is required" }) }
        if (!address) { return res.send({ message: "address is required" }) }
        if (!answer) { return res.send({ message: "answer is required" }) }

        let exist = await userModel.findOne({ email: email })
        if (exist) {
            return res.status(200).send({
                success: false,
                message: "Already registered with this Email try different One"
            })
        }

        const hashedPassword = await hashPassword(password)
        const save = await new userModel({
            name,
            email,
            address,
            phone,
            password: hashedPassword,
            answer
        }).save()
        if (save) {
            res.status(201).send({
                success: true,
                message: "User registered successfully",
                data: save
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: error.message
        })

    }
}

// Login API

user.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        //validation
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Invalid email or password",
            });
        }
        //check user
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not registerd",
            });
        }
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid Password",
            });
        }
        //token
        const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        res.status(200).send({
            success: true,
            message: "login successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,
            },
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in login",
            error,
        });
    }

}

// forgot Password API

user.forgotPassword = async (req, res) => { 

    try {
        const { email, answer, newPassword } = req.body

        if (!email) { return res.status(400).send({ message: "Email is required" }) }
        if (!answer) { return res.status(400).send({ message: "answer is required" }) }
        if (!newPassword) { return res.status(400).send({ message: "New Password  is required" }) }

        const user = await userModel.findOne({ email, answer })
        if (!user) {
            return res.status(404).send({ success: false, message: "Incorrect email or answer" })
        }
        const hashP = await hashPassword(newPassword)
        await userModel.findByIdAndUpdate(user._id, { password: hashP })
        res.status(200).send({
            success: true,
            message: "Password reset successfully"
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Something went wrong",
            error
        })

    }
}

// update user

user.updateProfile = async (req, res) => {
    try {
        const { name, email, password, address, phone } = req.body;
        const user = await userModel.findById(req.user._id);
        //password
        if (password && password.length < 6) {
            return res.json({ error: "Passsword is required and 6 character long" });
        }
        const hashedPassword = password ? await hashPassword(password) : undefined;
        const updatedUser = await userModel.findByIdAndUpdate(
            req.user._id,
            {
                name: name || user.name,
                password: hashedPassword || user.password,
                phone: phone || user.phone,
                address: address || user.address,
            },
            { new: true }
        );
        res.status(200).send({
            success: true,
            message: "Profile Updated SUccessfully",
            updatedUser,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error WHile Update profile",
            error,
        });
    }
}

// user orders

user.getOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ buyer: req.user._id })
            .populate('products', '-photo').populate('buyer', 'name')
        res.json(orders)
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error While getting user orders",
            error,
        });
    }
}

// all orders

user.allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({})
            .populate('products', '-photo').populate('buyer', 'name').sort({ createdAt: -1 })
        res.json(orders)
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error While getting all orders",
            error,
        });
    }
}

// update order status

user.updateStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const orders = await orderModel.findByIdAndUpdate(
          orderId,
          { status },
          { new: true }
        );
        res.json(orders);
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Error While Updateing Order",
          error,
        });
      }
    
}
export default user