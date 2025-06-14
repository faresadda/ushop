import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./app.jsx";
import { UserProvider } from "./context/userContext.jsx";
import { ProductsProvider } from "./context/productsContext.jsx";
import { OrdersProvider } from "./context/orderContext.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ProductsProvider>
          <OrdersProvider>
          <App />
          </OrdersProvider>
        </ProductsProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>,
);
