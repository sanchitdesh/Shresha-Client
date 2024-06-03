import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";
import { Skeleton } from "../../components/Loader";
import { useAllProductsQuery } from "../../redux/api/productAPI";
import { CustomError } from "../../types/api-types";
import { RootState } from "../../redux/Store";

interface DataType {
  photo: ReactElement;
  name: string;
  price: number;
  stock: number;
  category: string;
  color: string;
  size: string;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Photo",
    accessor: "photo"
  },
  {
    Header: "Name",
    accessor: "name"
  },
  {
    Header: "Price",
    accessor: "price"
  },
  {
    Header: "Size",
    accessor: "size"
  },
  {
    Header: "Stock",
    accessor: "stock"
  },
  {
    Header: "Category",
    accessor: "category"
  },
  {
    Header: "Color",
    accessor: "color"
  },
  {
    Header: "Action",
    accessor: "action"
  }
];

const Products = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const { isLoading, isError, error, data } = useAllProductsQuery(user?._id);

  const [rows, setRows] = useState<DataType[]>([]);

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }
  useEffect(() => {
    if (data)
      setRows(
        data.products.map((i) => ({
          photo: <img src={`${import.meta.env.VITE_SERVER}/${i.photo}`} />,
          name: i.name,
          price: i.price,
          category: i.category,
          color: i.color,
          size: i.size,
          stock: i.stock,
          action: <Link to={`/admin/product/${i._id}`}>Manage</Link>
        }))
      );
  }, [data]);

  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    "Products",
    rows.length > 6
  )();

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{isLoading ? <Skeleton length={20} /> : Table}</main>
      <Link to="/admin/product/new" className="create-product-btn">
        <FaPlus />
      </Link>
    </div>
  );
};

export default Products;
