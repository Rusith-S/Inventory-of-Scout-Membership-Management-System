import mongoose from 'mongoose';
const SupplierSchema = new mongoose.Schema({

    supplierId: {
        type: String,
        required:true,
        unique : true
    },
    supplierName: {
        type: String,
        required:true,
    },

    supplierEmail :{
        type : String,
        required : true,
        unique : true,
        trim: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please enter a valid email",
        ],
    },

    supplierPhone :{
        type :Number,
        required : true,
        maxLength: 10,
        minlength: 10
    },

    productName :{
        type : String,
        required : true
    }

});
export default mongoose.model("supplier",SupplierSchema)