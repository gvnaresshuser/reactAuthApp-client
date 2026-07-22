import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Save } from "lucide-react";

const ProductForm = ({
  initialValues,
  onSubmit,
  loading = false,
  buttonText = "Save Product",
}) => {
const {
  register,
  handleSubmit,
  reset,
  formState: { errors },
} = useForm({
  defaultValues: {
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    image_url: "",
  },
});

useEffect(() => {
  if (initialValues && initialValues.id) {
    reset({
      name: initialValues.name || "",
      description: initialValues.description || "",
      price: initialValues.price || "",
      stock: initialValues.stock || "",
      category: initialValues.category || "",
      image_url: initialValues.image_url || "",
    });
  }
}, [initialValues, reset]);

  const categories = [
    "Electronics",
    "Furniture",
    "Books",
    "Clothing",
    "Sports",
    "Groceries",
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 w-full">
      {/* Name */}

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Product Name
        </label>

        <input
          placeholder="Enter product name"
          {...register("name", {
            required: "Product Name is required",
          })}
          className="w-full mt-2 border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        {errors.name && (
          <p className="mt-2 text-sm font-medium text-red-500">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Description */}

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Description
        </label>

        <textarea
          placeholder="Describe your product..."
          rows={6}
          {...register("description")}
          className="
          w-full
          mt-2
          min-h-[170px]
          resize-none
          rounded-xl
          border
          border-gray-300
          px-4
          py-3
          focus:border-blue-500
          focus:ring-4
          focus:ring-blue-100
          outline-none
          transition-all
          "
        />
      </div>

      {/* Price + Stock */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Price
          </label>

          <input
            placeholder="0.00"
            type="number"
            step="0.01"
            {...register("price", {
              required: "Price is required",
            })}
            className="
            w-full
            mt-2
            h-12
            rounded-xl
            border border-gray-300
            bg-white
            px-4
            text-gray-700
            placeholder:text-gray-400
            transition-all
            duration-200
            focus:border-blue-500
            focus:ring-4
            focus:ring-blue-100
            focus:outline-none
            "
          />

          {errors.price && (
            <p className="mt-2 text-sm font-medium text-red-500">
              {errors.price.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Stock
          </label>

          <input
            placeholder="Available stock"
            type="number"
            {...register("stock", {
              required: "Stock is required",
            })}
            className="
            w-full
            mt-2
            h-12
            rounded-xl
            border border-gray-300
            bg-white
            px-4
            text-gray-700
            placeholder:text-gray-400
            transition-all
            duration-200
            focus:border-blue-500
            focus:ring-4
            focus:ring-blue-100
            focus:outline-none
            "
          />

          {errors.stock && (
            <p className="mt-2 text-sm font-medium text-red-500">
              {errors.stock.message}
            </p>
          )}
        </div>
      </div>

      {/* Category */}

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Category
        </label>
        <select
          {...register("category", {
            required: "Category is required",
          })}
          className="w-full mt-2 border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="">Select Category</option>

          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        {errors.category && (
          <p className="mt-2 text-sm font-medium text-red-500">
            {errors.category.message}
          </p>
        )}
      </div>

      {/* Image */}

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Image URL
        </label>

        <input
          {...register("image_url")}
          className="
          w-full
          mt-2
          h-12
          rounded-xl
          border border-gray-300
          bg-white
          px-4
          text-gray-700
          placeholder:text-gray-400
          transition-all
          duration-200
          focus:border-blue-500
          focus:ring-4
          focus:ring-blue-100
          focus:outline-none
          "
        />
      </div>

      {/* Image Preview */}

      {initialValues?.image_url && (
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-3">
          <img
            src={initialValues.image_url}
            alt="Preview"
            className="w-full max-w-sm rounded-lg object-cover shadow"
          />
        </div>
      )}

      {/* Button */}

      <button
        disabled={loading}
        className="
    w-full
    h-12
    rounded-xl
    bg-gradient-to-r
    from-blue-600
    to-indigo-600
    text-white
    font-semibold
    shadow-lg
    hover:shadow-xl
    hover:scale-[1.01]
    transition-all
    duration-300
    disabled:opacity-60
    disabled:cursor-not-allowed
    flex
    items-center
    justify-center
    gap-2
    "
      >
        <Save size={20} />

        {loading ? "Please Wait..." : buttonText}
      </button>
    </form>
  );
};

export default ProductForm;
