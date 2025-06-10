import { Button, Table, type TableProps, Typography } from "antd";
import { useGetColors } from "./service/query/useGetColors";
import { useToggle } from "../../hooks/useToggle";

import "./style.css";

const { Title } = Typography;

interface dataSource {
  name?: string;
  dataIndex?: string;
  key?: string;
}

export const Colors = () => {
  const { data } = useGetColors();
  const { isOpen, open, close } = useToggle();

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
      <div className="color__container__wrapper">
        <Title level={3}>Color Management</Title>
        <Button
          style={{
            height: "40px",
            fontSize: "18px",
            fontWeight: "500",
          }}
          onClick={open}
          type="primary">
          Create Colors
        </Button>
      </div>
      <Table<dataSource> dataSource={dataSource} columns={columns} />
    </div>
  );
};
