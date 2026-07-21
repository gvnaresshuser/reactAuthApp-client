import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getProductsApi, deleteProductApi } from "../api/productApi";
import Swal from "sweetalert2";

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchProducts = async (searchText = "") => {
    try {
      setLoading(true);

      const response = await getProductsApi(searchText);

      setProducts(response.data.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    //if (!window.confirm("Delete this product?")) return;
    const result = await Swal.fire({
      title: "Delete Product?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "🗑 Yes, Delete",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      focusCancel: true,
    });

    if (!result.isConfirmed) return;

    try {
      await deleteProductApi(id);

      toast.success("Product deleted successfully");

      fetchProducts(search);
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    search,
    setSearch,
    fetchProducts,
    deleteProduct,
  };
};

export default useProducts;
