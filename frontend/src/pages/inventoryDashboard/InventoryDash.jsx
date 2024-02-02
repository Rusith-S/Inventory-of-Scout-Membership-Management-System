import "./inventoryDash.scss"
import Sidebar from "../../components/sideBarComp/SidebarComp"
import ProductTable from "../../components/productTableComp/ProductTableComp"

const Inventorydash = () =>{
    return(
        <div className="inventory">
            <Sidebar/>
            <div className="homeContainer">  
                <div><ProductTable/> </div>                  
            </div>
        </div>     
    )
}

export default Inventorydash