import { Col, Dropdown, Row, Button } from "antd";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaUserAlt } from "react-icons/fa";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { logout } from "../Redux/Actions/authActions";
const Header = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const items = [
    {
      key: "1",
      label: (
        <a
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          onClick={() => {
            navigate("/register");
          }}
        >
          Register
        </a>
      ),
    },
  ];
  const authItems = [
    {
      key: "1",
      label: (
        <a
          onClick={() => {
            // logout api call
            dispatch(logout());
          }}
        >
          Logout
        </a>
      ),
    },
  ];
  return (
    <div className="header">
      <Row>
        <Col span={8}>
          <h4>{`{logo here}`}</h4>
        </Col>
        <Col span={16} style={{ margin: "auto" }}>
          <Row justify="end" align="middle">
            <Col span={3}>
              <a onClick={() => navigate("/products")} className="link">
                Products
              </a>
            </Col>
            {isAuthenticated && (
              <>
                {user && user.role === "user" && (
                  <Col span={3}>
                    <a onClick={() => navigate("/cart")} className="link">
                      Cart
                    </a>
                  </Col>
                )}
                <Col span={3}>
                  <a onClick={() => navigate("/orders")} className="link">
                    Orders
                  </a>
                </Col>
              </>
            )}
            <Col span={3}>
              <Dropdown
                menu={{
                  items: isAuthenticated ? authItems : items,
                }}
                placement="bottomRight"
                arrow
              >
                <span
                  style={{
                    cursor: "pointer",
                  }}
                >
                  <FaUserAlt size={20} />
                  <IoIosArrowDropdownCircle />
                </span>
              </Dropdown>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Header;
