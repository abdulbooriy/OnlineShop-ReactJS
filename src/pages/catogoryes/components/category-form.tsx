import { useGetTypes } from "../service/query/useGetTypes";
import type { FormProps } from "antd";
import { Button, Form, Input, Select, Typography } from "antd";
import { useCreateCategory } from "../service/mutation/useCreateCategory";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useUpdateCategory } from "../service/mutation/useUpdateCategory";
import toast from "react-hot-toast";

const { Title } = Typography;

type FieldType = {
  name: string;
  type: string;
};

interface dataSource {
  name?: string;
  dataIndex?: string;
  type?: string;
  key?: string;
}

interface Props {
  closeModal: () => void;
  defaultValue?: dataSource;
}

export const CategoryForm = ({ closeModal, defaultValue }: Props) => {
  const { data } = useGetTypes();
  const [form] = Form.useForm();

  const { mutate, isPending } = useCreateCategory();
  const { mutate: editCategory, isPending: isPending2 } = useUpdateCategory();

  const clinet = useQueryClient();

  const onFinish: FormProps<FieldType>["onFinish"] = (data) => {
    if (defaultValue) {
      return editCategory(
        { name: data.name, id: defaultValue.key },
        {
          onSuccess: () => {
            clinet.invalidateQueries({ queryKey: ["categoryes"] });
            toast.success("Category is successfully updated !");
            closeModal();
          },

          onError: () => {
            toast.error("An error occured while updating the Category !");
          },
        }
      );
    }
    mutate(
      { name: data.name, typeId: data.type },
      {
        onSuccess: () => {
          clinet
            .invalidateQueries({ queryKey: ["categoryes"] })
            .then(() => toast.success("Category is successfully created !"));
          closeModal();
          form.resetFields();
        },
        onError: (error) => {
          form.setFields([{ name: "name", errors: [error.message] }]);
          toast.error("An error occured while creating a new Category !");
        },
      }
    );
  };

  React.useEffect(() => {
    if (defaultValue) {
      form.setFields([
        {
          name: "name",
          value: defaultValue.name,
        },
        {
          name: "type",
          value: defaultValue.type,
        },
      ]);
    }
  }, [defaultValue]);

  const typeList = data?.map((item) => ({
    value: item.id,
    label: <span>{item.name}</span>,
  }));

  return (
    <div>
      <Title level={4}>Create Categoryes</Title>
      <Form form={form} name="basic" layout="vertical" onFinish={onFinish}>
        <Form.Item<FieldType>
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input Category Name!" }]}>
          <Input placeholder="Enter Category Name" style={{ height: "40px" }} />
        </Form.Item>

        <Form.Item<FieldType>
          label="Type"
          name="type"
          rules={[{ required: true, message: "Please input your password!" }]}>
          <Select
            disabled={defaultValue ? true : false}
            placeholder="Type"
            options={typeList}
            style={{ height: "40px" }}
          />
        </Form.Item>

        <Button
          loading={isPending || isPending2}
          type="primary"
          htmlType="submit"
          style={{
            width: "100%",
            height: "40px",
            fontSize: "18px",
            fontFamily: "Inter",
          }}>
          {defaultValue ? "Update" : "Create"}
        </Button>
      </Form>
    </div>
  );
};
