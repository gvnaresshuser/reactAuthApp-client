import { useEffect } from "react";
import {
  LogIn,
  ShieldCheck,
  Database,
  LayoutDashboard,
  Loader2,
} from "lucide-react";
import { useState } from "react";

import { useForm } from "react-hook-form";
import Button from "../../components/common/Button";
import PasswordInput from "../../components/common/PasswordInput";
import Input from "../../components/common/Input";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { loginApi } from "../../api/authApi";
import useAuth from "../../hooks/useAuth";
console.log("Login Component Loaded");
function Login() {
  console.log("Login Render");
  const [loading, setLoading] = useState(false);
  console.log("Component Render:", loading);
  const { login } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberEmail");

    if (rememberedEmail) {
      setValue("email", rememberedEmail);
      setValue("rememberMe", true);
    }
  }, [setValue]);

  const onSubmit = async (data) => {
    setLoading(true);

    if (data.rememberMe) {
      localStorage.setItem("rememberEmail", data.email);
    } else {
      localStorage.removeItem("rememberEmail");
    }

    // Give React a chance to render the loading state
    await new Promise((resolve) => setTimeout(resolve, 0));

    try {
      const response = await loginApi(data);

      const { user, accessToken } = response.data.data;

      login(user, accessToken);

      toast.success(response.data.message);

      navigate("/dashboard", { replace: true });
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-700 via-violet-700 to-purple-800">
      <div className="container mx-auto min-h-screen flex flex-col lg:flex-row items-center justify-center px-4 sm:px-6 py-8">
        {/* Left Section */}
        <div className="hidden lg:flex lg:w-1/2 px-10 xl:px-36 text-white">
          <div>
            <h1 className="text-6xl font-extrabold leading-tight">
              Login
            </h1>
            <p>
              <h4 className="text-3xl font-extrabold leading-tight">
                <span style={{ color: "lime" }}>Access Token</span> /{" "}
                <span style={{ color: "orange" }}>Refresh Token</span>
              </h4>
            </p>

            <p className="text-xl text-indigo-100 mt-6 leading-8">
              Build modern React applications with Express.js, PostgreSQL and
              JWT Authentication.
            </p>

            <div className="mt-12 space-y-6">
              <div className="flex items-center gap-4">
                <ShieldCheck size={28} />
                <span className="text-lg">JWT Authentication</span>
              </div>

              <div className="flex items-center gap-4">
                <Database size={28} />
                <span className="text-lg">Product CRUD</span>
              </div>

              <div className="flex items-center gap-4">
                <LayoutDashboard size={28} />
                <span className="text-lg">Responsive Dashboard</span>
              </div>
            </div>
          </div>
        </div>

        {/* Login Card */}

        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="w-full max-w-md rounded-3xl bg-white shadow-2xl p-6 sm:p-8 lg:p-10">
            <div className="flex justify-center mb-6">
              <div className="h-16 w-16 rounded-full bg-indigo-600 flex items-center justify-center text-white text-3xl">
                🚀
              </div>
            </div>

            <h2 className="text-4xl font-bold text-center text-gray-800">
              Welcome Back
            </h2>

            <p className="text-center text-gray-500 mt-2 mb-8">
              Sign in to continue
            </p>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                label="Email Address"
                type="email"
                placeholder="Enter your email"
                register={register("email", {
                  required: "Email is required",
                })}
                error={errors.email}
              />

              <PasswordInput
                label="Password"
                placeholder="Enter your password"
                register={register("password", {
                  required: "Password is required",
                })}
                error={errors.password}
              />

              <div className="flex items-center justify-between mb-6">
                <label className="flex items-center gap-2 text-sm text-gray-600">
                  <input type="checkbox" {...register("rememberMe")} />
                  Remember Me
                </label>

                <Link
                  to="/forgot-password"
                  className="text-sm text-indigo-600 font-medium hover:text-indigo-800 hover:underline transition-colors duration-200"
                >
                  Forgot Password?
                </Link>
              </div>
              <p className="text-center mb-2">
                {loading ? "Loading..." : "Ready"}
              </p>

              <Button type="submit" fullWidth disabled={loading}>
                <div className="flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Logging In...
                    </>
                  ) : (
                    <>
                      <LogIn size={18} />
                      Login
                    </>
                  )}
                </div>
              </Button>
            </form>

            <p className="text-center text-gray-600 mt-8">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-indigo-600 font-semibold hover:underline"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
