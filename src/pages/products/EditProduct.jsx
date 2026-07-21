import { useParams } from "react-router-dom";

function EditProduct() {
  const { id } = useParams();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Edit Product #{id}</h1>
    </div>
  );
}

export default EditProduct;
