import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import ProductForm from "../../components/products/ProductForm";
import { getProductByIdApi, updateProductApi } from "../../api/productApi";
import Loader from "../../components/common/Loader";

import { ArrowLeft } from "lucide-react";
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
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">
              <span className="text-3xl text-white">✏️</span>
            </div>

            <div>
              <h1 className="text-4xl font-extrabold text-gray-800">
                Edit Product
              </h1>

              <p className="text-gray-500 mt-2 text-lg">
                Update product information and save your changes.
              </p>
            </div>
          </div>
        </div>

        {/* Form Card */}

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
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
