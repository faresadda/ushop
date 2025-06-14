import { useState , useContext , createContext } from "react";

export const OrdersContext = createContext();
export const useOrdersContext = () => {
  return useContext(OrdersContext);
};

export function OrdersProvider({ children }) {
  const [order , setOrder] = useState(()=>{
    const saveOrder = localStorage.getItem('order')
    return saveOrder ? JSON.parse(saveOrder) : {}
  })

  const [cartProducts , setCartProducts] = useState(()=>{
    const status = localStorage.getItem('cartProducts')
    return status ? status : true 
  })
  return (
    <OrdersContext.Provider
      value={{
        order,
        setOrder,

        cartProducts,
        setCartProducts
        
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
}
