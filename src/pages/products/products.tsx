import { Button, Modal, Table, type TableProps, Typography } from "antd";
import { useGetProducts } from "./service/query/useGetProducts";
import { useToggle } from "../../hooks/useToggle";
import { ProductForm } from "./components/product-form";

const { Title } = Typography;

interface dataSource {
  id: string;
  name?: string;
  price?: number;
  description?: string;
  count?: number;
  skidka?: number;
  createdAt?: string;
  img?: string;
  key?: string;
}

export const Products = () => {
  const { data } = useGetProducts();
  const { isOpen, open, close } = useToggle();

  const dataSource: dataSource[] = data?.map((product: dataSource) => ({
    id: product.id,
    name: product.name,
    price: product.price,
    description: product.description,
    count: product.count,
    skidka: product.skidka,
    createdAt: product.createdAt,
    img: product.img,
    key: product.id,
  }));

  const columns: TableProps<dataSource>["columns"] = [
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
      title: "Skidka",
      dataIndex: "skidka",
      key: "skidka",
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Action",
      render: () => {
        return (
          <div className="flex gap-2.5">
            <Button>Delete</Button>
            <Button>Edit</Button>
          </div>
        );
      },
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
      <Table<dataSource> dataSource={dataSource} columns={columns} />
    </div>
  );
};
