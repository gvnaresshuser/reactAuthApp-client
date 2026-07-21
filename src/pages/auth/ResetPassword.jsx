import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { KeyRound, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { resetPasswordApi } from "../../api/authApi";

function ResetPassword() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { token } = useParams();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const response = await resetPasswordApi({
        token,
        newPassword: data.newPassword,
      });

      toast.success(response.data.message);

      // Optional: smoother UX
      await new Promise((resolve) => setTimeout(resolve, 500));

      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-700 via-violet-700 to-purple-800 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-10">
        <div className="flex justify-center mb-6">
          <div className="h-16 w-16 rounded-full bg-indigo-600 flex items-center justify-center text-white">
            <KeyRound size={30} />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-center">Reset Password</h2>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Enter your new password.
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="New Password"
            type="password"
            placeholder="Enter new password"
            register={register("newPassword", {
              required: "Password is required",
            })}
            error={errors.newPassword}
          />

          <Input
            label="Confirm Password"
            type="password"
            placeholder="Confirm password"
            register={register("confirmPassword", {
              required: "Confirm Password is required",
              validate: (value) =>
                value === watch("newPassword") || "Passwords do not match",
            })}
            error={errors.confirmPassword}
          />

          <Button type="submit" fullWidth disabled={loading}>
            <div className="flex items-center justify-center gap-2">
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Updating Password...
                </>
              ) : (
                <>
                  <KeyRound size={18} />
                  Reset Password
                </>
              )}
            </div>
          </Button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
