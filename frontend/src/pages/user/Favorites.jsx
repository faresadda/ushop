import { Heart, Trash2, ShoppingCart, Star, Plus, ShoppingBag, Filter, Grid3X3, List } from "lucide-react";
import { useProductsContext } from "../../context/productsContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function FavoriteProductsPage() {
  const { favorites, setFavorites, setIndex, products } = useProductsContext();
  const [viewMode, setViewMode] = useState("grid");
  const [sortOption, setSortOption] = useState("newest");
  const navigate = useNavigate();

  const removeFromFavorites = (id) => {
    setFavorites(() => {
      const favoritesArray = favorites.filter((product) => product.id !== id);
      localStorage.setItem('favorites', JSON.stringify(favoritesArray));
      return favoritesArray;
    });
    toast.success('Product removed from favorites');
  };

  const clearAllFavorites = () => {
    if (window.confirm('Are you sure you want to remove all favorites?')) {
      setFavorites([]);
      localStorage.setItem('favorites', JSON.stringify([]));
      toast.success('All favorites cleared');
    }
  };

  const goToProduct = (product) => {
    const productIndex = products.findIndex(p => p.id === product.id);
    if (productIndex !== -1) {
      setIndex(productIndex);
      navigate('/shop');
    }
  };

  // Sort favorites based on selected option
  const sortedFavorites = [...favorites].sort((a, b) => {
    switch (sortOption) {
      case 'price-low':
        return parseFloat(a.price) - parseFloat(b.price);
      case 'price-high':
        return parseFloat(b.price) - parseFloat(a.price);
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-white">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                My Favorites
              </h1>
              <p className="text-gray-600">
                {favorites.length} {favorites.length === 1 ? 'item' : 'items'} saved for later
              </p>
            </div>
            
            {favorites.length > 0 && (
              <div className="flex flex-wrap items-center gap-3">
                {/* Sort Options */}
                <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
                  <Filter className="w-4 h-4 text-gray-600 mr-2" />
                  <select 
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="bg-transparent text-sm border-none outline-none focus:ring-0 text-gray-700 cursor-pointer"
                  >
                    <option value="newest">Recently Added</option>
                    <option value="name">Name A-Z</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>

                {/* View Toggle */}
                <div className="flex items-center bg-gray-100 rounded-lg p-1">
                  <button 
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded ${viewMode === "grid" ? "bg-white shadow-sm" : ""}`}
                  >
                    <Grid3X3 className="w-4 h-4 text-gray-700" />
                  </button>
                  <button 
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded ${viewMode === "list" ? "bg-white shadow-sm" : ""}`}
                  >
                    <List className="w-4 h-4 text-gray-700" />
                  </button>
                </div>

                {/* Clear All Button */}
                <button
                  onClick={clearAllFavorites}
                  className="flex items-center gap-2 text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear All
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {favorites.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <Heart className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              No Favorites Yet
            </h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Start browsing our products and add items to your favorites by clicking the heart icon.
            </p>
            <button
              onClick={() => navigate('/products')}
              className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
            >
              <ShoppingBag className="w-5 h-5" />
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            {/* Grid View */}
            {viewMode === "grid" && (
              <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {sortedFavorites.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => goToProduct(product)}
                    className="bg-primary rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100 group"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFromFavorites(product.id);
                        }}
                        className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
                      >
                        <Heart className="w-4 h-4 text-red-500 fill-current" />
                      </button>
                      
                      {product.discount > 0 && (
                        <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                          -{product.discount}%
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 truncate">
                        {product.name}
                      </h3>
                      
                      <div className="flex items-center gap-1 mb-2 max-[450px]:flex-col max-[450px]:items-start">
                        <div className="flex text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-current" />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500 ml-1">
                          4.8 ({product.sold || Math.floor(Math.random() * 100) + 20})
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-gray-900">
                            ${product.price}
                          </span>
                          {product.oldPrice && product.oldPrice > product.price && (
                            <span className="text-sm text-gray-500 line-through">
                              ${product.oldPrice}
                            </span>
                          )}
                        </div>
                        
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* List View */}
            {viewMode === "list" && (
              <div className="space-y-4">
                {sortedFavorites.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => goToProduct(product)}
                    className="bg-primary rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 group"
                  >
                    <div className="flex flex-col sm:flex-row gap-4 p-4">
                      <div className="relative sm:w-32 sm:h-32 w-full h-48 flex-shrink-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                        />
                        {product.discount > 0 && (
                          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                            -{product.discount}%
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900 text-lg mb-2">
                            {product.name}
                          </h3>
                          <div className="flex items-center gap-1 mb-2">
                            <div className="flex text-amber-400">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-current" />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500 ml-1">
                              4.8 ({product.sold || Math.floor(Math.random() * 100) + 20} reviews)
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-xl font-bold text-gray-900">
                              ${product.price}
                            </span>
                            {product.oldPrice && product.oldPrice > product.price && (
                              <span className="text-sm text-gray-500 line-through">
                                ${product.oldPrice}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                removeFromFavorites(product.id);
                              }}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="text-2xl" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
