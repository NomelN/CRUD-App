import { ProductsList } from "../components/ProductsList"
import { useState } from "react";

export function ProductsPage(){
    const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
        <center>
            <input
                    type="text"
                    placeholder="Search product..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="bg-zinc-700 p-3 rounded-lg w-50 mb-3"
            />
      </center>
      <ProductsList searchTerm={searchTerm} />
      
    </div>
    
  );
}