import express from "express";
import USERCONTROLLER from "../controllers/userController.js";
import { authorization, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router()
router.post("/register", USERCONTROLLER.register)
router.post('/login', USERCONTROLLER.login)
router.post('/forgotPassword', USERCONTROLLER.forgotPassword)

// protected user Route
router.get('/user-auth', authorization, (req, res) => {
    res.status(200).send({ ok: true })
})

// admin route
router.get('/admin-auth', authorization, isAdmin, (req, res) => {
    res.status(200).send({ ok: true })
})

// update profile

router.put('/profile', authorization, USERCONTROLLER.updateProfile)

// user orders

router.get('/orders',authorization,USERCONTROLLER.getOrders)

// all orders admin

router.get('/all-orders',authorization,USERCONTROLLER.allOrders)

// update order

router.put('/order-status/:orderId',authorization,isAdmin,USERCONTROLLER.updateStatus)
export default router