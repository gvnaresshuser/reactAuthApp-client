import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import {  
  ShieldCheck,
  Database,
  LayoutDashboard,
  Loader2,
  UserPlus,
} from "lucide-react";

import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import PasswordInput from "../../components/common/PasswordInput";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { registerApi } from "../../api/authApi";
function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const payload = {
        fullName: data.name,
        email: data.email,
        password: data.password,
      };

      const response = await registerApi(payload);

      toast.success(response.data.message);

      // Optional: smoother UX
      await new Promise((resolve) => setTimeout(resolve, 500));

      navigate("/login");
    } catch (error) {
      const response = error.response?.data;

      if (response?.errors?.length) {
        response.errors.forEach((err) => {
          toast.error(err.msg);
        });
        return;
      }

      toast.error(response?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-700 via-violet-700 to-purple-800">
      <div className="container mx-auto min-h-screen flex items-center justify-center px-6 py-10">
        {/* Left Section */}
        <div className="hidden lg:flex w-1/2 text-white pr-16">
          <div>
            <h1 className="text-6xl font-extrabold leading-tight">
              Auth Admin
            </h1>

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

        {/* Register Card */}

        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-10">
            <div className="text-center mb-8">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-600 text-white text-2xl font-bold">
                RA
              </div>

              <h1 className="text-3xl font-bold text-slate-800">
                Create Account
              </h1>

              <p className="mt-2 text-slate-500">Register to continue</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                label="Full Name"
                placeholder="Enter your name"
                register={register("name", {
                  required: "Name is required",
                })}
                error={errors.name}
              />

              <Input
                label="Email"
                type="email"
                placeholder="Enter your email"
                register={register("email", {
                  required: "Email is required",
                })}
                error={errors.email}
              />

              <PasswordInput
                label="Password"
                placeholder="Enter password"
                register={register("password", {
                  required: "Password is required",
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "Password must be at least 8 characters and include uppercase, lowercase, number and special character.",
                  },
                })}
                error={errors.password}
              />

              <PasswordInput
                label="Confirm Password"
                placeholder="Confirm password"
                register={register("confirmPassword", {
                  required: "Confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                error={errors.confirmPassword}
              />

              <Button type="submit" fullWidth disabled={loading}>
                <div className="flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <UserPlus size={18} />
                      Create Account
                    </>
                  )}
                </div>
              </Button>
            </form>

            <p className="text-center mt-8 text-slate-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-indigo-600 font-semibold hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
