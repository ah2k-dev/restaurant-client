import { Col, Dropdown, Row, Button } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { FaUserAlt } from "react-icons/fa";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
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
          href=""
          onClick={() => {
            // logout api call
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
        <Col span={16}>
          <Row justify="end" align="middle">
            <Col span={3}>
              <h3>{`{link here}`}</h3>
            </Col>
            {isAuthenticated && (
              <>
                <Col span={3}>
                  <h3>{`{link here}`}</h3>
                </Col>
                <Col span={3}>
                  <h3>{`{link here}`}</h3>
                </Col>
              </>
            )}
            <Col span={2}>
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
