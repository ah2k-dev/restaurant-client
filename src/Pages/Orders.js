import { Button, Select, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  cancelOrder,
  deleteOrder,
  getAllOrders,
  getCustomerOrders,
  payment,
  updateOrder,
} from "../Redux/Actions/orderActions";
import { AiFillEye, AiOutlineDelete } from "react-icons/ai";
import {} from "antd";
import ViewOrderModal from "../Components/ViewOrderModal";
import StripeCheckout from "react-stripe-checkout";

const Orders = () => {
  const { orders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.auth);
  const [paymentData, setPaymentData] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    if (paymentData) {
      console.log(paymentData)
      dispatch(payment(paymentData.token, paymentData.id));
    }
  }, [paymentData]);
  const userColumns = [
    {
      title: "Order Id",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Total",
      dataIndex: "totalPrice",
      key: "total",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => {
        let disable = false;
        let nestedDisable = [];
        if (text == "paymentPending") {
          return (
            <StripeCheckout
              stripeKey="pk_test_51MmD7AKWp5Tqj00g372akif5TlPohMNRZLW0KOjMgtOT0ygKngAPaRwV88dPn2T6y0eiSjv5eagNkCjvqhkKkCJG00UwbrpTSJ"
              name="Restaurant App"
              description="Order checkout"
              token={(token) => {
                setPaymentData({
                  token: {...token, amount: record.totalPrice * 100},
                  id: record._id,
                });
              }}
              amount={record.totalPrice * 100}
              currency="USD"
              billingAddress
              shippingAddress
            >
              {/* <Form.Item> */}
              <Button type="primary" htmlType="submit">
                Pay Now
              </Button>
              {/* </Form.Item> */}
            </StripeCheckout>
          );
        }
        if (text == "delivered" || text == "cancelled" || text == "pending") {
          disable = true;
        }
        nestedDisable = ["paymentPending", "pending", "dispatched"];
        if (text == "dispatched") {
          nestedDisable.push("cancelled");
        }
        console.log(disable);
        return (
          <Select
            defaultValue={text}
            disabled={disable}
            style={{
              width: 140,
            }}
            onChange={(value) => {
              console.log(value);
              if (value !== "cancelled") {
                dispatch(
                  updateOrder(record._id, { status: value }, user?.role)
                );
              } else {
                dispatch(cancelOrder(record._id, user?.role));
              }
            }}
          >
            <Select.Option
              value="paymentPending"
              disabled={nestedDisable.includes("paymentPending")}
            >
              Payment Pending
            </Select.Option>
            <Select.Option
              value="pending"
              disabled={nestedDisable.includes("pending")}
            >
              Pending
            </Select.Option>
            <Select.Option
              value="dispatched"
              disabled={nestedDisable.includes("dispatched")}
            >
              Dispatched
            </Select.Option>
            <Select.Option
              value="delivered"
              disabled={nestedDisable.includes("delivered")}
            >
              Delivered
            </Select.Option>
            <Select.Option
              value="cancelled"
              disabled={nestedDisable.includes("cancelled")}
            >
              Cancel
            </Select.Option>
          </Select>
        );
      },
    },
    {
      title: "Placed at",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => {
        return <span>{new Date(text).toLocaleString()}</span>;
      },
    },
    {
      title: "Updated at",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (text) => {
        return <span>{new Date(text).toLocaleString()}</span>;
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => {
        // console.log(record)
        return <ViewOrderModal order={record} />;
      },
    },
  ];
  const adminColumns = [
    {
      title: "Order Id",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Total",
      dataIndex: "totalPrice",
      key: "total",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => {
        let disable = false;
        let nestedDisable = [];

        if (
          text == "delivered" ||
          text == "cancelled" ||
          text == "paymentPending"
        ) {
          disable = true;
        }
        if (text == "dispatched") {
          nestedDisable.push("cancelled");
        }
        return (
          <Select
            defaultValue={text}
            disabled={disable}
            style={{
              width: 140,
            }}
            onChange={(value) => {
              console.log(value);
              if (value !== "cancelled") {
                dispatch(
                  updateOrder(record._id, { status: value }, user?.role)
                );
              } else {
                dispatch(cancelOrder(record._id, user?.role));
              }
            }}
          >
            <Select.Option
              value="paymentPending"
              disabled={nestedDisable.includes("paymentPending")}
            >
              Payment Pending
            </Select.Option>
            <Select.Option
              value="pending"
              disabled={nestedDisable.includes("pending")}
            >
              Pending
            </Select.Option>
            <Select.Option
              value="dispatched"
              disabled={nestedDisable.includes("dispatched")}
            >
              Dispatched
            </Select.Option>
            <Select.Option
              disabled={nestedDisable.includes("delivered")}
              value="delivered"
            >
              Delivered
            </Select.Option>
            <Select.Option
              value="cancelled"
              disabled={nestedDisable.includes("cancelled")}
            >
              Cancel
            </Select.Option>
          </Select>
        );
      },
    },
    {
      title: "Placed at",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => {
        return <span>{new Date(text).toLocaleString()}</span>;
      },
    },
    {
      title: "Updated at",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (text) => {
        return <span>{new Date(text).toLocaleString()}</span>;
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => {
        // console.log(record)
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <ViewOrderModal order={record} />
            <Button
              type="primary"
              onClick={() => {
                dispatch(deleteOrder(record._id, user?.role));
              }}
            >
              <AiOutlineDelete />
            </Button>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    if (user && user?.role == "admin") {
      dispatch(getAllOrders());
    } else {
      dispatch(getCustomerOrders());
    }
  }, [dispatch, user]);
  return (
    <div className="container page">
      <div className="products">
        <Typography.Title level={3}>Orders</Typography.Title>
        <Table
          dataSource={orders}
          columns={user && user.role == "admin" ? adminColumns : userColumns}
          // pagination={{ pageSize: 5 }}
        />
      </div>
    </div>
  );
};

export default Orders;
