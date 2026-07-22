import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";

import ProductForm from "../../components/products/ProductForm";
import { getProductByIdApi, updateProductApi } from "../../api/productApi";
import Loader from "../../components/common/Loader";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await getProductByIdApi(id);
      setProduct(response.data.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to load product.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data) => {
    try {
      setLoading(true);

      await updateProductApi(id, data);

      toast.success("🎉 Product updated successfully!");
      navigate("/products");
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed.");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !product.id) {
    return <Loader message="Loading Product..." />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-4 sm:py-6 lg:py-10">
      <div className="max-w-5xl mx-auto px-3 sm:px-6">
        {/* Header */}

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6 lg:p-8 mb-6">
          <button
            onClick={() => navigate("/products")}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition font-medium text-sm sm:text-base"
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg mx-auto sm:mx-0">
              <span className="text-2xl sm:text-3xl text-white">✏️</span>
            </div>

            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
                Edit Product
              </h1>

              <p className="text-gray-500 mt-2 text-sm sm:text-base">
                Update product information and save your changes.
              </p>
            </div>
          </div>
        </div>

        {/* Form */}

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 sm:p-6 lg:p-8">
          <ProductForm
            initialValues={product}
            onSubmit={handleSubmit}
            loading={loading}
            buttonText="Update Product"
          />
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
