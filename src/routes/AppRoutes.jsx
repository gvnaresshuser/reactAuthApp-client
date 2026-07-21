import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/dashboard/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";

import ProductList from "../pages/products/ProductList";
import AddProduct from "../pages/products/AddProduct";
import EditProduct from "../pages/products/EditProduct";
import Profile from "../pages/Profile";

//throw new Error("LOGIN COMPONENT LOADED");
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />

      <Route path="/products" element={<ProductList />} />
      <Route path="/products/add" element={<AddProduct />} />
      <Route path="/products/edit/:id" element={<EditProduct />} />
      <Route path="/profile" element={<Profile />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
