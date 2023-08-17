import { useEffect, useState } from "react"
import { getAllProducts } from "../api/products.api";
import { ProductCard } from "./ProductCard";

export function ProductsList({ searchTerm }){
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function loadProducts() {
            const res = await getAllProducts();
            setProducts(res.data);
        }
        loadProducts();
    }, []);

    const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="grid grid-cols-3 gap-3">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
    );
}