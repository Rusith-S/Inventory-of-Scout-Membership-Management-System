import "./productTableComp.scss";
import { DataGrid } from "@mui/x-data-grid";
import { productColumns } from "../../datatablesource";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import "jspdf-autotable";
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const ProductTable = () => {
  const { data, loading, error, productCount } = useFetch("/product");
  const [list, setList] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setList(data);
      setFilterData(data);
    }
  }, [data]);

  const handleDelete = async (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "rgb(141, 67, 252)",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`/product/delete/${id}`);
          setList(list.filter((item) => item._id !== id));
          console.log(`${id}`);
          Swal.fire("Deleted!", "Your Product has been deleted.", "success");
          window.location.reload();
        }
      });
    } catch (err) {}
  };


  const handleSearch = (event) => {
    const getSearch = event.target.value;
    setQuery(getSearch);

    if (getSearch.length > 0) {
      const searchData = list.filter((item) =>
        item.productName.toLowerCase().includes(getSearch)
      );
      setList(searchData);
    } else {
      setList(filterData);
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              style={{ textDecoration: "none" }}
              className="updateButton"
              type="button"
              to={`/updateproduct/${params.row._id}`}
            >
              Update
            </Link>

            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  //Report Generation
  const downloadPdf = () => {
    const doc = new jsPDF();
    const text = "Product List";
    const textWidth = doc.getTextDimensions(text).w;
    const pageWidth = doc.internal.pageSize.width;
    const x = (pageWidth - textWidth) / 2;
    doc.text(text, x, 50);
    const addressLines = [
      "No. 65/7",
      "Sir Chittampalam A Gardiner Mawatha",
      "Colombo 02, Sri Lanka.",
      "+94 77 758 0646",
      "info@colomboscouts.lk",
    ];
    const addressX = doc.internal.pageSize.getWidth() - doc.getTextWidth(addressLines[0]) - 50;
    let addressY = 15;
    doc.setFontSize(10);
    addressLines.forEach((line) => {
      doc.text(line, addressX, addressY);
      addressY += 4.5;
    });
      
    const CSlogo = require('../../image/CSlogo.png');
    doc.addImage(CSlogo, 'PNG', 10, 10, 50, 25);
      
    const fontSize = 20;
    doc.setFontSize(fontSize);
    doc.autoTable({
      startY: 80,
      theme: "striped",
      headStyles: { fillColor: [92, 30, 154] },
      alternateRowStyles: { fillColor: [231, 215, 252] },
      tableLineColor: [92, 30, 154],
      tableLineWidth: 0.1,
      head: [["Product ID", "Product Name", "Price", "Quantity", "Total Price"]],
      body: list.map((item) => [
        item.productId,
        item.productName,
        item.productPrice,
        item.productQuantity,
        item.productPrice * item.productQuantity,
      ]),
    });
      
    doc.save("Inventory Product List.pdf");
  };

  const actions = [
    {
      icon: () => (
        <button onClick={downloadPdf} className="export">
          Export as PDF
        </button>
      ),
      tooltip: "Export to Pdf",
      isFreeAction: true,
    },
  ];
    
  const outOfStockCount = list.filter((item) => item.productQuantity === 0).length;
  const totalPrice = list.reduce((total, item) => total + (item.productPrice * item.productQuantity), 0);
    
  return (
    <div className="ProductTable">
      <div className="widgetHeading">Inventory Stats</div>
      <div className="widgetContainer">
        <div className="widgetBox">
          <ShoppingCartIcon className="ShoppingCartIcon" />
          <span>Total Products: {productCount}</span>
        </div>
        <div className="widgetBox2">
          <ProductionQuantityLimitsIcon className="ProductionQuantityLimitsIcon" />
          <span>Out of Stock Items: {outOfStockCount}</span>
        </div>
        <div className="widgetBox3">
          <AttachMoneyIcon className="ShoppingCartIcon" />
          <span>Total Store Value: {totalPrice}</span>
        </div>
      </div>

      <div className="datatableTitle">Product List</div>

      <div className="searchContainer">
        <SearchIcon className="searchIcon" />
        <input
          type="text"
          value={query}
          className="search"
          onChange={(e) => handleSearch(e)}
          placeholder="Search by Product Name"
        />
      </div>

      <DataGrid
        className="datagrid"
        rows={list}
        columns={productColumns.concat(actionColumn)}
        pageSize={8}
        rowsPerPageOptions={[8]}
        checkboxSelection
        getRowId={(row) => row._id}
        components={{
          Toolbar: () => (
            <div>
              {actions.map((action, index) => (
                <action.icon key={index} />
              ))}
            </div>
          ),
        }}
      />
    </div>
  );
};

export default ProductTable;





