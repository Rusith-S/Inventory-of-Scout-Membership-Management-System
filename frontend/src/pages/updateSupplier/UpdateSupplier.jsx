import "./updateSupplier.scss"
import Sidebar from "../../components/sideBarComp/SidebarComp"
import UpdateSupplier from "../../components/updateSupplierComp/UpdateSupplierComp"

const Updatesupplier = () =>{
    return(
        <div className="updatesupplier">
            <Sidebar/>
            <div className="homeContainer">
                <h1>Update Supplier</h1>
                <div>
                    <UpdateSupplier/>                   
                </div>
            </div>
        </div>
    )
}

export default Updatesupplier;