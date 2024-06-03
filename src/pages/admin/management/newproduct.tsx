import { ChangeEvent, FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { useNewProductMutation } from "../../../redux/api/productAPI";
import { RootState } from "../../../redux/Store";
import { responseToast } from "../../../utils/features";

const NewProduct = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [price, setPrice] = useState<string>("1000"); // Convert to string
  const [stock, setStock] = useState<string>("1"); // Convert to string
  const [size, setSize] = useState<string>("1"); // Convert to string
  const [photoPrev, setPhotoPrev] = useState<string>("");
  const [photo, setPhoto] = useState<File>();

  const [newProduct] = useNewProductMutation();
  const navigate = useNavigate();

  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];

    const reader: FileReader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPhotoPrev(reader.result);
          setPhoto(file);
        }
      };
    }
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !name ||
      !description ||
      !color ||
      !price ||
      !size ||
      isNaN(parseInt(stock)) || // Ensure stock is a valid number
      parseInt(stock) < 0 || // Ensure stock is not negative
      !category ||
      !photo
    )
      return;

    const formData = new FormData();

    formData.set("name", name);
    formData.set("description", description);
    formData.set("color", color);
    formData.set("price", price); // Already a string
    formData.set("stock", stock); // Already a string
    formData.set("photo", photo);
    formData.set("size", size); // Already a string
    formData.set("category", category);

    const res = await newProduct({ id: user?._id!, formData });

    responseToast(res, navigate, "/admin/product");
  };

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        <article>
          <form onSubmit={submitHandler}>
            <h2>New Product</h2>
            <div>
              <label>Name</label>
              <input
                required
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label>Description</label>
              <input
                required
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <label>Color</label>
              <input
                required
                type="text"
                placeholder="Color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
            <div>
              <label>Price</label>
              <input
                required
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <label>Size</label>
              <select
                required
                value={size}
                onChange={(e) => setSize(e.target.value)}
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
              <label>Stock</label>
              <input
                required
                type="number"
                placeholder="Stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div>
              <label>Category</label>
              <input
                required
                type="text"
                placeholder="eg. laptop, camera etc"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>

            <div>
              <label>Photo</label>
              <input required type="file" onChange={changeImageHandler} />
            </div>

            {photoPrev && <img src={photoPrev} alt="New Image" />}
            <button type="submit">Create</button>
          </form>
        </article>
      </main>
    </div>
  );
};

export default NewProduct;
