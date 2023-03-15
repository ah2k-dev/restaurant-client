import { Col, Row } from "antd";
import React from "react";

const Footer = () => {
  return (
    <div>
      <Row justify="end" align="middle" className="footer">
        <Col span={2}>
          <a
            target="_blank"
            href="https://ah2k-portfolio.web.app"
            style={{ color: "white" }}
          >
            &copy; ah2k-dev
          </a>
        </Col>
      </Row>
    </div>
  );
};

export default Footer;
