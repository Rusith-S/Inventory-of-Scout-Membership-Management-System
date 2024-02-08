import mongoose from 'mongoose';
const ProductSchema = new mongoose.Schema({

    productId :{
        type : String,
        required : true,
        unique : [true, "Product ID must be unique"]
    },
    productName :{
        type : String,
        required : true
    },

    productPrice :{
        type : Number,
        required : true
    },

    productQuantity :{
        type : Number,
        required : true
    }
    

});
export default mongoose.model("Product",ProductSchema)