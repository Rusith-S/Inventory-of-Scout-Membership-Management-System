import "./newSupplier.scss"
import Sidebar from "../../components/sideBarComp/SidebarComp"
import AddSupplier from "../../components/addSupplierComp/AddSupplierComp"

const Addsupplier = () =>{
    return(
        <div className="addsupplier">        
            <Sidebar/> 
            <div className="homeContainer">
                <h1>Add new Supplier</h1>
                <AddSupplier/>                
            </div>
        </div>
    )
}

export default Addsupplier