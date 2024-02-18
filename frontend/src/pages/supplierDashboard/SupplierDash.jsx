import "./supplierDash.scss"
import Sidebar from "../../components/sideBarComp/SidebarComp"
import SupplierTable from "../../components/supplierTableComp/SupplierTableComp"

const Supplierdash = () =>{
    return(
        <div className="supplier">
            <Sidebar/>
            <div className="homeContainer">
                <SupplierTable/>
            </div>
        </div>
    )
}

export default Supplierdash