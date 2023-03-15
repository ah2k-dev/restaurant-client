import React, { useEffect } from "react";
import { Typography, Form, Row, Col, Input, Button } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { forgotPassword, requestEmailToken } from "../../Redux/Actions/authActions";

const RequestEmailToken = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { isAuthenticated } = useSelector((state) => state.auth);
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);
  const onFinish = async (values) => {
    if (pathname.includes("forgot")) {
      console.log("forgot password");
      const res = await dispatch(forgotPassword(values));
      if (res) {
        navigate("/reset-password", { state: { email: values.email } });
      }
    } else {
      console.log("verify email");
      const res = await dispatch(requestEmailToken(values));
      if (res) {
        navigate("/verify-email", { state: { email: values.email } });
      }
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
