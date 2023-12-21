import { Link } from "react-router-dom";

export function Navigation(){
    return(
        <div className="flex justify-between py-3">
            <p className="font-bold text-3xl mb-4">PRODUCT APP</p>
            <button className="bg-indigo-500 px-3 py-2 rounded-lg">
            <Link to="/products-create">Create Product</Link>
            </button>
        </div>
    )
}