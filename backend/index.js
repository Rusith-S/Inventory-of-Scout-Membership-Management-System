import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import productsRoute from "./routes/products.js";
import supplierRoute from "./routes/suppliers.js";


const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to MongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected!");
});

// Middlewares
app.use(express.json());

// Routes Middlewares
app.use("/product", productsRoute);
app.use("/supplier", supplierRoute);


app.listen(8800, () => {
  connect();
  console.log("Connected to backend.");
});
