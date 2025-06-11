import { Button, Table, type TableProps, Typography } from "antd";
import { useGetColors } from "./service/query/useGetColors";

const { Title } = Typography;

interface dataSource {
  name?: string;
  dataIndex?: string;
  key?: string;
}

export const Colors = () => {
  const { data } = useGetColors();

  const dataSource = data?.data.map((color) => ({
    createdAt: color.createdAt.slice(0, 10),
    name: color.name,
    id: color.id,
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
        <Title level={3}>Color Management</Title>
        <Button
          style={{
            height: "40px",
            fontSize: "18px",
            fontWeight: "500",
          }}
          type="primary">
          Add Colors
        </Button>
      </div>
      <Table<dataSource> dataSource={dataSource} columns={columns} />
    </div>
  );
};
