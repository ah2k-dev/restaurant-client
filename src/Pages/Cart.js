import { Button, Col, Input, Row, Typography } from "antd";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addItem,
  removeItem,
  saveShippingAddress,
} from "../Redux/Actions/cartActions";
const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems, total, shippingAddress, length } = useSelector(
    (state) => state.cart
  );
  return (
    <div className="container page">
      <div className="box">
        <Typography.Title level={3}>Cart</Typography.Title>
        {/* <Typography.Title level={5}>No items in cart</Typography.Title> */}
        {/* <Typography.Title
          level={5}
          style={{
            alignSelf: "flex-start",
          }}
        >
          Products:
        </Typography.Title> */}
        <Row
          align={"middle"}
          justify={"space-around"}
          style={{
            width: "90%",
          }}
          gutter={[16, 16]}
        >
          <Col
            span={12}
            style={{
              textAlign: "left",
            }}
          >
            <Typography.Title level={5}>Products</Typography.Title>
          </Col>
          <Col span={6}>
            <Typography.Title level={5}>Quantity</Typography.Title>
          </Col>
          <Col span={6}>
            <Typography.Title level={5}>Price</Typography.Title>
          </Col>
          {Object.keys(cartItems).map((key) => {
            return (
              <>
                <Col span={12}>
                  <div className="cart-product">
                    <div className="cart-product-image">
                      <img src={cartItems[key].image} alt="product" />
                    </div>
                    <div
                      style={{
                        textAlign: "left",
                        width: "70%",
                      }}
                    >
                      {cartItems[key].name}
                    </div>
                  </div>
                </Col>
                <Col span={6}>
                  <div className="cart-product-quantity">
                    <Button
                      shape="circle"
                      onClick={() => {
                        dispatch(removeItem(key));
                      }}
                    >
                      -
                    </Button>
                    <Typography.Text>{cartItems[key].quantity}</Typography.Text>
                    <Button
                      shape="circle"
                      onClick={() => {
                        dispatch(addItem(cartItems[key]));
                      }}
                    >
                      +
                    </Button>
                  </div>
                </Col>
                <Col span={6}>
                  <Typography.Text>
                    ${cartItems[key].totalPrice}
                  </Typography.Text>
                </Col>
              </>
            );
          })}
        </Row>
        <Row
          align={"middle"}
          justify={"space-around"}
          style={{
            width: "90%",
          }}
          gutter={[16, 16]}
        >
          <Col span={12}></Col>
          <Col span={6}>
            <Typography.Title level={5}>Total</Typography.Title>
          </Col>
          <Col span={6}>
            <Typography.Title level={5}>${total}</Typography.Title>
          </Col>
        </Row>
        <Typography.Title level={5}>Shipping Address</Typography.Title>
        <Input.TextArea
          rows={3}
          defaultValue={shippingAddress}
          onChange={(e) => {
            dispatch(saveShippingAddress(e.target.value));
          }}
        />
        <div
          style={{
            alignSelf: "flex-end",
            display: "flex",
            justifyContent: "flex-end",
            margin: "20px 0",
          }}
        >
          <Button
            type="primary"
            onClick={() => {
              let payload = {
                totalPrice: total,
                shippingAddress: shippingAddress,
                products: [],
              };
              Object.keys(cartItems).forEach((key) => {
                payload.products.push({
                  product: key,
                  quantity: cartItems[key].quantity,
                  total: cartItems[key].totalPrice,
                });
              });
              console.log(payload)
            }}
            disabled={length === 0 || shippingAddress === ""}
          >
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
