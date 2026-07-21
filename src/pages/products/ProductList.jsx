import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, RefreshCw } from "lucide-react";

import useProducts from "../../hooks/useProducts";
import ProductCard from "../../components/products/ProductCard";
import { LayoutDashboard } from "lucide-react";
import {  useNavigate } from "react-router-dom";

const ProductList = () => {
  const navigate = useNavigate();
  const { products, loading, search, setSearch, fetchProducts, deleteProduct } =
    useProducts();

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts(search);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <div
          onClick={() => navigate("/dashboard")}
          className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 hover:shadow-xl transition-all duration-300"
          title="Go to Dashboard"
        >
          <LayoutDashboard size={30} className="text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Product Management
          </h1>

          <p className="text-gray-500 mt-1">Manage all your products</p>
        </div>

        <Link
          to="/products/add"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg flex items-center gap-2 transition"
        >
          <Plus size={20} />
          Add Product
        </Link>
      </div>

      {/* Search */}

      <div className="bg-white rounded-xl shadow p-4 mb-8">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Box */}

          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />

            <input
              type="text"
              placeholder="Search by product name or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Refresh Button */}

          <button
            onClick={() => fetchProducts(search)}
            className="sm:w-auto w-full min-h-[48px] px-6 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center justify-center gap-2 transition duration-200 shadow-md hover:shadow-lg"
          >
            <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
            <span>Refresh</span>
            <div className="w-6 h-6 rounded-full bg-green-500 ring-2 ring-white text-white flex items-center justify-center text-sm font-bold shadow-md animate-spin-y">
              {products.length}
            </div>
          </button>
        </div>
      </div>

      {/* Loading */}

      {loading && (
        <div className="text-center py-20">
          <RefreshCw size={45} className="animate-spin mx-auto text-blue-600" />

          <p className="mt-4 text-gray-500">Loading products...</p>
        </div>
      )}

      {/* Empty */}

      {!loading && products.length === 0 && (
        <div className="text-center py-20">
          <div className="text-7xl">📦</div>

          <h2 className="text-2xl font-bold mt-4">No Products Found</h2>

          <p className="text-gray-500 mt-2">
            Try another search or add a new product.
          </p>
        </div>
      )}

      {/* Cards */}

      {!loading && products.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onDelete={deleteProduct}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
