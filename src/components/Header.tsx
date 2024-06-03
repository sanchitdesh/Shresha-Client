import { signOut } from "firebase/auth";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  FaSearch,
  FaShoppingCart,
  FaSignInAlt,
  FaSignOutAlt,
  FaUser
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { RootState } from "../redux/store";
import { User } from "../types/types";

// const user = {
//   _id: "",
//   role: ""
// };

export interface propsType {
  user: User | null;
}

const Header = ({ user }: propsType) => {
  const { cartItems } = useSelector((state: RootState) => state.cartReducer);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const logoutHandler = async () => {
    try {
      await signOut(auth);
      toast.success("Logout Successful");
      setIsOpen(false);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <nav className="header">
      <Link onClick={() => setIsOpen(false)} to={"/"}>
        Home
      </Link>
      <Link onClick={() => setIsOpen(false)} to={"/search"}>
        <FaSearch />
      </Link>
      <Link onClick={() => setIsOpen(false)} to={"/cart"}>
        <FaShoppingCart />
        {cartItems.length > 0 && (
          <span className="cart-badge">{cartItems.length}</span>
        )}
      </Link>
      {user?._id ? (
        <>
          <button onClick={() => setIsOpen((prev) => !prev)}>
            <FaUser />
          </button>

          <dialog open={isOpen}>
            <div>
              {user.role === "admin" && (
                <Link onClick={() => setIsOpen(false)} to="/admin/dashboard">
                  Admin
                </Link>
              )}
              <Link onClick={() => setIsOpen(false)} to="/orders">
                Orders
              </Link>
              <button onClick={logoutHandler}>
                <FaSignOutAlt />
              </button>
            </div>
          </dialog>
        </>
      ) : (
        <Link to="/login">
          <FaSignInAlt />
        </Link>
      )}
    </nav>
  );
};

export default Header;
