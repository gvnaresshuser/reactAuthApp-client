import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, PlusCircle } from "lucide-react";
import toast from "react-hot-toast";

import ProductForm from "../../components/products/ProductForm";
import { createProductApi } from "../../api/productApi";

const AddProduct = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    try {
      setLoading(true);

      await createProductApi(data);

      toast.success("🎉 Product created successfully!");

      navigate("/products");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-10">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header Card */}

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
          <button
            onClick={() => navigate("/products")}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 transition-all duration-300 font-medium shadow-sm"
          >
            <ArrowLeft size={18} />
            Back to Products
          </button>

          <div className="mt-6 flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 flex items-center justify-center shadow-lg">
              <PlusCircle size={34} className="text-white" />
            </div>

            <div>
              <h1 className="text-4xl font-extrabold text-gray-800">
                Add Product
              </h1>

              <p className="text-gray-500 mt-2 text-lg">
                Create a new product by filling in the details below.
              </p>
            </div>
          </div>
        </div>

        {/* Form Card */}

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <ProductForm
            onSubmit={handleSubmit}
            loading={loading}
            buttonText="Save Product"
          />
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
