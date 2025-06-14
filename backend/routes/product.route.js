import { Router } from "express";
import { getAllProducts, getProduct,addProduct, updateProduct, deleteProduct } from "../controllers/product.controller.js";
const router = Router();

// Sample route to get all products
router.get('/',getAllProducts);
router.post('/',addProduct);
router.get('/:id',getProduct); // Assuming you want to get a product by ID, you might want to change this to a specific controller function
router.put('/:id',updateProduct);
router.delete('/:id',deleteProduct);

export default router;