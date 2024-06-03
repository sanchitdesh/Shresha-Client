import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { Skeleton } from "../../../components/Loader";
import {
  useDeleteProductMutation,
  useProductDetailsQuery,
  useUpdateProductMutation
} from "../../../redux/api/productAPI";
import { RootState } from "../../../redux/Store";
import { responseToast } from "../../../utils/features";

const Productmanagement = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const params = useParams<{ id: string }>(); // Ensure params.id is not undefined
  const navigate = useNavigate();

  const { data, isLoading, isError } = useProductDetailsQuery(params.id || "");

  const {
    price = 0,
    photo = "",
    name = "",
    stock = 0,
    size = "",
    category = "",
    color = "",
    description = ""
  } = data?.product || {};

  // Ensure non-nullable values
  const [priceUpdate, setPriceUpdate] = useState<number>(price || 0);
  const [stockUpdate, setStockUpdate] = useState<number>(stock || 0);
  const [nameUpdate, setNameUpdate] = useState<string>(name || "");
  const [colorUpdate, setColorUpdate] = useState<string>(color || "");
  const [sizeUpdate, setSizeUpdate] = useState<string>(size || "");
  const [descriptionUpdate, setDescriptionUpdate] = useState<string>(
    description || ""
  );
  const [categoryUpdate, setCategoryUpdate] = useState<string>(category || "");
  const [photoUpdate, setPhotoUpdate] = useState<string>(photo || "");
  const [photoFile, setPhotoFile] = useState<File>();

  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];

    const reader: FileReader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPhotoUpdate(reader.result);
          setPhotoFile(file);
        }
      };
    }
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    if (nameUpdate) formData.set("name", nameUpdate);
    if (sizeUpdate) formData.set("size", sizeUpdate);
    if (colorUpdate) formData.set("color", colorUpdate);
    if (descriptionUpdate) formData.set("description", descriptionUpdate);
    if (priceUpdate !== undefined)
      formData.set("price", priceUpdate.toString());
    if (stockUpdate !== undefined)
      formData.set("stock", stockUpdate.toString());
    if (photoFile) formData.set("photo", photoFile);
    if (categoryUpdate) formData.set("category", categoryUpdate);

    const res = await updateProduct({
      formData,
      userId: user?._id!,
      productId: data?.product?._id || ""
    });

    responseToast(res, navigate, "/admin/product");
  };

  const deleteHandler = async () => {
    const res = await deleteProduct({
      userId: user?._id!,
      productId: data?.product?._id || ""
    });

    responseToast(res, navigate, "/admin/product");
  };

  useEffect(() => {
    if (data?.product) {
      setNameUpdate(data.product.name || "");
      setSizeUpdate(data.product.size || "");
      setColorUpdate(data.product.color || "");
      setDescriptionUpdate(data.product.description || "");
      setPriceUpdate(data.product.price || 0);
      setStockUpdate(data.product.stock || 0);
      setCategoryUpdate(data.product.category || "");
      setPhotoUpdate(data.product.photo || "");
    }
  }, [data]);

  if (isError) return <Navigate to={"/404"} />;

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        {isLoading ? (
          <Skeleton length={20} />
        ) : (
          <>
            <section>
              <strong>ID - {data?.product?._id}</strong>
              <img
                src={`${import.meta.env.VITE_SERVER}/${photo}`}
                alt="Product"
              />
              <p>{name}</p>
              {stock > 0 ? (
                <span className="green">{stock} Available</span>
              ) : (
                <span className="red"> Not Available</span>
              )}
              <h3>₹{price}</h3>
            </section>
            <article>
              <button className="product-delete-btn" onClick={deleteHandler}>
                <FaTrash />
              </button>
              <form onSubmit={submitHandler}>
                <h2>Manage</h2>
                <div>
                  <label>Name</label>
                  <input
                    type="text"
                    placeholder="Name"
                    value={nameUpdate}
                    onChange={(e) => setNameUpdate(e.target.value)}
                  />
                </div>

                <div>
                  <label>Size</label>
                  <select
                    required
                    value={size}
                    onChange={(e) => setSizeUpdate(e.target.value)}
                    className="size"
                  >
                    <option value="" disabled>
                      Select size
                    </option>
                    <option value="s">S</option>
                    <option value="m">M</option>
                    <option value="l">L</option>
                    <option value="xl">XL</option>
                  </select>
                </div>

                <div>
                  <label>Description</label>
                  <input
                    type="text"
                    placeholder="Description"
                    value={descriptionUpdate}
                    onChange={(e) => setDescriptionUpdate(e.target.value)}
                  />
                </div>

                <div>
                  <label>Color</label>
                  <input
                    type="text"
                    placeholder="Color"
                    value={colorUpdate}
                    onChange={(e) => setColorUpdate(e.target.value)}
                  />
                </div>
                <div>
                  <label>Price</label>
                  <input
                    type="number"
                    placeholder="Price"
                    value={priceUpdate}
                    onChange={(e) => setPriceUpdate(Number(e.target.value))}
                  />
                </div>
                <div>
                  <label>Stock</label>
                  <input
                    type="number"
                    placeholder="Stock"
                    value={stockUpdate}
                    onChange={(e) => setStockUpdate(Number(e.target.value))}
                  />
                </div>

                <div>
                  <label>Category</label>
                  <input
                    type="text"
                    placeholder="eg. laptop, camera etc"
                    value={categoryUpdate}
                    onChange={(e) => setCategoryUpdate(e.target.value)}
                  />
                </div>

                <div>
                  <label>Photo</label>
                  <input type="file" onChange={changeImageHandler} />
                </div>

                {photoUpdate && <img src={photoUpdate} alt="New Image" />}
                <button type="submit">Update</button>
              </form>
            </article>
          </>
        )}
      </main>
    </div>
  );
};

export default Productmanagement;
