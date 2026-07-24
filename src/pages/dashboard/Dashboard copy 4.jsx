import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Package,
  PlusCircle,
  User,
  ShieldCheck,
  Search,
  Database,
  LogOut,
  Boxes,
  CirclePlus,
  Settings,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { KeyRound, X, Copy } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import { logoutApi } from "../../api/authApi"; // adjust the path as needed
import toast from "react-hot-toast";
import JwtStatusCard from "../../components/JwtStatusCard";
import { useToken } from "../../context/TokenContext";
const Dashboard = () => {
  //------------------------

  const handleProductsClick = async () => {
    navigate("/products");
  };
  //------------------------
  const [loggingOut, setLoggingOut] = useState(false);
  const navigate = useNavigate();
  const [showTokens, setShowTokens] = useState(false);
  const accessToken = localStorage.getItem("accessToken");
  const [copied, setCopied] = useState(false);
  let decoded = null;

  if (accessToken) {
    decoded = jwtDecode(accessToken);
  }
  //--------------------------------

  const handleLogout = async () => {
    setLoggingOut(true);

    const toastId = toast.loading("Logging out...");

    try {
      await logoutApi();

      toast.success("Logged out successfully.", {
        id: toastId,
      });

      localStorage.removeItem("accessToken");

      navigate("/login", { replace: true });
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Logout failed.", {
        id: toastId,
      });

      setLoggingOut(false);
    }
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 w-full overflow-x-hidden">
      <JwtStatusCard />
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl text-white p-8 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-5">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              Welcome Back 👋
            </h1>

            <p className="mt-2 text-blue-100">
              Manage your products and account from one place.
            </p>
          </div>

          <button
            onClick={() => setShowTokens(true)}
            className="self-end sm:self-auto
               w-12 h-12 sm:w-14 sm:h-14
               rounded-2xl
               bg-white/20
               hover:bg-white/30
               backdrop-blur-sm
               flex items-center justify-center
               transition-all
               hover:scale-110"
          >
            <KeyRound size={24} />
          </button>
        </div>
      </div>

      {/* Dark Overlay */}
      {showTokens && (
        <div
          onClick={() => setShowTokens(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        />
      )}

      {/* Sliding Token Drawer */}
      <div
        className={`
        fixed
        top-0
        right-0
        h-full
        w-full
        sm:w-105
        max-w-full
        overflow-x-hidden
        overflow-y-auto
        bg-white
        shadow-2xl
        z-50
        transform
        transition-transform
        duration-500
        ${showTokens ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">🔐 JWT Tokens</h2>

          <button onClick={() => setShowTokens(false)}>
            <X />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h3 className="font-semibold mb-2">Access Token</h3>
            <div className="border rounded-lg p-3 bg-gray-50 overflow-x-auto">
              <code className="text-[11px] break-all">{accessToken}</code>
            </div>
          </div>
          {decoded && (
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>User ID</span>
                <span>{decoded.id}</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                <span className="font-medium">Email</span>

                <span className="break-all text-right">{decoded.email}</span>
              </div>

              <div className="flex justify-between">
                <span>Role</span>
                <span>{decoded.role}</span>
              </div>

              <div className="flex justify-between">
                <span>Issued At</span>
                <span className="text-right wrap-break-word">
                  {new Date(decoded.iat * 1000).toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Expires At</span>
                <span className="text-right wrap-break-word">
                  {new Date(decoded.exp * 1000).toLocaleString()}
                </span>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(accessToken);
                  setCopied(true);

                  setTimeout(() => {
                    setCopied(false);
                  }, 2000);
                }}
                className="mt-3 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
                <Copy size={16} />
                Copy Token
              </button>
            </div>
          )}
          {copied && (
            <div
              className="fixed
              top-4
              left-1/2
              -translate-x-1/2
              sm:left-auto
              sm:right-5
              sm:translate-x-0
              z-[60] bg-green-600 text-white px-4 py-2 rounded-lg shadow-xl animate-pulse"
            >
              ✅ Token copied to clipboard
            </div>
          )}
        </div>
      </div>

      {/* Cards */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {/* Products */}

        <Link
          to="/products"
          className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-6"
        >
          <Package size={45} className="text-blue-600" />

          <h2 className="text-2xl font-bold mt-4">Products</h2>

          <p className="text-gray-500 mt-2">View, edit and delete products.</p>
        </Link>

        {/* Add */}

        {/*  <Link
          to="/products/add"
          className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-6"
        >
          <PlusCircle size={45} className="text-green-600" />

          <h2 className="text-2xl font-bold mt-4">Add Product</h2>

          <p className="text-gray-500 mt-2">Create a new product.</p>
        </Link> */}
        <div
          onClick={handleProductsClick}
          className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-6 cursor-pointer"
        >
          <PlusCircle size={45} className="text-green-600" />

          <h2 className="text-2xl font-bold mt-4">Products</h2>

          <p className="text-gray-500 mt-2">View all products.</p>
        </div>

        {/* Profile */}

        <Link
          to="/profile"
          className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-6"
        >
          <User size={45} className="text-purple-600" />

          <h2 className="text-2xl font-bold mt-4">My Profile</h2>

          <p className="text-gray-500 mt-2">View your account details.</p>
        </Link>
      </div>

      {/* Features */}

      <div className="bg-white rounded-xl shadow mt-10 p-8">
        <h2 className="text-2xl font-bold mb-6">Application Features</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 gap-5">
          <div className="flex items-center gap-3">
            <ShieldCheck className="text-green-600" />
            JWT Authentication
          </div>

          <div className="flex items-center gap-3">
            <Package className="text-blue-600" />
            Product CRUD
          </div>

          <div className="flex items-center gap-3">
            <Search className="text-orange-600" />
            Product Search
          </div>

          <div className="flex items-center gap-3">
            <Database className="text-purple-600" />
            PostgreSQL Database
          </div>
        </div>
      </div>

      {/* Quick Actions */}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
        <Link
          to="/products"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all duration-200 flex items-center gap-2"
        >
          <Boxes size={18} />
          View Products
        </Link>

        <Link
          to="/products/add"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-all duration-200 flex items-center gap-2"
        >
          <CirclePlus size={18} />
          Add Product
        </Link>
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className={`px-6 py-3 rounded-lg transition-all duration-200 flex items-center gap-2 text-white ${
            loggingOut
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700"
          }`}
        >
          {loggingOut ? (
            <Settings size={18} className="animate-spin" />
          ) : (
            <LogOut size={18} />
          )}

          {loggingOut ? "Logging out..." : "Logout"}
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
