import React from "react";
import { Button, Form, Input, Modal, Select } from "antd";
import { MdEdit, MdOutlineFileUpload } from "react-icons/md";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct, updateProduct } from "../Redux/Actions/productActions";

const AddProductModal = ({ state, product }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const [form] = Form.useForm();
  return (
    <>
      {!state ? (
        <Button onClick={showModal} className="iconButton">
          <MdOutlineFileUpload className="icon" /> Add Product
        </Button>
      ) : (
        <Button onClick={showModal} className="iconButton">
          <MdEdit className="icon" /> Edit
        </Button>
      )}
      <Modal
        title={state ? "Edit Product" : "Add Product"}
        visible={isModalVisible}
        footer={false}
        onCancel={handleCancel}
        width={"600px"}
      >
        <Form
          form={form}
          initialValues={{
            name: product?.name,
            description: product?.description,
            price: product?.price,
            image: product?.image,
            category: product?.category,
          }}
          onFinish={async (values) => {
            if (!state) {
              const res = await dispatch(addProduct(values));
              if (res) {
                form.resetFields();
                setIsModalVisible(false);
              }
            } else {
              const res = await dispatch(
                updateProduct({ _id: product._id, ...values })
              );
              if (res) {
                form.resetFields();
                setIsModalVisible(false);
              }
            }
          }}
        >
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your product name!",
              },
            ]}
          >
            <Input placeholder="Product Name" />
          </Form.Item>
          <Form.Item
            name="description"
            rules={[
              {
                required: true,
                message: "Please input your product description!",
              },
            ]}
          >
            <Input placeholder="Product Description" />
          </Form.Item>
          <Form.Item
            name="price"
            rules={[
              {
                required: true,
                message: "Please input your product price!",
              },
            ]}
          >
            <Input placeholder="Product Price" />
          </Form.Item>
          <Form.Item
            name="image"
            rules={[
              {
                required: true,
                message: "Please input your product image!",
              },
            ]}
          >
            <Input placeholder="Image Link" />
          </Form.Item>
          <Form.Item
            label="Product Category"
            name="category"
            rules={[
              {
                required: true,
                message: "Please input your product category!",
              },
            ]}
          >
            <Select placeholder="Select a category">
              <Select.Option value="fastfood">Fast Food</Select.Option>
              <Select.Option value="bbq">BBQ</Select.Option>
              <Select.Option value="beverages">Beverages</Select.Option>
            </Select>
          </Form.Item>
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
        </Form>
      </Modal>
    </>
  );
};

export default AddProductModal;
