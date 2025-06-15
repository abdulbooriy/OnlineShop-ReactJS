import { Button, Modal, Table, type TableProps, Typography } from "antd";
import { useGetCategoryes } from "./service/query/useGetCategoryes";
import { useToggle } from "../../hooks/useToggle";
import { CategoryForm } from "./components/category-form";
import React from "react";
import { useDeleteCategory } from "./service/mutation/useDeleteCategory";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const { Title } = Typography;

interface dataSource {
  id?: string;
  title?: string;
  dataIndex?: string;
  type?: string;
  key?: string;
}

export const Categoryes = () => {
  const { data } = useGetCategoryes();
  const { isOpen, open, close } = useToggle();
  const { isOpen: isOpen2, open: open2, close: close2 } = useToggle();

  const [initialData, setInitialData] = React.useState<
    dataSource | undefined
  >();

  const dataSource = data?.data.map((item) => ({
    createdAt: item.createdAt.slice(0, 10),
    name: item.name,
    type: item.type.name,
    key: item.id,
    id: item.id,
  }));

  const editContent = (el: dataSource) => {
    setInitialData(el);
    open2();
  };

  const { mutate } = useDeleteCategory();
  const client = useQueryClient();

  const deleteItems = (id: string) => {
    mutate(id, {
      onSuccess: () => {
        client
          .invalidateQueries({ queryKey: ["categoryes"] })
          .then(() => toast.success("Category is successfully deleted !"));
      },
      onError: () => {
        toast.error("An error occured while deleting the Category !");
      },
    });
  };

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
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      key: "createdAt",
    },

    {
      title: "Action",
      render: (data: dataSource) => {
        return (
          <div className="flex gap-2.5">
            <Button danger onClick={() => deleteItems(data.key as string)}>
              Delete
            </Button>
            <Button type="primary" onClick={() => editContent(data)}>Edit</Button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <div className="flex justify-between pb-5">
        <Title style={{ fontFamily: "Inter" }} level={3}>
          Categoryes Management
        </Title>
        <Button
          style={{
            height: "40px",
            fontSize: "18px",
            fontWeight: "500",
            fontFamily: "Inter",
          }}
          onClick={open}
          type="primary">
          Add Categoryes
        </Button>
      </div>
      <Modal footer={false} onCancel={close} open={isOpen}>
        <CategoryForm closeModal={close} />
      </Modal>
      <Modal footer={false} onCancel={close2} open={isOpen2}>
        <CategoryForm defaultValue={initialData} closeModal={close2} />
      </Modal>
      <Table<dataSource> dataSource={dataSource} columns={columns} />
    </div>
  );
};
