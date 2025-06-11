import React from "react";
import { Typography, type FormProps } from "antd";
import { Button, Form, Input } from "antd";
import { useLogin } from "./service/useLogin";
import "./login.css";
import { saveState } from "../../config/storage";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

type FieldType = {
  email: string;
  password: string;
};

export const Login: React.FC = () => {
  const { isPending, mutate } = useLogin();
  const navigate = useNavigate();
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    mutate(values, {
      onSuccess: (res: { token: string }) => {
        saveState("token", res.token);
        navigate("/app", {
          replace: true,
        });
      },
    });
  };
  return (
    <section className="w-full min-h-screen flex justify-center items-center">
      <div className="max-w-[500px] w-full bg-text-primary shadow rounded-2xl p-4">
        <Title
          className="text-center"
          style={{ fontFamily: "Inter" }}
          level={3}>
          Login
        </Title>
        <Form
          name="basic"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
          style={{ paddingTop: "10px" }}>
          <Form.Item<FieldType>
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your Email!" }]}
            style={{ fontWeight: "600" }}>
            <Input
              type="email"
              style={{ height: "45px" }}
              placeholder="Enter your Email"
            />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
            style={{ fontWeight: "600" }}>
            <Input.Password
              type="password"
              style={{ height: "45px" }}
              placeholder="Enter your Password"
            />
          </Form.Item>

          <Form.Item label={null}>
            <Button
              type="primary"
              loading={isPending}
              htmlType="submit"
              className="w-full rounded-lg text-text-primary transition-all"
              style={{
                backgroundColor: "#00727d",
                borderColor: "#00727d",
                height: "45px",
                fontSize: "16px",
                fontFamily: "Inter",
                fontWeight: "500",
              }}>
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};
