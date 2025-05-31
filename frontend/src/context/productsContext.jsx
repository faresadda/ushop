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

export const ProductsContext = createContext();
export const useProductsContext = () => {
  return useContext(ProductsContext);
};
export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([
    {
      id: 0,
      image: phone2,
      name: "iphone 13 pro",
      price: 472.0,
      sold: "117",
      oldPrice: 590.0,
      discount: 20,
      category: "phones",
      ship: 10.53,
      description:
        'Apple iPhone 13 Pro 13pro 128/256/512GB/1TB ROM 6GB RAM 6.1" Super Retina OLED A15 IOS Face ID NFC Unlocked 5G 98% New Cellphone',
      options: {
        size: ["128GB", "256GB", "512GB"],
        color: ["Silver", "Graphite", "Gold"],
      },
    },
    {
      id: 1,
      image: phones3,
      name: "120W Fast Charging",
      price: 2.44,
      sold: "+5000",
      oldPrice: 3.94,
      discount: 38,
      category: "phones",
      ship: 0.59,
      description:
        "120W Fast Charging 4 Ports Mobile Phone Charger QC3.0 USB Type C Chargers Dual PD Wall Adapter EU/US/UK Plug for iPhone15 Xiaomi",
      options: {
        size: ["4 Ports"],
        color: ["Black", "White"],
      },
    },
    {
      id: 2,
      image: phones4,
      name: "200000mAh Power Bank",
      price: 9.11,
      sold: "521",
      oldPrice: 18.21,
      discount: 50,
      category: "phones",
      ship: 12.27,
      description:
        "200000mAh Power Bank 120W Super Fast Charger Battery Large Capacity Digital Display Power Bank For Iphone Samsung Huawei Xiaomi",
      options: {
        size: ["200000mAh"],
        color: ["Black", "Blue"],
      },
    },
    {
      id: 3,
      image: pc2,
      name: "AKPAD-Windows 10 11 Pro",
      price: 403.59,
      sold: "137",
      oldPrice: 593.52,
      discount: 32,
      category: "computer",
      ship: 99.4,
      description:
        "AKPAD-Windows 10 11 Pro Gaming IPS Laptop, 4700U Max Ram 32GB Rom 2TB SSD Metal Computer, 5G WiFi, Bluetooth, AMD Ryzen 7",
      options: {
        size: ["16GB RAM / 1TB SSD", "32GB RAM / 2TB SSD"],
        color: ["Silver", "Gray"],
      },
    },
    {
      id: 4,
      image: pc3,
      name: "Gaming Keyboard",
      price: 20.51,
      sold: "117",
      oldPrice: 590,
      discount: 20,
      category: "computer",
      ship: 0,
      description:
        "K617 RGB USB Mini Mechanical Gaming Keyboard Red Switch 61 Keys Wired detachable cable,portable for travel",
      options: {
        size: ["61 Keys"],
        color: ["Black", "Pink"],
      },
    },
    {
      id: 5,
      image: pc4,
      name: "AMD New Ryzen 7 5700X",
      price: 175.89,
      sold: "+1000",
      oldPrice: 274.85,
      discount: 36,
      category: "computer",
      ship: 30.19,
      description:
        "AMD New Ryzen 7 5700X R7 5700X 3.4GHz 8 Core 16 Thread CPU Processor 7NM L3=32M Socket AMD AM4 Gaming processador",
      options: {
        size: ["8 Cores"],
        color: ["Black"],
      },
    },
    {
      id: 6,
      image: forn2,
      name: "Modern Nordic Dressing Chair",
      price: 70.0,
      sold: "2",
      oldPrice: 114.76,
      discount: 39,
      category: "forniture",
      ship: 19.6,
      description:
        "Modern Nordic Dressing Chair Velvet Home Living Room Dining Chairs Bedroom Furniture Makeup Stool Nail Chair",
      options: {
        size: ["Standard"],
        color: ["Green", "Pink", "Gray"],
      },
    },
    {
      id: 7,
      image: forn3,
      name: "Tall Arched Cabinet",
      price: 106.85,
      sold: "+1050",
      oldPrice: 267.12,
      discount: 60,
      category: "forniture",
      ship: 84.91,
      description:
        '71" Tall Arched Cabinet, 5-Tier Arched Bookcase Storage Display Cabinet with Doors and Shelves，for Living Room , Natural Oak',
      options: {
        size: ["71 inch"],
        color: ["Oak", "White"],
      },
    },
    {
      id: 8,
      image: forn4,
      name: "Simple Folding Table",
      price: 68.25,
      sold: "402",
      oldPrice: 89.81,
      discount: 24,
      category: "forniture",
      ship: 0,
      description:
        "Simple Folding Table Dormitory Writing Study Table and Chair Single Dining Table Dining Rectangular Computer Desk Modern Wood",
      options: {
        size: ["100x50cm", "120x60cm"],
        color: ["Wood", "Black"],
      },
    },
    {
      id: 9,
      image: clothes2,
      name: "Men's Jeans Japanese Vintage",
      price: 12.0,
      sold: "193",
      oldPrice: 27.9,
      discount: 57,
      category: "clothes",
      ship: 0,
      description:
        "Spring Autumn New Men's Jeans Japanese Vintage Elastic Waist Casual Straight-leg Pants Trendy Wide-leg Trousers Loose Fit",
      options: {
        size: ["M", "L", "XL"],
        color: ["Dark Blue", "Light Blue"],
      },
    },
    {
      id: 10,
      image: clothes3,
      name: "Men's fashion hoodie",
      price: 19.62,
      sold: "369",
      oldPrice: 37.03,
      discount: 47,
      category: "clothes",
      ship: 0,
      description:
        "Men's new fashion hoodie, Casual Daily Drawstring Hooded Sweatshirt Street View Print, front kangaroo pocket, men's jacket",
      options: {
        size: ["M", "L", "XL", "XXL"],
        color: ["Black", "Gray", "Red"],
      },
    },
    {
      id: 11,
      image: clothes4,
      name: "T-shirt Summer",
      price: 7.9,
      sold: "130",
      oldPrice: 18.38,
      discount: 57,
      category: "clothes",
      ship: 0,
      description:
        "Trendy 2023 Men's Ice Silk Short Sleeve T-shirt Summer Printed Half Sleeve Body Confort Base Layer Top Serious Wear",
      options: {
        size: ["M", "L", "XL"],
        color: ["White", "Black"],
      },
    },
    {
      id: 12,
      image: shoes2,
      name: "Summer New Men's Low-Top Skateboard Shoes",
      price: 26.28,
      sold: "983",
      oldPrice: 55.92,
      discount: 53,
      category: "shoes",
      ship: 0,
      description:
        "2024 Summer New Men's Low-Top Skateboard Shoes Youth Student Online Sports Niche Shoes Live Broadcast Men's Shoes",
      options: {
        size: ["42", "43", "44"],
        color: ["White", "Gray"],
      },
    },
    {
      id: 13,
      image: shoes3,
      name: "Mary Janes Shoes",
      price: 7.8,
      sold: "14",
      oldPrice: 12.0,
      discount: 35,
      category: "shoes",
      ship: 17.89,
      description:
        "2025 Spring Autumn Women Double Buckle Mary Janes Shoes Patent Leather Dress Square Head Square Heel Solid Color Women's Shoes",
      options: {
        size: ["36", "37", "38"],
        color: ["Black", "Red"],
      },
    },
    {
      id: 14,
      image: shoes4,
      name: "Men's leather canvas shoes",
      price: 27.4,
      sold: "8",
      oldPrice: 58.31,
      discount: 53,
      category: "shoes",
      ship: 10.75,
      description:
        "Men's leather canvas shoes men's board shoes with breathable shoes trend shoes Korean version casual shoes men's leather shoes",
      options: {
        size: ["41", "42", "43"],
        color: ["Brown", "Black"],
      },
    },
    {
      id: 15,
      image: elec2,
      name: "Waterproof Smart Watch",
      price: 9.94,
      sold: "+1000",
      oldPrice: 26.26,
      discount: 62,
      category: "electronics",
      ship: 0,
      description:
        "1.83'' Waterproof Smart Watch with Message Answer Call Sleep Monitoring Sports Pedometer Information Alerts For iPhone Android",
      options: {
        size: ["1.83 inch"],
        color: ["Black", "Blue", "Pink"],
      },
    },
    {
      id: 16,
      image: elec3,
      name: "4K Digital Camera",
      price: 68.56,
      sold: "+1000",
      oldPrice: 120.28,
      discount: 43,
      category: "electronics",
      ship: 0,
      description:
        "4K Digital Camera for Photography and 18X Digital Zoom Camera 64MP Compact Vlogging Camera 3'' 180° Flip Screen with Flash",
      options: {
        size: ["64MP"],
        color: ["Black", "Silver"],
      },
    },
    {
      id: 17,
      image: elec4,
      name: "Handheld Video Game",
      price: 54.43,
      sold: "600",
      oldPrice: 108.86,
      discount: 60,
      category: "electronics",
      ship: 0,
      description:
        "Open Source RX6H Retro Handheld Video Game Console Linux System 3.5 Inch IPS Screen Portable Pocket Video Player 64GB Games",
      options: {
        size: ["64GB"],
        color: ["Gray", "White"],
      },
    },
    {
      id: 18,
      image: acc2,
      name: "Fashion Reading Glasses",
      price: 0.89,
      sold: "353",
      oldPrice: 1.77,
      discount: 50,
      category: "accessories",
      ship: 0.62,
      description:
        "Fashion Reading Glasses Anti-Blue Light Women Men Computer Presbyopia Hyperopia Reading Eyeglasses+1.0+1.5+2.0+2.5+3.0+3.5+4.0",
      options: {
        size: ["+1.0", "+2.0", "+3.0"],
        color: ["Black", "Transparent"],
      },
    },
    {
      id: 19,
      image: acc3,
      name: "Retro Baseball Cap Versatile Sunscreen",
      price: 7.57,
      sold: "299",
      oldPrice: 590,
      discount: 71,
      category: "accessories",
      ship: 0,
      description:
        "Retro Baseball Cap Versatile Sunscreen and Shading Hat Breathable Adjustable Hip Hop Gorras Trucker Cotton Cap Dad Hats",
      options: {
        size: ["One Size"],
        color: ["Beige", "Black", "Navy"],
      },
    },
    {
      id: 20,
      image: acc4,
      name: "Fitness Weight Lifting Wristband Gloves",
      price: 6.76,
      sold: "138",
      oldPrice: 24.13,
      discount: 72,
      category: "accessories",
      ship: 0,
      description:
        "Fitness Weight Lifting Wristband Gloves Gym Gloves for Men Women Body Building Training Sports Exercise Cycling Glove Shockproof",
      options: {
        size: ["M", "L", "XL"],
        color: ["Black", "Gray"],
      },
    },
  ]);

  const [productsCopy, setProductsCopy] = useState(products);

  const [cart, setCart] = useState(() => {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(()=>{
    localStorage.setItem('cart',JSON.stringify(cart))
  },[cart])

  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const [index, setIndex] = useState(0);

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

  const [options, setOptions] = useState({});
  return (
    <ProductsContext.Provider
      value={{
        products,
        setProducts,
        productsCopy,
        cart,
        setCart,
        index,
        setIndex,
        categories,
        dispatch,
        favorites,
        setFavorites,
        options,
        setOptions
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}
