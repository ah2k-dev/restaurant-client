import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Button, Form, Input, Select } from "antd";

const PaymentModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <div>
      <Button onClick={() => setIsModalVisible(true)}>Pay Now</Button>
      <Modal
        title="Payment"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={false}
      >
        <Form
          form={form}
          onFinish={async (values) => {
            // const res = await dispatch(addPayment(values));
            // if (res) {
            //   form.resetFields();
            //   setIsModalVisible(false);
            // }
          }}
        >
          <Form.Item
            name="cardNumber"
            label="Card Number"
            rules={[
              {
                required: true,
                message: "Please input your card number!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="cardHolder"
            label="Card Holder"
            rules={[
              {
                required: true,
                message: "Please input your card holder!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="expiryDate"
            label="Expiry Date"
            rules={[
              {
                required: true,
                message: "Please input your expiry date!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="cvv"
            label="CVV"
            rules={[
              {
                required: true,
                message: "Please input your cvv!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Pay Now
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PaymentModal;
