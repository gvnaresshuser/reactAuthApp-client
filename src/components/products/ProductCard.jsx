import { Link } from "react-router-dom";
import {
  Edit,
  Trash2,
  Package,
  IndianRupee,
  Tag,
  User,
  Calendar,
} from "lucide-react";
const ProductCard = ({ product, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 overflow-hidden">
      {/* Product Image */}
      <div className="h-48 bg-gray-100">
        <img
          src={
            product.image_url || "https://placehold.co/600x400?text=No+Image"
          }
          alt={product.name}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Product Details */}
      <div className="p-5">
        <h2 className="text-xl font-bold text-gray-800 mb-4">{product.name}</h2>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <IndianRupee size={18} className="text-green-600" />
            <span className="font-semibold text-lg text-green-700">
              {Number(product.price).toLocaleString()}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Package size={18} className="text-blue-600" />
            <span>Stock : {product.stock}</span>
          </div>

          <div className="flex items-center gap-2">
            <Tag size={18} className="text-purple-600" />
            <span>{product.category}</span>
          </div>

          <div className="flex items-center gap-2">
            <User size={18} className="text-orange-600" />
            <span>{product.created_by_name}</span>
          </div>

          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-gray-500" />
            <span className="text-sm text-gray-600">
              {new Date(product.created_at).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
        </div>

        {/* Buttons */}

        <div className="flex gap-3 mt-6">
          <button
            onClick={() => onDelete(product.id)}
            className="flex-1 border-2 border-red-600 bg-transparent text-red-600 rounded-lg py-2 flex justify-center items-center gap-2 transition-all duration-300 hover:bg-red-600 hover:text-white hover:shadow-lg"
          >
            <Trash2 size={18} />
            Delete
          </button>
          <Link
            to={`/products/edit/${product.id}`}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 flex justify-center items-center gap-2 transition"
          >
            <Edit size={18} />
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
