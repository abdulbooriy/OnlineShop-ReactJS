import { Button, Table, type TableProps } from "antd";
import { useGetProducts } from "./service/query/useGetProducts";

interface dataSource {
  name?: string;
  price?: number;
  description?: string;
  count?: number;
  skidka?: number;
  categoryId?: string;
  userId?: string;
  createdAt?: string;
  img?: string;
  key?: string;
}

export const Products = () => {
  const { data } = useGetProducts();

  console.log(data);

  const dataSource = data?.map(() => ({
    name: 0,
  }));

  const columns: TableProps<dataSource>["columns"] = [
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
      title: "UserId",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "CategoryId",
      dataIndex: "categoryId",
      key: "categoryId",
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
          <div>
            <Button>Delete</Button>
            <Button>Edit</Button>
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <Table<dataSource> dataSource={dataSource} columns={columns} />
    </div>
  );
};
