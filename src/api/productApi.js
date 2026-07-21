import axiosInstance from "./axios";

// Get All Products (with optional search)
export const getProductsApi = (search = "") => {
  return axiosInstance.get("/products", {
    params: { search },
  });
};

// Get Product By Id
export const getProductByIdApi = (id) => {
  return axiosInstance.get(`/products/${id}`);
};

// Create Product
export const createProductApi = (product) => {
  return axiosInstance.post("/products", product);
};

// Update Product
export const updateProductApi = (id, product) => {
  return axiosInstance.put(`/products/${id}`, product);
};

// Delete Product
export const deleteProductApi = (id) => {
  return axiosInstance.delete(`/products/${id}`);
};
