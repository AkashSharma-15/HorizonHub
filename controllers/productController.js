import slugify from "slugify";
import productModel from "../models/productModel.js";
import categoryModel from '../models/categoryModel.js'
import orderModel from "../models/orderModel.js";
import fs from 'fs'
const product = {}
import braintree from "braintree";
import dotenv from "dotenv";
dotenv.config();
// // payment gatway
var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});


// add Product

product.addProduct = async (req, res) => {
    try {

        const { name, description, price, quantity, shipping, category } = req.fields
        const { photo } = req.files
        if (!name) { return res.status(500).send({ error: "Name is required" }) }
        if (!description) { return res.status(500).send({ error: "description is required" }) }
        if (!price) { return res.status(500).send({ error: "price is required" }) }
        if (!quantity) { return res.status(500).send({ error: "quantity is required" }) }
        if (!category) { return res.status(500).send({ error: "category is required" }) }
        if (photo && photo.size > 1000000) { return res.status(500).send({ error: "photo  is required and should be less than 1mb" }) }

        const products = new productModel({
            ...req.fields, slug: slugify(name)
        })
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save()
        res.status(201).send({
            success: true,
            message: "Product added successfully",
            products
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error while creating product",
            error
        })

    }
}

// getAll

product.getProduct = async (req, res) => {
    try {
        const products = await productModel.find({}).select("-photo").limit(12).sort({ createdAt: -1 }).populate('category')

        res.status(200).send({
            success: true,
            totalCount: products.length,
            message: "All products",
            products
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error while getting products",
            error: error.message
        })
    }
}

// get single

product.getSingleProduct = async (req, res) => {
    try {
        const product = await productModel
            .findOne({ slug: req.params.slug })
            .select("-photo")
            .populate("category");
        res.status(200).send({
            success: true,
            message: "Single Product Fetched",
            product
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error while getting single product",
            error: error.message
        })
    }
}

// get Photo

product.getProductPhoto = async (req, res) => {
    try {
        const { pid } = req.params
        const pro = await productModel.findById(pid).select("photo")
        if (pro.photo.data) {
            res.set('Content-type', pro.photo.contentType)
            return res.status(200).send(pro.photo.data)
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error while getting product photo",
            error: error.message
        })
    }
}

// delete Product

product.deleteProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.pid).select('-photo')
        res.status(200).send({
            success: true,
            message: "Product deleted successfull"
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error while deleting product",
            error: error.message
        })
    }
}

// update product

product.updateProduct = async (req, res) => {
    try {
        const { name, description, price, quantity, shipping, category } = req.fields
        const { photo } = req.files
        if (!name) { return res.status(500).send({ error: "Name is required" }) }
        if (!description) { return res.status(500).send({ error: "description is required" }) }
        if (!price) { return res.status(500).send({ error: "price is required" }) }
        if (!quantity) { return res.status(500).send({ error: "quantity is required" }) }
        if (!category) { return res.status(500).send({ error: "category is required" }) }
        if (photo && photo.size > 1000000) { return res.status(500).send({ error: "photo  is required and should be less than 1mb" }) }

        const products = await productModel.findByIdAndUpdate(req.params.pid, {
            ...req.fields, slug: slugify(name)
        }, { new: true })
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save()
        res.status(201).send({
            success: true,
            message: "Product Updated successfully",
            products
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error while updating product",
            error: error.message
        })
    }
}

//  filter products

product.productFilter = async (req, res) => {
    try {
        const { checked, radio } = req.body
        let args = {}
        if (checked.length > 0) args.category = checked
        if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] }
        const products = await productModel.find(args)
        res.status(200).send({
            success: true,
            products
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error while filtering products",
            error: error.message
        })
    }
}

// product count

product.productCount = async (req, res) => {
    try {
        const total = await productModel.find({}).estimatedDocumentCount()
        res.status(200).send({
            success: true,
            total
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error while getting products",
            error: error.message
        })
    }
}

// product list base on page

product.productList = async (req, res) => {
    try {
        let perPage = 6
        const page = req.params.page ? req.params.page : 1
        const products = await productModel.find({}).select("-photo").skip((page - 1) * perPage).limit(perPage).sort({ createdAt: -1 })
        res.status(200).send({
            success: true,
            products
        })
    } catch (error) {
        console.log(productList)
        res.status(500).send({
            success: false,
            message: "Error while getting products",
            error: error.message
        })
    }
}

// search Products

product.searchProduct = async (req, res) => {
    try {
        const { keyword } = req.params
        const result = await productModel.find({
            $or: [
                { name: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ]
        }).select("-photo")
        res.json(result)

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error while searching products",
            error: error.message
        })
    }
}

// get similar products

product.getSimiliar = async (req, res) => {
    try {
        const { pid, cid } = req.params
        const products = await productModel.find({
            category: cid,
            _id: { $ne: pid }
        }).select("-photo").limit(3).populate("category")
        res.status(200).send({
            success: true,
            products
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error while getting similar products",
            error: error.message
        })
    }
}

// category wise products

product.productCategory = async (req, res) => {
    try {
        let category = await categoryModel.findOne({ slug: req.params.slug })
        const products = await productModel.find({ category }).populate("category")
        res.status(200).send({
            success: true,
            category,
            products
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error while getting category products",
            error: error.message
        })
    }
}

// braintree token

product.getToken = async (req, res) => {
    try {
        gateway.clientToken.generate({}, function (err, response) {
            if (err) {
                return res.status(500).send(err)
            }
            else {
                res.send(response)
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error while getting getting braintree token",
            error: error.message
        })
    }
}

// payment braintree

product.payments = async (req, res) => {
    try {
        let { cart, nonce } = req.body
        let total = 0;
        cart.map((i) => {
            total += i.price
        })
        let newTransaction = gateway.transaction.sale({
            amount: total,
            paymentMethodNonce: nonce,
            options: {
                submitForSettlement: true
            }
        }, function (error, result) {
            if (result) {
                const order = new orderModel({
                    products: cart,
                    payment: result,
                    buyer: req.user._id
                }).save()
                res.json({ ok: true })
            }
            else {
                res.status(500).send(error)
            }
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error while doing payments",
            error: error.message
        })
    }
}

export default product