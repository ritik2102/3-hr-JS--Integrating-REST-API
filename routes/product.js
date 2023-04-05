const express=require('express');
const router=express.Router();

const productController=require('../controllers/product');
router.post('/add-product',productController.addProduct);
router.post('/delete-product/:prodId',productController.deleteProduct);
router.get('/get-products',productController.getProducts);
router.get('/get-product/:prodId',productController.getProduct);

module.exports=router;
