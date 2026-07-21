import { Link } from "react-router-dom";
import {
  Package,
  PlusCircle,
  User,
  ShieldCheck,
  Search,
  Database,
} from "lucide-react";
import { useState } from "react";
import { KeyRound, X, Copy } from "lucide-react";
import { jwtDecode } from "jwt-decode";

const Dashboard = () => {
  const [showTokens, setShowTokens] = useState(false);
const accessToken = localStorage.getItem("accessToken");
const [copied, setCopied] = useState(false);
let decoded = null;

if (accessToken) {
  decoded = jwtDecode(accessToken);
}
  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl text-white p-8 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-5">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold">Welcome Back 👋</h1>

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
sm:w-[420px]
bg-white
shadow-2xl
z-50
overflow-y-auto
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

            <textarea
              readOnly
              value={accessToken || ""}
              rows={8}
              className="w-full border rounded-lg p-3 text-xs bg-gray-50"
            />
          </div>
          {decoded && (
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>User ID</span>
                <span>{decoded.id}</span>
              </div>

              <div className="flex justify-between">
                <span>Email</span>
                <span>{decoded.email}</span>
              </div>

              <div className="flex justify-between">
                <span>Role</span>
                <span>{decoded.role}</span>
              </div>

              <div className="flex justify-between">
                <span>Issued At</span>
                <span>{new Date(decoded.iat * 1000).toLocaleString()}</span>
              </div>

              <div className="flex justify-between">
                <span>Expires At</span>
                <span>{new Date(decoded.exp * 1000).toLocaleString()}</span>
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
            <div className="fixed top-5 right-5 z-[60] bg-green-600 text-white px-4 py-2 rounded-lg shadow-xl animate-pulse">
              ✅ Token copied to clipboard
            </div>
          )}
        </div>
      </div>

      {/* Cards */}

      <div className="grid md:grid-cols-3 gap-6 mt-8">
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

        <Link
          to="/products/add"
          className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-6"
        >
          <PlusCircle size={45} className="text-green-600" />

          <h2 className="text-2xl font-bold mt-4">Add Product</h2>

          <p className="text-gray-500 mt-2">Create a new product.</p>
        </Link>

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

        <div className="grid md:grid-cols-2 gap-5">
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

      <div className="flex gap-4 mt-8">
        <Link
          to="/products"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
        >
          View Products
        </Link>

        <Link
          to="/products/add"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
        >
          Add Product
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
