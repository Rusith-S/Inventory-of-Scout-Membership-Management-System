import "./updateProduct.scss"
import Sidebar from "../../components/sideBarComp/SidebarComp"
import UpdateProduct from "../../components/updateProductComp/UpdateProductComp"

const Updateproduct = () =>{
    return(
        <div className="updateproduct">
            <Sidebar/>
            <div className="homeContainer">
                <h1>Update Product</h1>
                <div>
                    <UpdateProduct/>                   
                </div>   
            </div>
        </div>
    )
}
export default Updateproduct;