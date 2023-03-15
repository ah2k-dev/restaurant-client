import React, { useEffect } from "react";
import { Form, Input, Button, Typography, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="container page">
      <div className="box">
        <Typography.Title level={3}>Verify Email</Typography.Title>
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
                name="token"
                rules={[
                  {
                    required: true,
                    message: "Please input your token!",
                  },
                ]}
              >
                <Input type="email" placeholder="Token" />
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

export default VerifyEmail;
