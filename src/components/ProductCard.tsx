import { FaPlus } from "react-icons/fa";
import { CartItem } from "../types/types";

interface ProductsProps {
  productId: string;
  photo: string;
  name: string;
  price: number;
  stock: number;
  color: string;
  size: string;
  handler: (cartItem: CartItem) => string | undefined;
}

const ProductCard = ({
  productId,
  photo,
  name,
  price,
  color,
  stock,
  size,
  handler
}: ProductsProps) => {
  return (
    <div className="product-card">
      <img
        src={`${import.meta.env.VITE_SERVER}/${photo}`}
        alt={`Image of ${name}`}
        className="product-photo"
      />
      <p>{name}</p>
      <div className="product-color">
        <span className="color-box" style={{ backgroundColor: color }}></span>
        {/* Uncomment if you want to display the color data */}
        {/* <p className="color-data">{color.toUpperCase()}</p> */}
      </div>
      <span>₹{price}</span>
      <span>Size: {size}</span>
      <div>
        <button
          onClick={() =>
            handler({
              productId,
              price,
              name,
              color,
              photo,
              stock,
              quantity: 1,
              size
            })
          }
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
