import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext";

export function ProductCard({ product }) {
    const navigate = useNavigate()
    const { user } = useAuth();
    const canEdit = user?.roles?.includes('Manager') || user?.roles?.includes('Admin');

    const getStockStatus = (quantity) => {
        if (quantity === 0) return { label: 'Out of Stock', color: 'bg-red-500/20 text-red-400 border-red-500/50' };
        if (quantity < 5) return { label: 'Low Stock', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50' };
        return { label: 'In Stock', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50' };
    };

    const status = getStockStatus(product.quantity);

    return (
        <div
            className={`group relative bg-white dark:bg-zinc-800/50 backdrop-blur-md border border-gray-200 dark:border-white/10 p-5 rounded-2xl transition-all duration-300 hover:bg-gray-50 dark:hover:bg-zinc-800/80 hover:shadow-xl hover:shadow-indigo-500/10 overflow-hidden ${canEdit ? 'cursor-pointer hover:scale-[1.02]' : 'cursor-default'}`}
            onClick={() => canEdit && navigate(`/products/${product.id}`)}
        >
            <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-5 h-5 ${canEdit ? 'text-gray-400 hover:text-indigo-400' : 'text-gray-600'}`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
            </div>

            <div className="flex justify-between items-start mb-4">
                <div>
                    <h2 className="font-bold text-xl text-gray-900 dark:text-white mb-1">{product.name}</h2>
                    {product.category_details && (
                        <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300">
                            {product.category_details.icon} {product.category_details.name}
                        </span>
                    )}
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${product.quantity === 0 ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                    product.quantity < 5 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                        'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                    }`}>
                    {status.label}
                </span>
            </div>

            <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 dark:text-zinc-400">Price</span>
                    <span className="font-semibold text-indigo-600 dark:text-indigo-300 text-lg">{product.price}€</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 dark:text-zinc-400">Quantity</span>
                    <span className="font-medium text-gray-700 dark:text-zinc-300">{product.quantity}</span>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
        </div>
    )
}