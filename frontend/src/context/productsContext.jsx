import { createContext, useContext, useState } from "react";
import phone2 from "../../public/phone2.png";
import phones3 from "../../public/phones3.png";
import phones4 from "../../public/phones4.png";
import pc2 from "../../public/pc2.png";
import pc3 from "../../public/pc3.png";
import pc4 from "../../public/pc4.png";
import forn2 from "../../public/forn2.png";
import forn3 from "../../public/forn3.png";
import forn4 from "../../public/forn4.png";
import clothes2 from "../../public/clothes2.png";
import clothes3 from "../../public/clothes3.png";
import clothes4 from "../../public/clothes4.png";
import shoes2 from "../../public/shoes2.png";
import shoes3 from "../../public/shoes3.png";
import shoes4 from "../../public/shoes4.png";
import elec2 from "../../public/elec2.png";
import elec3 from "../../public/elec3.png";
import elec4 from "../../public/elec4.png";
import acc2 from "../../public/acc2.png";
import acc3 from "../../public/acc3.png";
import acc4 from "../../public/acc4.png";
import { useEffect, useReducer } from "react";
import phone1 from "../../public/phone1.png";
import pc1 from "../../public/pc1.png";
import forn1 from "../../public/forn1.png";
import clothes1 from "../../public/clothes1.png";
import shoes1 from "../../public/shoes1.png";
import elec1 from "../../public/elec1.png";
import acc1 from "../../public/acc1.png";
import { getProducts } from "../service/productService";

export const ProductsContext = createContext();
export const useProductsContext = () => {
  return useContext(ProductsContext);
};
export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProductsFunction = async () => {
      const res = await getProducts();
      setProducts(res);
    };
    getProductsFunction();
  }, []);

  const [productsCopy, setProductsCopy] = useState(products);

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const categories = [
    {
      value: "phones",
      title: "Phones & Telecommunications",
      img: phone1,
      card: {
        bg: "bg-blue-50",
        btn: "bg-blue-600 hover:bg-blue-700 text-white",
        cardTitle: "Galaxy S13 Lite",
        cardSubtitle: "Love The Price.",
      },
    },
    {
      value: "clothes",
      title: "Clothes",
      img: clothes1,
      card: {
        bg: "bg-pink-50",
        btn: "bg-pink-500 hover:bg-pink-600 text-white",
        cardTitle: "Hoodie & Sweatshirt",
        cardSubtitle: "Light On Price.",
      },
    },
    {
      value: "computer",
      title: "Computer,Office & Education",
      img: pc1,
      card: {
        bg: "bg-purple-50",
        btn: "bg-purple-500 hover:bg-purple-600 text-white",
        cardTitle: "Mac Book Pro. New Arrival",
        cardSubtitle: "New Added",
      },
    },
    {
      value: "forniture",
      title: "Furniture",
      img: forn1,
      card: {
        bg: "bg-blue-100",
        btn: "bg-blue-600 hover:bg-blue-700 text-white",
        cardTitle: "Modern Furniture",
        cardSubtitle: "Flat 25% Off",
      },
    },
    {
      value: "shoes",
      title: "Shoes",
      img: shoes1,
      card: {
        bg: "bg-white",
        btn: "bg-gray-800 hover:bg-gray-900 text-white",
        cardTitle: "Nike Air Max",
        cardSubtitle: "Best Price",
      },
    },
    {
      value: "accessories",
      title: "Accessories",
      img: acc1,
      card: {
        bg: "bg-yellow-50",
        btn: "bg-yellow-400 hover:bg-yellow-500 text-white",
        cardTitle: "Glasses",
        cardSubtitle: "$99 Each.",
      },
    },
    {
      value: "electronics",
      title: "Consumer Electronics",
      img: elec1,
      card: {
        bg: "bg-gray-200",
        btn: "bg-black hover:bg-gray-800 text-white",
        cardTitle: "Camera 4K",
        cardSubtitle: "Best Tech Collection.",
      },
    },
  ];

  const [state, dispatch] = useReducer(reducer, { category: "Phones" });
  function reducer(state, action) {
    const category = categories.find((cat) => cat.value === action.type);
    if (category) {
      return { category: category.title };
    }
    return state;
  }

  const [attributes, setAttributes] = useState({});
  return (
    <ProductsContext.Provider
      value={{
        products,
        setProducts,

        productsCopy,
        cart,
        setCart,

        categories,
        dispatch,

        favorites,
        setFavorites,

        attributes,
        setAttributes,
        
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}
