import {useState} from 'react';
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  Mail,
  ShieldCheck,
  LogOut,
  Package,
  Loader2,
} from "lucide-react";
import Button from "../../components/common/Button";
import { logoutApi, profileApi } from "../../api/authApi";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
function Dashboard() {
  const [profile, setProfile] = useState(null);
const [loggingOut, setLoggingOut] = useState(false);
const navigate = useNavigate();
const { user, logout } = useAuth();

const handleProfile = async () => {
  try {
    const response = await profileApi();

    setProfile(response.data.data);

    toast.success("Profile loaded successfully");
  } catch (error) {
    console.error(error);
  }
};

const handleLogout = async () => {
  setLoggingOut(true);

  try {
    await logoutApi();

    logout();

    toast.success("Logged out successfully");

    // Optional: smoother UX
    await new Promise((resolve) => setTimeout(resolve, 500));

    navigate("/login", { replace: true });
  } catch (error) {
    toast.error("Logout failed");
  } finally {
    setLoggingOut(false);
  }
};

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Navbar */}

      <header className="bg-indigo-700 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4">
          <div className="flex items-center gap-3 text-white">
            <LayoutDashboard size={28} />
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          </div>

          <Button onClick={handleLogout} disabled={loggingOut}>
            <div className="flex items-center gap-2">
              {loggingOut ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Logging Out...
                </>
              ) : (
                <>
                  <LogOut size={18} />
                  Logout
                </>
              )}
            </div>
          </Button>
        </div>
      </header>

      {/* Content */}

      <div className="max-w-7xl mx-auto p-10">
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-3xl font-bold mb-8">Welcome, {user.fullName}</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="border rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <User className="text-indigo-600" />
                <h3 className="font-bold text-lg">User Information</h3>
              </div>

              <p>
                <strong>Name:</strong> {user.fullName}
              </p>

              <p className="mt-2">
                <strong>Email:</strong> {user.email}
              </p>
            </div>

            <div className="border rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="text-green-600" />
                <h3 className="font-bold text-lg">Authentication</h3>
              </div>

              <p>JWT Authentication Enabled</p>

              <p className="mt-2">Refresh Token Enabled</p>
            </div>

            <div className="border rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Mail className="text-blue-600" />
                <h3 className="font-bold text-lg">Email Verification</h3>
              </div>

              <p>Password Reset Enabled</p>
            </div>

            <div className="border rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Package className="text-orange-500" />
                <h3 className="font-bold text-lg">Product Module</h3>
              </div>

              <p>Coming Next...</p>
            </div>
            <div className="border border-indigo-100 rounded-2xl p-6 bg-gradient-to-br from-indigo-50 to-white shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
                  <User className="text-indigo-600" size={24} />
                </div>

                <div>
                  <h3 className="font-bold text-lg text-slate-800">
                    Profile Module
                  </h3>

                  <p className="text-sm text-slate-500">
                    Test Access Token Refresh
                  </p>
                </div>
              </div>

              <p className="text-slate-600 mb-5 leading-6">
                Click the button after your Access Token expires to verify that
                the application automatically refreshes your session.
              </p>

              <Button onClick={handleProfile} fullWidth>
                <div className="flex items-center justify-center gap-2">
                  <User size={18} />
                  Get Profile
                </div>
              </Button>
              {profile && (
                <div className="mt-5 rounded-xl border border-indigo-200 bg-indigo-50 p-4">
                  <h4 className="text-lg font-semibold text-indigo-700 mb-3">
                    User Profile
                  </h4>

                  <div className="space-y-2 text-sm text-slate-700">
                    <p>
                      <strong>Name:</strong> {profile.full_name}
                    </p>

                    <p>
                      <strong>Email:</strong> {profile.email}
                    </p>

                    <p>
                      <strong>Role:</strong> {profile.role}
                    </p>

                    <p>
                      <strong>Status:</strong>{" "}
                      <span
                        className={`font-semibold ${
                          profile.is_active ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {profile.is_active ? "Active" : "Inactive"}
                      </span>
                    </p>

                    <p>
                      <strong>Created:</strong>{" "}
                      {new Date(profile.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
