import React, { useState } from "react";
import { Button, Modal, Typography } from "antd";
import { AiFillEye } from "react-icons/ai";
import { useSelector } from "react-redux";

const ViewOrderModal = ({ order }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { user } = useSelector((state) => state.auth);
  return (
    <div>
      <Button
        onClick={() => {
          setIsModalVisible(true);
        }}
      >
        <AiFillEye />
      </Button>
      <Modal
        title="Order Details"
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
        }}
        footer={false}
      >
        <div className="orderDetails">
          <Typography.Title level={5}>Order Id: {order._id}</Typography.Title>
          <Typography.Title level={5}>
            Total: {order.totalPrice}
          </Typography.Title>
          <Typography.Title level={5}>
            Status: {order.status.toUpperCase()}
          </Typography.Title>
          <Typography.Title level={5}>
            Shipping Address: {order.shippingAddress}
          </Typography.Title>
        </div>
        {user && user.role == "admin" && (
          <div className="userDetails">
            <Typography.Title level={4}>User Details</Typography.Title>
            <div className="userDetailsList">
              <Typography.Title level={5}>
                Name: {order.user.name}
              </Typography.Title>
              <Typography.Title level={5}>
                Email: {order.user.email}
              </Typography.Title>
            </div>
          </div>
        )}
        <div className="orderProducts">
          <Typography.Title level={4}>Products</Typography.Title>
          <div className="orderProductsList">
            {order.products.map((product) => (
              <div className="orderProduct">
                <Typography.Title level={5}>
                  {product.product.name}
                </Typography.Title>
                <Typography.Title level={5}>
                  {product.quantity}
                </Typography.Title>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ViewOrderModal;
