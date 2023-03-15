import { Button, Col, Form, Input, Row, Typography } from "antd";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Login = () => {
  const navigate = useNavigate();
  const { isAuthenticated, verifyEmail } = useSelector((state) => state.auth);
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const onFinish = (values) => {
    console.log("Success:", values);
  };
  return (
    <div className="container page">
      <div className="box">
        <Typography.Title level={3}>Login</Typography.Title>
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
                name="email"
                placeholder="Email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
              >
                <Input type="email" />
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
                placeholder="Password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password />
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
                    navigate("/forgot-password");
                  }}
                  style={{
                    textAlign: "right",
                    display: "block",
                  }}
                >
                  Forgot Password?
                </a>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </div>
            </Col>
            {verifyEmail && (
              <Col span={24}>
                <a
                  onClick={() => {
                    navigate("/request-email-token");
                  }}
                >
                  Verify Email
                </a>
              </Col>
            )}
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default Login;
