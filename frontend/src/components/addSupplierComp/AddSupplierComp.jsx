import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import './addSupplierComp.scss';

const AddSupplier = () => {
  const [supplierId, setSupplierId] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [supplierEmail, setSupplierEmail] = useState("");
  const [supplierPhone, setSupplierPhone] = useState("");
  const [productName, setProductName] = useState("");

  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const emptyFields = [];
    if (!supplierId.trim()) {
      emptyFields.push("supplierId");
    }
    if (!supplierName.trim()) {
      emptyFields.push("supplierName");
    }
    if (!supplierEmail.trim()) {
      emptyFields.push("supplierEmail");
    }
    if (!supplierPhone.trim()) {
      emptyFields.push("supplierPhone");
    }
    if (!productName.trim()) {
      emptyFields.push("productName");
    }
    if (emptyFields.length > 0) {
      setEmptyFields(emptyFields);
      return;
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(supplierEmail)) {
      Swal.fire("Error", "Invalid email format", "error");
      return;
    }
  
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(supplierPhone)) {
      Swal.fire("Error", "Invalid phone number format", "error");
      return;
    }
  
    const supplier = {
      supplierId,
      supplierName,
      supplierEmail,
      supplierPhone,
      productName
    };
  
    const response = await fetch("/supplier/add", {
      method: "POST",
      body: JSON.stringify(supplier),
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    const json = await response.json();
  
    if (!response.ok) {
      if (response.status === 500) {
        Swal.fire("Error", "This Supplier ID already exists!", "error");
      } else {
        setError(json.error);
      }
    } else {
      setSupplierId("");
      setSupplierName("");
      setSupplierEmail("");
      setSupplierPhone("");
      setProductName("");
      Swal.fire("Done", "Supplier added successfully!", "success");
      navigate("/supplierdash");
    }
  };
  

  return (
    <div>
      <form className="addSupplier" onSubmit={handleSubmit}>
        <label htmlFor="supplierId">Supplier ID:</label>
        <input
          type="text"
          id="supplierId"
          placeholder="Enter Supplier ID"
          value={supplierId}
          onChange={(e) => setSupplierId(e.target.value)}
        />
        {emptyFields.includes("supplierId") && (
          <div className="error">*Please enter Supplier ID</div>
        )}

        <label htmlFor="supplierName">Supplier Name:</label>
        <input
          type="text"
          id="supplierName"
          placeholder="Enter Supplier Name"
          value={supplierName}
          onChange={(e) => setSupplierName(e.target.value)}
        />
        {emptyFields.includes("supplierName") && (
          <div className="error">*Please enter Supplier Name</div>
        )}

        <label htmlFor="supplierEmail">Supplier Email:</label>
        <input
          type="email"
          id="supplierEmail"
          placeholder="Enter Supplier Email"
          value={supplierEmail}
          onChange={(e) => setSupplierEmail(e.target.value)}
        />
        {emptyFields.includes("supplierEmail") && (
          <div className="error">*Please enter Supplier Email</div>
        )}
        {error && <div className="error">{error}</div>}
        
        <label htmlFor="supplierPhone">Supplier Phone Number:</label>
        <input
          type="tel"
          id="supplierPhone"
          placeholder="Enter Supplier Phone"
          value={supplierPhone}
          onChange={(e) => setSupplierPhone(e.target.value)}
        />
        {emptyFields.includes("supplierPhone") && (
          <div className="error">*Please enter Supplier Phone</div>
        )}

        <label htmlFor="productName">Product Name:</label>
        <input
          type="text"
          id="productName"
          placeholder="Enter Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        {emptyFields.includes("productName") && (
          <div className="error">*Please enter Product Name</div>
        )}

        <button type="submit">Add Supplier</button>
      </form>
    </div>
  );
};

export default AddSupplier;


