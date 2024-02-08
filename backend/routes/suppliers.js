import express from "express";
import supplier from "../models/supplier.js";

const router = express.Router();

//add route
router.route("/add").post((req,res)=>{

    const supplierId =req.body.supplierId;
    const supplierName = req.body.supplierName;
    const supplierEmail = req.body.supplierEmail;
    const supplierPhone = Number(req.body.supplierPhone);
    const productName = req.body.productName ;

    const newSupplier = new supplier({
        supplierId,
        supplierName,
        supplierEmail,
        supplierPhone,
        productName
    })

    newSupplier.save()
    .then(()=> {
        res.json("Supplier Added")
    })
    .catch((err)=>{
        console.log(err);
    })
})


//get all route
router.route("/").get((req,res)=>{

    supplier.find()
    .then((suppliers)=>{
        res.json(suppliers);
    })
    .catch((err)=>{
        console.log(err);
    })
})

//GET single row
router.get("/:id",async(req,res)=>{   

    try {
        const Details = await supplier.findById(req.params.id);
        res.status(200).json(Details)
    } catch (err) {
        res.status(500).json(err)
        }
    });

//update route
router.route("/update/:id").put(async(req,res)=>{
    let supplierIds = req.params.id;
    const {supplierId,supplierName, supplierEmail, supplierPhone, productName} = req.body;

    const updateSupplier ={
        supplierId,
        supplierName,
        supplierEmail,
        supplierPhone,
        productName
    }

    const update = await supplier.findByIdAndUpdate(supplierIds, updateSupplier)
    .then(()=>{
        res.status(200).send({status: "Supplier data updated"});
    })
    .catch((err)=> {
        console.log(err);
        res.status(500).send({status: "Error with updating supplier data",error: err.message});
    })    
})

//delete route

router.route("/delete/:id").delete(async(req,res)=>{
    let supplierIds = req.params.id;

    await supplier.findByIdAndDelete(supplierIds)
        .then(()=>{
        res.status(200).send({status: "Supplier deleted"});
    })
        .catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with deleting supplier", error: err.message});
    })
})

export default router;