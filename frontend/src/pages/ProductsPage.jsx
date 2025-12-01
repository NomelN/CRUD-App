import { ProductsList } from "../components/ProductsList"
import { useState } from "react";

export function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <div className="flex justify-center mb-8">
        <div className="relative w-full max-w-md">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearch}
            className="block w-full p-4 pl-10 text-sm text-white border border-zinc-700 rounded-xl bg-zinc-800/50 focus:ring-indigo-500 focus:border-indigo-500 placeholder-zinc-400 backdrop-blur-sm transition-all shadow-lg"
          />
        </div>
      </div>
      <ProductsList searchTerm={searchTerm} />

    </div>
  );
}