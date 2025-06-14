import React, { useState, useEffect } from 'react';
import { Package, ShoppingBag, Star, ArrowRight, Eye, Search, User } from 'lucide-react';

const HomePage = ({ onLoginClick }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Replace with your actual backend URL
  const API_BASE = 'http://localhost:5000/api';

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/products`);
      if (response.ok) {
        const data = await response.json();
        setProducts(data.product || []);
      }
    } catch (error) {
      console.error('Error loading products:', error);
      // Show some mock products for demo
      setProducts([
        { _id: '1', name: 'Sample Product 1', description: 'This is a sample product description', price: 99 },
        { _id: '2', name: 'Sample Product 2', description: 'Another sample product for demonstration', price: 149 },
        { _id: '3', name: 'Sample Product 3', description: 'Yet another sample product', price: 199 }
      ]);
    }
    setLoading(false);
  };

  const filteredProducts = products.filter(product =>
    product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Package className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">ProductStore</h1>
                <p className="text-sm text-gray-600">Discover amazing products</p>
              </div>
            </div>
            <button
              onClick={onLoginClick}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors"
            >
              <User className="h-4 w-4" />
              <span>Admin Login</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Welcome to ProductStore
          </h2>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Discover our amazing collection of products
          </p>
          <div className="flex items-center justify-center space-x-4">
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <ShoppingBag className="h-8 w-8 mx-auto mb-2" />
              <p className="text-sm">Quality Products</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <Star className="h-8 w-8 mx-auto mb-2" />
              <p className="text-sm">Best Prices</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <Package className="h-8 w-8 mx-auto mb-2" />
              <p className="text-sm">Fast Delivery</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Products</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Browse through our carefully curated selection of high-quality products
            </p>
          </div>

          {/* Search */}
          <div className="max-w-md mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
              />
            </div>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Loading products...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h4 className="text-xl font-medium text-gray-900 mb-2">No products found</h4>
              <p className="text-gray-600">
                {searchTerm ? 'Try adjusting your search terms.' : 'No products available at the moment.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <div key={product._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                    <Package className="h-16 w-16 text-white opacity-80" />
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h4>
                    <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-blue-600">${product.price}</span>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                        <Eye className="h-4 w-4" />
                        <span>View</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Stats */}
          {products.length > 0 && (
            <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">{products.length}</div>
                  <div className="text-gray-600">Total Products</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    ${products.reduce((sum, product) => sum + (product.price || 0), 0)}
                  </div>
                  <div className="text-gray-600">Total Value</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    ${products.length > 0 ? Math.round(products.reduce((sum, product) => sum + (product.price || 0), 0) / products.length) : 0}
                  </div>
                  <div className="text-gray-600">Average Price</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Package className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold">ProductStore</h3>
          </div>
          <p className="text-gray-400">
            Your trusted destination for quality products
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;