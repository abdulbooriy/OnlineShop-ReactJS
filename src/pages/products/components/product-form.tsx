import { Button, Form, Input, Typography, type FormProps } from "antd";

const { Title } = Typography;

type FieldType = {
  name: string;
  price: number;
  description: string;
  skidka: string;
  categoryId: string;
  userId: string;
  count: number;
};

export const ProductForm = () => {
  const onFinish: FormProps<FieldType>["onFinish"] = (data) => {
    console.log(data);
  };

  return (
    <div>
      <Title style={{ fontFamily: "Inter" }} level={3}>
        Create Products
      </Title>
      <Form
        name="basic"
        style={{ paddingTop: "10px" }}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical">
            
        <Form.Item<FieldType>
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input Product Name!" }]}>
          <Input placeholder="Enter Product Title" style={{ height: "40px" }} />
        </Form.Item>

        <Form.Item<FieldType>
          label="Price"
          name="price"
          rules={[{ required: true, message: "Please input Product Price!" }]}>
          <Input
            type="number"
            placeholder="Enter Product Price"
            style={{ height: "40px" }}
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Count"
          name="count"
          rules={[{ required: true, message: "Please input Product Count!" }]}>
          <Input
            type="number"
            placeholder="Enter Product Count"
            style={{ height: "40px" }}
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Skidka"
          name="skidka"
          rules={[{ required: true, message: "Please input Product Skidka!" }]}>
          <Input
            type="number"
            placeholder="Enter Product Skidka"
            style={{ height: "40px" }}
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Description"
          name="description"
          rules={[
            { required: true, message: "Please input Product description!" },
          ]}>
          <Input.TextArea
            placeholder="Enter Product description"
            style={{ height: "120px" }}
          />
        </Form.Item>

        <Form.Item label={null}>
          <Button
            style={{
              height: "40px",
              fontSize: "18px",
              fontFamily: "Inter",
            }}
            className="w-full"
            type="primary"
            htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
