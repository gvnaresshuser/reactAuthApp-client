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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white shadow-lg rounded-xl p-8 space-y-6"
    >
      {/* Name */}

      <div>
        <label className="font-medium">Product Name</label>

        <input
          {...register("name", {
            required: "Product Name is required",
          })}
          className="w-full mt-2 border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Description */}

      <div>
        <label className="font-medium">Description</label>

        <textarea
          rows="4"
          {...register("description")}
          className="w-full mt-2 border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* Price + Stock */}

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="font-medium">Price</label>

          <input
            type="number"
            step="0.01"
            {...register("price", {
              required: "Price is required",
            })}
            className="w-full mt-2 border rounded-lg p-3"
          />

          {errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
          )}
        </div>

        <div>
          <label className="font-medium">Stock</label>

          <input
            type="number"
            {...register("stock", {
              required: "Stock is required",
            })}
            className="w-full mt-2 border rounded-lg p-3"
          />

          {errors.stock && (
            <p className="text-red-500 text-sm mt-1">{errors.stock.message}</p>
          )}
        </div>
      </div>

      {/* Category */}

      <div>
        <label className="font-medium">Category</label>
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
          <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
        )}
      </div>

      {/* Image */}

      <div>
        <label className="font-medium">Image URL</label>

        <input
          {...register("image_url")}
          className="w-full mt-2 border rounded-lg p-3"
        />
      </div>

      {/* Image Preview */}

      {initialValues?.image_url && (
        <div>
          <img
            src={initialValues.image_url}
            alt="Preview"
            className="h-40 rounded-lg border object-cover"
          />
        </div>
      )}

      {/* Button */}

      <button
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg flex justify-center items-center gap-2 transition"
      >
        <Save size={20} />

        {loading ? "Please Wait..." : buttonText}
      </button>
    </form>
  );
};

export default ProductForm;
