import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CartItem as CartItemType } from "../types/types"; // Renaming the imported type to CartItemType

type CartItemProps = {
  cartItem: CartItemType;
  incrementHandler: (cartItem: CartItemType) => void;
  decrementHandler: (cartItem: CartItemType) => void;
  removeHandler: (id: string) => void;
};

const CartItem = ({
  cartItem,
  incrementHandler,
  decrementHandler,
  removeHandler
}: CartItemProps) => {
  const { photo, productId, name, color, price, size, quantity } = cartItem;

  return (
    <div className="cart-item">
      <img src={`${import.meta.env.VITE_SERVER}/${photo}`} alt={name} />
      <article>
        <Link to={`/product/${productId}`}>{name}</Link>
        <span>{color}</span>
        <span>{size}</span>
        <span> ₹{price}</span>
      </article>
      <div>
        <button onClick={() => decrementHandler(cartItem)}>-</button>
        <p>{quantity}</p>
        <button onClick={() => incrementHandler(cartItem)}>+</button>
      </div>

      <button onClick={() => removeHandler(productId)}>
        <FaTrash />
      </button>
    </div>
  );
};

export default CartItem;
