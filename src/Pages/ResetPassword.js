import React, { useEffect } from "react";
import { Typography, Form, Row, Col, Input, Button } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { resetPassword } from "../Redux/Actions/authActions";

const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { isAuthenticated } = useSelector((state) => state.auth);
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);
  const onFinish = (values) => {
    const res = dispatch(
      resetPassword({
        resetPasswordToken: values.token,
        password: values.password,
        email: state?.email,
      })
    );
    if (res) {
      navigate("/login");
    }
  };
  return (
    <div className="container page">
      <div className="box">
        <Typography.Title level={3}>Reset Password</Typography.Title>
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
                    message: "Please input token!",
                  },
                ]}
              >
                <Input type="number" placeholder="Token" />
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
            <Col
              span={24}
              style={{
                padding: 0,
              }}
            >
              <Form.Item
                name="confirmPassword"
                rules={[
                  {
                    required: true,
                    message: "Please input your password again!",
                  },
                ]}
              >
                <Input.Password placeholder="Confirm Password" />
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

export default ResetPassword;
