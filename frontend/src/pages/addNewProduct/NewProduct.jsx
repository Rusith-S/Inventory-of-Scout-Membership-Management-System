import "./newProduct.scss"
import Sidebar from "../../components/sideBarComp/SidebarComp"
import AddProduct from "../../components/addProductComp/AddProductComp"

const Addproduct = () =>{
    return(
        <div className="addproduct">
            <Sidebar/>
            <div className="homeContainer">
                <h1>Add new Product</h1>
                <div>
                    <AddProduct/>
                </div>   
            </div>
        </div>
        
    )
}

export default Addproduct
