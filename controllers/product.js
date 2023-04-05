const Product =require('../models/product');

exports.addProduct=async(req,res,next)=>{
    
    const name=req.body.name;
    const price=req.body.price;
    const category=req.body.category;
    Product.create({name: name,price: price,category:category})
        .then(result=>{
            console.log("Successfully added");
            res.status(201).json({resData:"success"});
        })
        .catch(err=>{
            console.log(err);
        })
}

exports.deleteProduct=(req,res,next)=>{
    const prodId=req.params.prodId;

    Product.findByPk(prodId)
        .then(product=>{
            product.destroy();
            res.status(201).json({resData:"success"});
        })
        .catch(err=>{
            console.log(err);
        });
}

exports.getProducts=(req,res,next)=>{

    Product.findAll()
        .then(products=>{
            res.status(201).json({resData: products});
        })
        .catch(err=>{
            console.log(err);
        })
}
exports.getProduct=(req,res,next)=>{

    const prodId=req.params.prodId;
    Product.findByPk(prodId)
        .then(product=>{
            res.status(201).json({resData:product});
        })
        .catch(err=>{
            console.log(err);
        });
}