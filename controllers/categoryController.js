import categoryModel from '../models/categoryModel.js';
import slugify from 'slugify';
const category = {}

// create Category

category.createCategory = async (req, res) => {
    try {
        const { name } = req.body
        if (!name) {
            return res.status(401).send({ message: "Name is required" })
        }
        let exist = await categoryModel.findOne({ name })
        if (exist) {
            return res.status(200).send({
                success: true,
                message: "Category already exist"
            })
        }
        const category = await new categoryModel({ name, slug: slugify(name) }).save()
        res.status(201).send({
            success: true,
            message: 'new category created',
            category
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error while creating Category",
            error
        })

    }
}

// update Category

category.updateCategory = async (req, res) => {
    try {
        const { name } = req.body
        const { id } = req.params
        const existCategory = await categoryModel.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true })
        res.status(200).send({
            success: true,
            message: "Category updated successfully",
            existCategory
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error while updating Category",
            error
        })

    }
}

// get All categories

category.getCategory = async (req, res) => {
    try {
        const category = await categoryModel.find({})
        res.status(200).send({
            success: true,
            message: 'All category List',
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error while getting Categories",
            error
        })
    }
}

// get single Category

category.getSingleCategory = async (req, res) => {
    try {
        const category = await categoryModel.findOne({ slug: req.params.slug })
        res.status(200).send({
            success: true,
            message: "Get single category successfull",
            category
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error While getting Category",
            error: error.message
        })
    }
}

// delete Category

category.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: "Category Deleted Successfully",
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error While deleting Category",
            error: error.message
        })
    }
}

export default category