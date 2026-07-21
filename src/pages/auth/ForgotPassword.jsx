import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Mail, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { forgotPasswordApi } from "../../api/authApi";

function ForgotPassword() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const response = await forgotPasswordApi(data);

      toast.success(response.data.message);

      // Optional: smoother UX
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-700 via-violet-700 to-purple-800 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-10">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center text-white">
            <Mail size={28} />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-center">Forgot Password</h2>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Enter your registered email address.
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

          <Button type="submit" fullWidth disabled={loading}>
            <div className="flex items-center justify-center gap-2">
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Sending Reset Link...
                </>
              ) : (
                <>
                  <Mail size={18} />
                  Send Reset Link
                </>
              )}
            </div>
          </Button>
        </form>

        <p className="text-center mt-8">
          <Link to="/login" className="text-indigo-600 hover:underline">
            ← Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
