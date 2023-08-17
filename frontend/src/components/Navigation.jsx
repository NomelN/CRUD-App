import { Link } from "react-router-dom";
import logo from "/src/img/image001.png";

export function Navigation(){
    return(
        <div className="flex justify-between py-3">
            <Link to="/products">
                <img src={logo} alt="Product App By Confledis" className="logo hover:animate-pulse mb-4" />
            </Link>
            <center><p className="font-bold text-3xl mb-4">PRODUCT APP</p></center>
            <button className="bg-indigo-500 px-3 py-2 rounded-lg">
            <Link to="/products-create">Create Product</Link>
            </button>
        </div>
    )
}