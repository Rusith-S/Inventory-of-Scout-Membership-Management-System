// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";
// // import { toast, ToastContainer } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";
// import './updateProductComp.scss';
// import Swal from "sweetalert2";

// const UpdateProduct = () => {
//   const { id } = useParams();
//   const [error, setError] = useState(null);
//   const [values, setValues] = useState({
//     productId: "",
//     productName: "",
//     productPrice: "",
//     productQuantity: "",
//   });

//   useEffect(() => {
//     axios
//       .get(`/product/${id}`)
//       .then((res) => {
//         setValues({
//           ...values,
//           productId: res.data.productId,
//           productName: res.data.productName,
//           productPrice: res.data.productPrice,
//           productQuantity: res.data.productQuantity,
//         });
//       })
//       .catch((err) => console.log(err));
//   }, []);

//   const navigate = useNavigate();
//   const handleUpdate = (e) => {
//     e.preventDefault();
  
//     if (values.productPrice < 0) {
//       Swal.fire("Error", "Product price cannot be negative", "error");
//       return;
//     }
  
//     if (values.productQuantity < 0) {
//       Swal.fire("Error", "Product quantity cannot be negative", "error");
//       return;
//     }
  
//     axios
//       .put(`/product/update/${id}`, values)
//       .then((res) => {
//         console.log(res);
//         Swal.fire("Done!", "Product Updated Successfully!", "success");
//         navigate("/");
//       })
//       .catch((err) => console.log(err));
//   };
  

//   return (
//     <>
//       <form className="updateProduct" onSubmit={handleUpdate}>
//         <label>Product Purchase Price (Rs) :</label>
//         <input
//           type="text"
//           value={values.productPrice}
//           onChange={(e) =>
//             setValues({ ...values, productPrice: e.target.value })
//           }
//           required
//         />

//         <label>Product Quantity :</label>
//         <input
//           type="number"
//           value={values.productQuantity}
//           onChange={(e) =>
//             setValues({ ...values, productQuantity: e.target.value })
//           }
//           required
//         />

//         <label>Product ID :</label>
//         <input
//           type="text"
//           value={values.productId}
//           onChange={(e) => setValues({ ...values, productId: e.target.value })}
//           disabled
//         />

//         <label>Product Name :</label>
//         <input
//           type="text"
//           value={values.productName}
//           onChange={(e) => setValues({ ...values, productName: e.target.value })}
//           disabled
//         />

//         <button type="submit">Update</button>
//         {error && <p className="error">{error}</p>}
//       </form>
//     </>
//   );
// };

// export default UpdateProduct;



import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./updateProductComp.scss";
import Swal from "sweetalert2";

const UpdateProduct = () => {
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [values, setValues] = useState({
    productId: "",
    productName: "",
    productPrice: "",
    productQuantity: "",
  });

  useEffect(() => {
    axios
      .get(`/product/${id}`)
      .then((res) => {
        setValues({
          ...values,
          productId: res.data.productId,
          productName: res.data.productName,
          productPrice: res.data.productPrice,
          productQuantity: res.data.productQuantity,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const navigate = useNavigate();
  const handleUpdate = (e) => {
    e.preventDefault();

    const price = parseFloat(values.productPrice);
    if (isNaN(price) || price < 0) {
      Swal.fire("Error", "Product price must be a positive number", "error");
      return;
    }

    const quantity = parseFloat(values.productQuantity);
    if (isNaN(quantity) || quantity < 0) {
      Swal.fire("Error", "Product quantity must be a non-negative number", "error");
      return;
    }

    axios
      .put(`/product/update/${id}`, values)
      .then((res) => {
        console.log(res);
        Swal.fire("Done!", "Product Updated Successfully!", "success");
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <form className="updateProduct" onSubmit={handleUpdate}>
        <label>Product Purchase Price (Rs) :</label>
        <input
          type="text"
          value={values.productPrice}
          onChange={(e) =>
            setValues({ ...values, productPrice: e.target.value })
          }
          required
        />

        <label>Product Quantity :</label>
        <input
          type="text"
          value={values.productQuantity}
          onChange={(e) =>
            setValues({ ...values, productQuantity: e.target.value })
          }
          required
        />

        <label>Product ID :</label>
        <input
          type="text"
          value={values.productId}
          onChange={(e) => setValues({ ...values, productId: e.target.value })}
          disabled
        />

        <label>Product Name :</label>
        <input
          type="text"
          value={values.productName}
          onChange={(e) =>
            setValues({ ...values, productName: e.target.value })
          }
          disabled
        />

        <button type="submit">Update</button>
        {error && <p className="error">{error}</p>}
      </form>
    </>
  );
};

export default UpdateProduct;
