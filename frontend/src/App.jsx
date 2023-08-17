import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProductsPage } from "./pages/ProductsPage";
import { ProductFormPage } from "./pages/ProductFormPage";
import { Navigation } from "./components/Navigation";
import { Toaster } from "react-hot-toast"
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
/*import '@ionic/react/css/structure.css';*/
import '@ionic/react/css/typography.css';

import { setupIonicReact } from '@ionic/react';

setupIonicReact();

function App() {
  return(
    <BrowserRouter>
      <div className="container mx-auto">
        <Navigation />
        <Routes>
          <Route path="/" element={<Navigate to="/products" />} />
          <Route path="/products" element={<ProductsPage/>}/>
          <Route path="/products-create" element={<ProductFormPage/>}/>
          <Route path="/products/:id" element={<ProductFormPage/>}/>
        </Routes>
          <Toaster/>
      </div>
    </BrowserRouter>
  );
}

export default App
