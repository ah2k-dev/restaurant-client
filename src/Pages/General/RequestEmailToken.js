import React, { useEffect } from "react";
import { Typography, Form, Row, Col, Input, Button } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const RequestEmailToken = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isAuthenticated } = useSelector((state) => state.auth);
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);
  const onFinish = (values) => {
    if (pathname.includes("forgot")) {
      console.log("forgot password");
    } else {
      console.log("verify email");
    }
  };

  return (
    <div className="container page">
      <div className="box">
        <Typography.Title level={3}>Find Your Account</Typography.Title>
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
            <Col span={24}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
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

export default RequestEmailToken;
