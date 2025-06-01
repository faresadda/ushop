import { useProductsContext } from "../../context/productsContext";
import { FaArrowRight } from "react-icons/fa";

export default function Categories() {
  const { categories } = useProductsContext();

  return (
    <section className="w-full py-16 px-5 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Shop by Category</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our curated collections designed to meet your every need with premium quality and exceptional value.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {categories.filter(cat => cat.card && cat.card.cardTitle).map((cat, index) => (
            <div
              key={cat.card.cardTitle}
              className={`${cat.card.bg} rounded-2xl overflow-hidden shadow-lg transform transition-all duration-300 hover:shadow-xl border border-gray-100 group relative pb-12`}
            >
              <div className="p-6 flex flex-col sm:flex-row items-center gap-6">
                <div className="relative">
                  <div className="w-28 h-28 rounded-full bg-white/30 flex items-center justify-center p-2">
                    <img 
                      src={cat.img} 
                      alt={cat.card.cardTitle} 
                      className="w-20 h-20 object-contain transition-transform duration-300 group-hover:scale-110" 
                    />
                  </div>
                </div>
                
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="font-bold text-gray-800 text-xl mb-2">{cat.card.cardTitle}</h3>
                  <div className="text-gray-600 mb-1">{cat.title}</div>
                  <div className="text-gray-500 text-sm mb-4">{cat.card.cardSubtitle}</div>
                  <button className={`${cat.card.btn} px-6 py-2 rounded-full text-sm font-bold transition-colors flex items-center justify-center sm:justify-start gap-2 mx-auto`}>
                    Shop Collection
                    <FaArrowRight />
                  </button>
                </div>
              </div>

              <div className="bg-black/5 absolute bottom-0 left-0 right-0 px-6 py-3 flex justify-between items-center">
                <span className="text-sm text-gray-700">{Math.floor(Math.random() * 25) + 10} Products</span>
                <span className="text-xs text-gray-500 font-medium">Updated Weekly</span>
              </div>
            </div>
          ))}
        </div>

      
      </div>
    </section>
  );
}