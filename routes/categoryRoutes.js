import express from "express";
import CATEGORYCONTROLLER from '../controllers/categoryController.js'
import { authorization, isAdmin } from "../middlewares/authMiddleware.js";
const router = express.Router()


router.post('/create-category', authorization, isAdmin, CATEGORYCONTROLLER.createCategory)
router.put('/update-category/:id', authorization, isAdmin, CATEGORYCONTROLLER.updateCategory)
router.get('/get-category', CATEGORYCONTROLLER.getCategory)
router.get('/getSingle-category/:slug', CATEGORYCONTROLLER.getSingleCategory)
router.delete('/delete-category/:id', authorization, isAdmin, CATEGORYCONTROLLER.deleteCategory)
export default router