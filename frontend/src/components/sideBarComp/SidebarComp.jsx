import "./sidebarComp.scss";
import CSlogo from '../../image/CSlogo.png'
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddBoxIcon from '@mui/icons-material/AddBox';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import LogoutIcon from '@mui/icons-material/Logout';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {Link} from "react-router-dom"



const Sidebar = () =>{
    return(
        <div className="sidebar">
            <div className="top">
                <img src={CSlogo} className='logo' alt='logo'/>
            </div>
            <hr />
            <div className="center">
                <ul>
                    <p className="title">DASHBOARDS</p>
                    <Link to={"/"} style={{textDecoration:"none"}}>
                    <li>
                        <DashboardIcon className="icon"/>
                        <span>Inventory Dashboard</span>
                    </li>
                    </Link>

                    <Link to={"/supplierdash"}style={{textDecoration:"none"}}>
                    <li>
                        <DashboardIcon className="icon"/>
                        <span>Supplier Dashboard</span>
                    </li>
                    </Link>

                    <p className="title">ADD</p>
                    <Link to={"/addproduct"}style={{textDecoration:"none"}}>
                    <li>
                        <AddBoxIcon className="icon"/>
                        <span>Add Product</span>
                    </li>                   
                    </Link>
                    <Link to={"/addsupplier"}style={{textDecoration:"none"}}>
                    
                    <li>
                        <PersonAddAlt1Icon className="icon"/>
                        <span>Add Supplier</span>
                    </li>
                    </Link>

                    <p className="title">USER</p>
                    {/* <li>
                        <AccountCircleIcon className="icon"/>
                        <span>Profile</span>
                    </li>                    */}
                    <li>
                        <LogoutIcon className="icon"/>
                        <span>Logout</span>
                    </li>
                </ul>
            </div>

            <div className="bottom">
                <div className="colorOption"></div>
                <div className="colorOption"></div>
            </div> 

        </div>
    )
}

export default Sidebar