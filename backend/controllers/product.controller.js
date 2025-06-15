import mongoose from "mongoose";
import Product from "../models/product.models.js";

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ "success": "true", "products": products });
    } catch {
        res.status(500).json({ "success": "false", "error": "Internal Server Error" });
    }
}

export const getProduct = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ "error": "Product not found" });
    }
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ "error": "Product not found" });
        }
        res.status(200).json({ "success": "true", "product": product });
    } catch (error) {
        res.status(500).json({ "error": "Internal Server Error" });
    }
}

export const addProduct = (req, res) => {
    const product = req.body;
    if (!product.name) {
        res.status(200).json({ "success": "true", "product": newProd })
    }
    const newProd = Product(product);

    try {
        newProd.save();
        res.status(200).json({ "success": "true", data: newProd });
    } catch {
        res.status(500).json({ "error": "Internal Server Error" });
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const product = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({ "error": "Product not found" });
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
        res.status(200).json({ "success": "true", data: updatedProduct });
    } catch (error) {
        res.status(500).json({ "error": "Internal Server Error" });
    }
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ "error": "Product not found" });
    }
    try{
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ "error": "Product not found" });
        }
        res.status(200).json({ "success": "true", data: deletedProduct });
    }catch{
        res.status(500).json({ "error": "Internal Server Error" });
    }
};



