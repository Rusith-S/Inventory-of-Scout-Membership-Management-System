import React from "react";
import { useState, useEffect } from "react";
import './updateSupplierComp.scss';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
// import { ToastContainer, toast } from "react-toastify";


const UpdateSupplier = () => {
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [values, setValues] = useState({
    supplierId: "",
    supplierName: "",
    supplierEmail: "",
    supplierPhone: "",
    productName: "",
  });

  useEffect(() => {
    axios
      .get(`/supplier/${id}`)
      .then((res) => {
        setValues({
          ...values,
          supplierId: res.data.supplierId,
          supplierName: res.data.supplierName,
          supplierEmail: res.data.supplierEmail,
          supplierPhone: res.data.supplierPhone,
          productName: res.data.productName,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const navigate = useNavigate();
  const handleUpdate = (e) => {
    e.preventDefault();
  
    if (!isValidEmail(values.supplierEmail)) {
      Swal.fire("Error", "Invalid email address", "error");
      return;
    }
  
    if (!isValidPhoneNumber(values.supplierPhone)) {
      Swal.fire("Error", "Invalid phone number", "error");
      return;
    }
  
    axios
      .put(`/supplier/update/${id}`, values)
      .then((res) => {
        console.log(res);
        Swal.fire(
          "Done!",
          "Supplier Details Updated Successfully!",
          "success"
        );
        navigate("/supplierdash");
      })
      .catch((err) => console.log(err));
  };
  
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
  };

  return (
    <>
      
      <form className="updateSupplier" onSubmit={handleUpdate}>
        <label>Supplier Name :</label>
        <input
          type="text"
          value={values.supplierName}
          onChange={(e) =>
            setValues({ ...values, supplierName: e.target.value })
          }
          required
        />

        <label>Supplier E-mail :</label>
        <input
          type="text"
          value={values.supplierEmail}
          onChange={(e) =>
            setValues({ ...values, supplierEmail: e.target.value })
          }
          required
        />

        <label>Supplier Phone Number :</label>
        <input
          type="text"
          value={values.supplierPhone}
          onChange={(e) =>
            setValues({ ...values, supplierPhone: e.target.value })
          }
          required
        />

        <label>Product Name :</label>
        <input
          type="text"
          value={values.productName}
          onChange={(e) =>
            setValues({ ...values, productName: e.target.value })
          }
          required
          
        />


        <label>Supplier ID :</label>
        <input
          type="text"
          value={values.supplierId}
          onChange={(e) => setValues({ ...values, supplierId: e.target.value })}
          required
          disabled
        />
       
<button type="submit">Update</button>
{error && <p className="error">{error}</p>}

</form>
</>
);
};
export default UpdateSupplier;