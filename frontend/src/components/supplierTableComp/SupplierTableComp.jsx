import "./supplierTableComp.scss";
import { DataGrid } from "@mui/x-data-grid";
import {supplierColumns, userRows } from "../../datatablesource";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import "jspdf-autotable";
import SearchIcon from '@mui/icons-material/Search';

const SupplierTable = () => {
  const [list, setList] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [query, setQuery] = useState("");
  const { data, loading, error } = useFetch("/supplier");


  useEffect(() => {
    setList(data);
    setFilterData(data);
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
          axios.delete(`/supplier/delete/${id}`);
          setList(list.filter((item) => item._id !== id));
          console.log(`${id}`);
          Swal.fire("Deleted!", "Your supplier has been deleted.", "success");
        }
      });
    } catch (err) {}
  };


  const handleSearch = (event) => {
    const getSearch = event.target.value;
    setQuery(getSearch);

    if (getSearch.length > 0) {
      const searchData = list.filter((item) =>
        item.supplierName.toLowerCase().includes(getSearch)
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
            <Link style={{textDecoration:"none"}}
              className="updateButton"
              type="button"
              to={`/supplierdash/updatesupplier/${params.row._id}`}
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

  const downloadPdf = () => {
    const doc = new jsPDF();
    const text="Supplier List";
    const textWidth = doc.getTextDimensions(text).w;
    const pageWidth = doc.internal.pageSize.width;
    const x = (pageWidth - textWidth) / 2;
    doc.text(text, x, 50);
    const addressLines = [
      "No. 65/7",
      "Sir Chittampalam A Gardiner Mawatha",
      "Colombo 02, Sri Lanka.",
      "+94 77 758 0646",
      "info@colomboscouts.lk"

    ];
    const addressX = doc.internal.pageSize.getWidth() - doc.getTextWidth(addressLines[0]) - 50;
    let addressY = 15;
    doc.setFontSize(10);
    addressLines.forEach(line => {
      doc.text(line, addressX, addressY);
      addressY += 4.5;
    });
    const CSlogo = require('../../image/CSlogo.png')
    doc.addImage(CSlogo, 'PNG', 10,10,50,25);
    var fontSize = 20;
    doc.setFontSize(fontSize);
    doc.autoTable({
      startY:60,
      theme: "striped",
      headStyles :{fillColor : [92, 30, 154]}, 
      alternateRowStyles: {fillColor : [231, 215, 252]}, 
      tableLineColor: [92, 30, 154], 
      tableLineWidth: 0.1,
      head: [
        [  
          "Supplier ID",       
          "Supplier Name",
          "Supplier Email",
          "Supplier Phone",
          "Product Name",
      
        ],
      ],
      body: list.map((item) => [
        item.supplierId,
        item.supplierName,
        item.supplierEmail,
        item.supplierPhone,
        item.productName,

      ]),
    });
    doc.save("Supplier Detail List.pdf");
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

  return (
    <div className="SupplierTable">
      <div className="datatableTitle">
       Supplier List
      </div>
      <SearchIcon className="SearchIcon"/> 
      <input
        type="text"
        value={query}
        className="search"
        onChange={(e) => handleSearch(e)}
        placeholder="Search by Supplier Name"
        
      />
      
      <DataGrid
        className="datagrid"
        rows={list}
        columns={supplierColumns.concat(actionColumn)}
        pageSize={8}
        rowsPerPageOptions={[8]}
        checkboxSelection
        getRowId={(row) => row._id}
        components={{
          Toolbar: () => (
            <div>
              {actions.map((action, index) => (
                <action.icon key={index} onClick={action.onClick} />
              ))}
            </div>
          ),
        }}
      />
    </div>
  );
};
export default SupplierTable;
