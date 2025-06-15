import { Button, Modal, Table, type TableProps, Typography } from "antd";
import { useGetProducts } from "./service/query/useGetProducts";
import { useToggle } from "../../hooks/useToggle";
import { ProductForm } from "./components/product-form";
import type { Product } from "./types";

const { Title } = Typography;

export const Products = () => {
  const { data } = useGetProducts();
  const { isOpen, open, close } = useToggle();

  const dataSource: Product[] = data?.map((product: Product) => ({
    id: product.id,
    name: product.name,
    price: product.price,
    img: product.img,
    description: product.description,
    count: product.count,
    skidka: product.skidka,
    categoryId: product.categoryId,
    userId: product.userId,
    createdAt: product.createdAt.slice(0, 10),
    user: product.user,
    colors: product.colors,
    category: product.category,
    likes: product.likes,
    comments: product.comments,
    totalLikes: product.totalLikes,
    discountedPrice: product.discountedPrice,
    avgStars: product.avgStars,
    key: product.id,
  }));

  const columns: TableProps<Product>["columns"] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `$${price}`,
    },
    {
      title: "Skidka",
      dataIndex: "skidka",
      key: "skidka",
      render: (skidka) => `${skidka}%`,
    },
    {
      title: "Discounted Price",
      dataIndex: "discountedPrice",
      key: "discountedPrice",
      render: (price) => `$${price}`,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Count",
      dataIndex: "count",
      key: "count",
    },
    {
      title: "Category",
      dataIndex: ["category", "name"],
      key: "category",
    },
    {
      title: "Colors",
      dataIndex: "colors",
      key: "colors",
      render: (colors) =>
        colors.map((c: { name: string }) => c.name).join(", "),
    },
    {
      title: "User",
      key: "user",
      render: (_, record) => `${record.user.firstname} ${record.user.lastname}`,
    },
    {
      title: "Likes",
      dataIndex: "totalLikes",
      key: "totalLikes",
    },
    {
      title: "Stars",
      dataIndex: "avgStars",
      key: "avgStars",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <div className="flex gap-2.5">
          <Button danger>Delete</Button>
          <Button type="primary">Edit</Button>
        </div>
      ),
    },
  ];
  return (
    <div>
      <div className="flex justify-between pb-5">
        <Title level={3}>Product Management</Title>
        <Button
          onClick={open}
          style={{
            height: "40px",
            fontSize: "18px",
            fontWeight: "500",
          }}
          type="primary">
          Add Products
        </Button>
      </div>
      <Modal footer={false} onCancel={close} open={isOpen}>
        <ProductForm />
      </Modal>
      <Table<Product> dataSource={dataSource} columns={columns} />
    </div>
  );
};
