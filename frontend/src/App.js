import Supplierdash from "./pages/supplierDashboard/SupplierDash";
import Inventorydash from "./pages/inventoryDashboard/InventoryDash";
import Addsupplier from "./pages/addNewSupplier/NewSupplier";
import Addproduct from "./pages/addNewProduct/NewProduct";
import Updateproduct from "./pages/updateProduct/UpdateProduct";
import Updatesupplier from "./pages/updateSupplier/UpdateSupplier";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<Inventorydash/>}/>
        <Route path = "/supplierdash" element = {<Supplierdash/>}/>
        <Route path = "/addsupplier" element = {<Addsupplier/>}/>
        <Route path = "/addproduct" element = {<Addproduct/>}/>
        <Route path = "/updateproduct/:id" element = {<Updateproduct/>}/>
        <Route path = "/supplierdash/updatesupplier/:id" element = {<Updatesupplier/>}/>
      </Routes>
   </BrowserRouter>
    </div>
  );
}

export default App;

