import { Button, Col, Row, Spin, Typography } from "antd";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddProductModal from "../Components/AddProductModal";
import { addItem } from "../Redux/Actions/cartActions";
import { deleteProduct, getAllProducts } from "../Redux/Actions/productActions";

const Products = () => {
  const { user } = useSelector((state) => state.auth);
  const { products, loading } = useSelector((state) => state.products);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  return (
    <div className="container page">
      <div className="products">
        {user && user.role == "admin" && (
          <Row align={"middle"} justify={"end"}>
            <Col span={4}>
              <AddProductModal />
            </Col>
          </Row>
        )}
        <Typography.Title level={3}>Products</Typography.Title>
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "calc(100vh - 200px)",
            }}
          >
            <Spin size="large" />
          </div>
        ) : (
          <>
            <Row gutter={[16, 16]}>
              {products?.map((product) => (
                <Col lg={6} md={8} sm={12} xs={24}>
                  <div className="product">
                    <div className="product-image">
                      <img src={product.image} alt="product" />
                    </div>
                    <div className="product-details">
                      <Typography.Title level={5}>
                        {product.name}
                      </Typography.Title>
                      <Typography.Text>{product.description}</Typography.Text>
                      <Typography.Text>${product.price}</Typography.Text>
                    </div>
                    <div className="product-actions">
                      {user?.role !== "admin" && (
                        <Button type="primary" disabled={!isAuthenticated} onClick={()=>{
                          dispatch(addItem(product))
                        }}>
                          Add to Cart
                        </Button>
                      )}
                      {user && user.role == "admin" && (
                        <>
                          <AddProductModal state={true} product={product} />
                          <Button
                            type="primary"
                            onClick={() => {
                              dispatch(deleteProduct(product._id));
                            }}
                          >
                            Delete
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </>
        )}
      </div>
    </div>
  );
};

export default Products;
