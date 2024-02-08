import express from "express";
import product from "../models/product.js";

const router = express.Router();

//Create
router.route("/add").post((req,res)=>{
    const productId = req.body. productId;
    const productName = req.body.productName;
    const productPrice = Number(req.body.productPrice);
    const productQuantity = Number(req.body.productQuantity);

    const newProduct = new product({
        productId,
        productName,
        productPrice,
        productQuantity
    })

    newProduct.save().then(()=> {
       res.status(200).send({status: "Product added"});
    }).catch((err)=>{
        res.status(500).json(err);
    })
})

//Get
router.route("/").get((req,res)=>{

    product.find().then((products)=>{
        res.json(products);
    }).catch((err)=>{
        console.log(err);
    })
})-
//GET single row
router.get("/:id",async(req,res)=>{   

    try {
        const Details = await product.findById(req.params.id);
        res.status(200).json(Details)
    } catch (err) {
        res.status(500).json(err)
        }
    });


//Update
router.route("/update/:id").put(async(req,res)=>{
    let productIds = req.params.id;
    const {productId,productName, productPrice, productQuantity} = req.body;

    const updateProduct ={
        productId,
        productName,
        productPrice,
        productQuantity
    }

    const update = await product.findByIdAndUpdate(productIds, updateProduct)
    .then(()=>{
        res.status(200).send({status: "Product data updated"});
    })
    .catch((err)=> {
        console.log(err);
        res.status(500).send({status: "Error with updating product data",error: err.message});
    })    
})

//Delete
router.route("/delete/:id").delete(async(req,res)=>{
    let productIds = req.params.id;

    await product.findByIdAndDelete(productIds)
        .then(()=>{
        res.status(200).send({status: "Product deleted"});
    })
        .catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with delete product", error: err.message});
    })
})



export default router;