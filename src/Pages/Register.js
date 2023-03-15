import React, { useEffect } from "react";
import { Typography, Form, Row, Col, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../Redux/Actions/authActions";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const onFinish = async (values) => {
    const res = await dispatch(register(values));
    if (res) {
      navigate("/verify-email");
    }
  };
  return (
    <div className="container page">
      <div className="box">
        <Typography.Title level={3}>Sign Up</Typography.Title>
        <Form
          style={{
            width: "70%",
          }}
          autoComplete="off"
          layout="vertical"
          onFinish={onFinish}
        >
          <Row>
            <Col span={24}>
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input your name!",
                  },
                ]}
              >
                <Input type="text" placeholder="Name" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
              >
                <Input type="email" placeholder="Email" />
              </Form.Item>
            </Col>
            <Col
              span={24}
              style={{
                padding: 0,
              }}
            >
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password placeholder="Password" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <a
                  onClick={() => {
                    navigate("/login");
                  }}
                  style={{
                    textAlign: "right",
                    display: "block",
                  }}
                >
                  Already have an account? Login!
                </a>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default Register;
