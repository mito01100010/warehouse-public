import express from "express";
import { addProduct, deleteProduct, findProduct, findProducts, updateProduct } from "../controllers/products.js";

const router = express.Router()

router.post("/findProducts", findProducts);
router.post("/findProduct", findProduct);
router.delete("/deleteProduct", deleteProduct);
router.post("/addProduct", addProduct)
router.put("/updateProduct/:barcode", updateProduct);


export default router