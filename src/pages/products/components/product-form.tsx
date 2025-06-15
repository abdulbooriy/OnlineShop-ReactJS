import { Button, Form, Input, Typography, type FormProps, Select } from "antd";
import { useCreateProducts } from "../service/mutation/useCreateProducts";
import { useQueryClient } from "@tanstack/react-query";
import { useGetCategoryes } from "../../catogoryes/service/query/useGetCategoryes";
import { useGetColors } from "../../colors/service/query/useGetColors";
import { useGetUsers } from "../../users/service/query/useGetUsers";

const { Title } = Typography;
const { Option } = Select;

export type FieldType = {
  name: string;
  price: number;
  img: string;
  description: string;
  count: number;
  skidka: number;
  categoryId: string;
  userId: string;
  discountedPrice: number;
  avgStars: string;
  totalLikes: number;
  colors: string[];
};

export const ProductForm = () => {
  const { mutate, isPending } = useCreateProducts();
  const { data: categoryes } = useGetCategoryes();
  const { data: colors } = useGetColors();
  const { data: users } = useGetUsers();
  const client = useQueryClient();

  console.log(users?.users);

  const onFinish: FormProps<FieldType>["onFinish"] = (data) => {
    mutate(
      {
        ...data,
        price: Number(data.price),
        count: Number(data.count),
        skidka: Number(data.skidka),
        discountedPrice: Number(data.discountedPrice),
        avgStars: data.avgStars,
        totalLikes: Number(data.totalLikes),
        colors: data.colors.map((name) => ({ name })),
      },
      {
        onSuccess: () => {
          client.invalidateQueries({ queryKey: ["products"] });
        },
      }
    );
  };

  return (
    <div>
      <Title style={{ fontFamily: "Inter" }} level={3}>
        Create Product
      </Title>
      <Form
        name="product-form"
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
        style={{ paddingTop: "10px" }}>
        <Form.Item<FieldType>
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input product name!" }]}>
          <Input placeholder="Product name" style={{ height: "40px" }} />
        </Form.Item>

        <Form.Item<FieldType>
          label="Price"
          name="price"
          rules={[{ required: true, message: "Please input price!" }]}>
          <Input type="number" placeholder="Price" style={{ height: "40px" }} />
        </Form.Item>

        <Form.Item<FieldType>
          label="Image URL"
          name="img"
          rules={[{ required: true, message: "Please input image URL!" }]}>
          <Input placeholder="Image URL" style={{ height: "40px" }} />
        </Form.Item>

        <Form.Item<FieldType>
          label="Count"
          name="count"
          rules={[{ required: true, message: "Please input count!" }]}>
          <Input type="number" placeholder="Count" style={{ height: "40px" }} />
        </Form.Item>

        <Form.Item<FieldType>
          label="Skidka (%)"
          name="skidka"
          rules={[{ required: true, message: "Please input skidka!" }]}>
          <Input
            type="number"
            placeholder="Skidka"
            style={{ height: "40px" }}
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Discounted Price"
          name="discountedPrice"
          rules={[
            { required: true, message: "Please input discounted price!" },
          ]}>
          <Input
            type="number"
            placeholder="Discounted price"
            style={{ height: "40px" }}
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Average Stars"
          name="avgStars"
          rules={[{ required: true, message: "Please input avg stars!" }]}>
          <Input
            type="number"
            step="0.1"
            max={5}
            min={0}
            placeholder="e.g. 4.5"
            style={{ height: "40px" }}
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Total Likes"
          name="totalLikes"
          rules={[{ required: true, message: "Please input total likes!" }]}>
          <Input
            type="number"
            placeholder="Total likes"
            style={{ height: "40px" }}
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Colors"
          name="colors"
          rules={[{ required: true, message: "Please select colors!" }]}>
          <Select
            mode="multiple"
            placeholder="Select product colors"
            style={{ height: "auto" }}
            loading={!colors}>
            {colors?.data?.map((c) => (
              <Option key={c.id} value={c.name}>
                {c.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item<FieldType>
          label="Category"
          name="categoryId"
          rules={[{ required: true, message: "Please select category!" }]}>
          <Select placeholder="Select category" loading={!categoryes}>
            {categoryes?.data?.map((category) => (
              <Option key={category?.id} value={category?.id}>
                {category?.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item<FieldType>
          label="User"
          name="userId"
          rules={[{ required: true, message: "Please select user!" }]}>
          <Select placeholder="Select user">
            {users?.users
              ?.filter((val) => val?.users?.id)
              .map((user) => (
                <Option key={user?.users?.id} value={user?.users?.id}>
                  {user?.users?.role}
                </Option>
              ))}
          </Select>
        </Form.Item>

        <Form.Item<FieldType>
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please enter description!" }]}>
          <Input.TextArea
            placeholder="Enter product description"
            style={{ height: "120px" }}
          />
        </Form.Item>

        <Form.Item>
          <Button
            loading={isPending}
            type="primary"
            htmlType="submit"
            className="w-full"
            style={{ height: "40px", fontSize: "18px" }}>
            Create
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
