import express from 'express'
import { authorization, isAdmin } from '../middlewares/authMiddleware.js'
import PRODUCTCONTROLLER from '../controllers/productController.js'

import formidable from 'express-formidable'
const router = express.Router()

router.post('/create-product', authorization, isAdmin, formidable(), PRODUCTCONTROLLER.addProduct)

router.get('/get-product', PRODUCTCONTROLLER.getProduct)

router.get('/get-product/:slug', PRODUCTCONTROLLER.getSingleProduct)

router.get('/get-productPhoto/:pid', PRODUCTCONTROLLER.getProductPhoto)

router.delete('/delete-product/:pid', authorization, isAdmin, PRODUCTCONTROLLER.deleteProduct)

router.put('/update-product/:pid', authorization, isAdmin, formidable(), PRODUCTCONTROLLER.updateProduct)

// filter product
router.post('/product-filters', PRODUCTCONTROLLER.productFilter)

// product count
router.get('/product-count', PRODUCTCONTROLLER.productCount)

// product per page
router.get('/product-list/:page', PRODUCTCONTROLLER.productList)

// search product

router.get('/search/:keyword', PRODUCTCONTROLLER.searchProduct)

// similar products

router.get('/related-product/:pid/:cid', PRODUCTCONTROLLER.getSimiliar)

// category wise product

router.get('/product-category/:slug', PRODUCTCONTROLLER.productCategory)

// payment tokens braintree ka

router.get('/braintree/token',PRODUCTCONTROLLER.getToken)

// payment

router.post('/braintree/payment',authorization,PRODUCTCONTROLLER.payments)

export default router