import { LoaderCircle } from "lucide-react";

const Loader = ({ message = "Loading..." }) => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <div className="flex gap-2">
        <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce"></div>

        <div
          className="w-4 h-4 bg-blue-600 rounded-full animate-bounce"
          style={{ animationDelay: "0.15s" }}
        ></div>

        <div
          className="w-4 h-4 bg-blue-600 rounded-full animate-bounce"
          style={{ animationDelay: "0.3s" }}
        ></div>
      </div>

      <h2 className="mt-6 text-xl font-semibold">{message}</h2>

      <p className="text-gray-500 mt-2">Please wait...</p>
    </div>
  );
};

export default Loader;
