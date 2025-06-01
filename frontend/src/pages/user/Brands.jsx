const brands = [
  {
    id: 1,
    name: "Nike",
    logo: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/nike.svg",
    color: "#FF0000",
  },
  {
    id: 2,
    name: "Adidas",
    logo: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/adidas.svg",
    color: "#000000",
  },
  {
    id: 3,
    name: "Apple",
    logo: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/apple.svg",
    color: "#000000",
  },
  {
    id: 4,
    name: "Samsung",
    logo: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/samsung.svg",
    color: "#1428A0",
  },
  {
    id: 5,
    name: "Sony",
    logo: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/sony.svg",
    color: "#000000",
  },
  {
    id: 6,
    name: "Microsoft",
    logo: "https://cdn.worldvectorlogo.com/logos/microsoft-5.svg",
    color: "#F25022",
  },
  {
    id: 7,
    name: "LG",
    logo: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/lg.svg",
    color: "#A50034",
  },
  {
    id: 8,
    name: "Dell",
    logo: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/dell.svg",
    color: "#007DB8",
  },
];

export default function Brands() {
  return (
    <div className="w-full bg-white py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Our Trusted Brands
        </h2>
        <div className="relative overflow-hidden">
          <div className="flex space-x-20 animate-scroll">
            {/* First set of brands */}
            {brands.map((brand) => (
              <div
                key={brand.id}
                className="flex-shrink-0 w-32 h-32 flex items-center justify-center p-4 hover:scale-110 transition-transform duration-300"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="w-20 h-20 object-contain transition-all duration-300"
                  style={{
                    filter: "brightness(0) saturate(100%)",
                    WebkitFilter: "brightness(0) saturate(100%)",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.filter = `brightness(0) saturate(100%) invert(0) sepia(0) saturate(1) hue-rotate(0deg) brightness(1) contrast(1)`;
                    e.target.style.WebkitFilter = `brightness(0) saturate(100%) invert(0) sepia(0) saturate(1) hue-rotate(0deg) brightness(1) contrast(1)`;
                  }}
                  onMouseOut={(e) => {
                    e.target.style.filter = "brightness(0) saturate(100%)";
                    e.target.style.WebkitFilter =
                      "brightness(0) saturate(100%)";
                  }}
                />
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {brands.map((brand) => (
              <div
                key={`duplicate-${brand.id}`}
                className="flex-shrink-0 w-32 h-32 flex items-center justify-center p-4 hover:scale-110 transition-transform duration-300"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="w-20 h-20 object-contain transition-all duration-300"
                  
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
