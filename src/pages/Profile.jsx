import { Link } from "react-router-dom";
import {
  UserCircle2,
  Mail,
  ShieldCheck,
  BadgeCheck,
  Clock,
  Package,
  PlusCircle,
  KeyRound,
  LogOut,
  Settings,
} from "lucide-react";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
//import axios from "axios";
import { logoutApi } from "../api/authApi"; // adjust the path as needed
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Profile = () => {
  const [loggingOut, setLoggingOut] = useState(false);
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");

  let user = {};

  if (accessToken) {
    user = jwtDecode(accessToken);
  }
  /* const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/logout`,
        {},
        {
          withCredentials: true,
        },
      );

      toast.success("Logged out successfully.");
    } catch (error) {
      console.error(error);

      toast.error("Logout failed.");
    } finally {
      // Always remove the access token
      localStorage.removeItem("accessToken");

      navigate("/login", { replace: true });
    }
  }; */
/*   const handleLogout = async () => {
    try {
      await logoutApi();

      toast.success("Logged out successfully.");

      localStorage.removeItem("accessToken");

      navigate("/login", { replace: true });
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Logout failed.");
    }
  }; */
  const handleLogout = async () => {
    setLoggingOut(true);

    const toastId = toast.loading("Logging out...", {
      style: {
        background: "#dc2626",
        color: "#fff",
        border: "1px solid #b91c1c",
        padding: "16px",
        borderRadius: "12px",
      },
      iconTheme: {
        primary: "#ffffff",
        secondary: "#dc2626",
      },
    });

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
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}

      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-2xl text-white p-8 shadow-lg">
        <h1 className="text-4xl font-bold">My Profile</h1>

        <p className="mt-2 text-purple-100">
          Account information and authentication details.
        </p>
      </div>

      {/* Profile Card */}

      <div className="bg-white rounded-2xl shadow-lg mt-8 p-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
            <UserCircle2 size={90} className="text-white" />
          </div>

          <div className="flex-1">
            <h2 className="text-3xl font-bold">
              {user.full_name || user.name || "Administrator"}
            </h2>

            <p className="text-gray-500 mt-2">{user.email}</p>

            <div className="mt-5 flex flex-wrap gap-3">
              <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
                {user.role}
              </span>

              <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">
                User ID : {user.id}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Authentication */}

      <div className="bg-white rounded-2xl shadow-lg mt-8 p-8">
        <h2 className="text-2xl font-bold mb-6">Authentication Status</h2>

        <div className="grid md:grid-cols-2 gap-5">
          <div className="flex items-center gap-3">
            <ShieldCheck className="text-green-600" />
            JWT Authentication Enabled
          </div>

          <div className="flex items-center gap-3">
            <BadgeCheck className="text-blue-600" />
            Protected Session
          </div>

          <div className="flex items-center gap-3">
            <Clock className="text-orange-600" />
            Session Active
          </div>

          <div className="flex items-center gap-3">
            <Mail className="text-purple-600" />
            Email Verified
          </div>
        </div>
      </div>

      {/* Token Details */}

      <div className="bg-white rounded-2xl shadow-lg mt-8 p-8">
        <h2 className="text-2xl font-bold mb-6">JWT Information</h2>

        <div className="grid sm:grid-cols-2 gap-5">
          <div className="border rounded-xl p-5">
            <p className="text-gray-500">Algorithm</p>

            <h3 className="text-xl font-bold mt-2">HS256</h3>
          </div>

          <div className="border rounded-xl p-5">
            <p className="text-gray-500">Authentication</p>

            <h3 className="text-xl font-bold mt-2">Bearer Token</h3>
          </div>

          <div className="border rounded-xl p-5">
            <p className="text-gray-500">Issued At</p>

            <h3 className="font-semibold mt-2">
              {user.iat ? new Date(user.iat * 1000).toLocaleString() : "-"}
            </h3>
          </div>

          <div className="border rounded-xl p-5">
            <p className="text-gray-500">Expires At</p>

            <h3 className="font-semibold mt-2">
              {user.exp ? new Date(user.exp * 1000).toLocaleString() : "-"}
            </h3>
          </div>
        </div>
      </div>

      {/* Quick Actions */}

      <div className="bg-white rounded-2xl shadow-lg mt-8 p-8">
        <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>

        <div className="grid md:grid-cols-4 gap-5">
          <Link
            to="/products"
            className="rounded-xl border p-6 hover:shadow-lg transition text-center"
          >
            <Package className="mx-auto text-blue-600" size={40} />

            <p className="mt-4 font-semibold">Products</p>
          </Link>

          <Link
            to="/products/add"
            className="rounded-xl border p-6 hover:shadow-lg transition text-center"
          >
            <PlusCircle className="mx-auto text-green-600" size={40} />

            <p className="mt-4 font-semibold">Add Product</p>
          </Link>

          <Link
            to="/dashboard"
            className="rounded-xl border p-6 hover:shadow-lg transition text-center"
          >
            <KeyRound className="mx-auto text-yellow-500" size={40} />

            <p className="mt-4 font-semibold">JWT Dashboard</p>
          </Link>

          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className={`rounded-xl border p-6 transition text-center ${
              loggingOut
                ? "bg-gray-100 cursor-not-allowed opacity-70"
                : "hover:shadow-lg"
            }`}
          >
            {loggingOut ? (
              <Settings
                size={40}
                className="mx-auto text-gray-600 animate-spin"
              />
            ) : (
              <LogOut size={40} className="mx-auto text-red-600" />
            )}

            <p className="mt-4 font-semibold">
              {loggingOut ? "Logging out..." : "Logout"}
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
