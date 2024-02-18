export const productColumns = [
  {
    field: "productId",
    headerName: "Product ID",
    width: 180,
  },
  {
    field: "productName",
    headerName: "Product Name",
    width: 250,
  },
  {
    field: "productPrice",
    headerName: "Unit Purchase Price(Rs.)",
    width: 300,
  },
  {
    field: "productQuantity",
    headerName: "Quantity",
    width: 200,
  },
  {
    field: "totalPrice",
    headerName: "Total Price(Rs.)",
    width: 200,
    valueGetter: (params) => {
      const product = params.row;
      return product.productPrice * product.productQuantity;
    },
  },
];


  export const supplierColumns = [
    {
      field: "supplierId", 
      headerName: "Supplier ID", 
      width: 160,
    },
    { 
      field: "supplierName", 
      headerName: "Supplier Name", 
      width: 250 },
    {
      field: "supplierEmail",
      headerName: "Supplier Email",
      width: 300,
    },
  
    {
      field: "supplierPhone",
      headerName: "Supplier Phone",
      width: 200,
    },
    {
      field: "productName",
      headerName: "Product Name",
      width: 200,
    },
    
  ];
