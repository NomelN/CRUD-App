import { useEffect, useState } from "react"
import { getAllProducts } from "../api/products.api";
import { ProductCard } from "./ProductCard";
import { SkeletonCard } from "./SkeletonCard";

export function ProductsList({ searchTerm }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState('name'); // name, price, quantity
  const [filterStock, setFilterStock] = useState('all'); // all, in_stock, low_stock, out_of_stock

  useEffect(() => {
    async function loadProducts() {
      setIsLoading(true);
      try {
        const res = await getAllProducts();
        setProducts(res.data);
      } catch (error) {
        console.error("Failed to load products", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadProducts();
  }, []);

  const filteredProducts = products
    .filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((product) => {
      if (filterStock === 'all') return true;
      if (filterStock === 'in_stock') return product.quantity >= 5;
      if (filterStock === 'low_stock') return product.quantity > 0 && product.quantity < 5;
      if (filterStock === 'out_of_stock') return product.quantity === 0;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      if (sortBy === 'quantity_asc') return a.quantity - b.quantity;
      if (sortBy === 'quantity_desc') return b.quantity - a.quantity;
      return 0;
    });

  return (
    <div>
      <div className="flex flex-wrap gap-4 mb-6 justify-center md:justify-end">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2.5 transition-colors"
        >
          <option value="name">Sort by Name</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="quantity_asc">Quantity: Low to High</option>
          <option value="quantity_desc">Quantity: High to Low</option>
        </select>

        <select
          value={filterStock}
          onChange={(e) => setFilterStock(e.target.value)}
          className="bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2.5 transition-colors"
        >
          <option value="all">All Stock Status</option>
          <option value="in_stock">In Stock</option>
          <option value="low_stock">Low Stock</option>
          <option value="out_of_stock">Out of Stock</option>
        </select>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500 dark:text-zinc-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mb-4 opacity-50">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3.75h3.75M12 15.75h3.75M12 7.5V3.75m0-3.75h3.75M12 15.75V20.25M8.25 15.75h-3.75M12 7.5v-3.75m0 0h-3.75" />
          </svg>
          <p className="text-xl font-medium">No products found</p>
          <p className="text-sm mt-2">Try adjusting your search or filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}