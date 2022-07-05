import React, { useState } from "react";
import { Input, Form, Modal, Button } from "antd";

const rules = {
  sku: [
    {
      required: true,
      message: "Please enter sku",
    },
  ],
  product_name: [
    {
      required: true,
      message: "Please enter product name",
    },
  ],
  qty: [
    {
      required: true,
      message: "Please enter qty",
    },
  ],
  price: [
    {
      required: true,
      message: "Please enter price",
    },
  ],
  unit: [
    {
      required: true,
      message: "Please enter unit",
    },
  ],
  status: [
    {
      required: true,
      message: "Please enter status",
    },
  ],
};

const ProductCreate = ({ visible, close, confirmLoading, onCreate }) => {
  const [form] = Form.useForm();
  const [btnLoading, setBtnLoading] = useState(false);

  return (
    <div>
      <Modal
        width={800}
        title="Add Data Product"
        visible={visible}
        confirmLoading={confirmLoading}
        onCancel={() => {
          close();
          form.resetFields();
        }}
        okText="Create"
        cancelText="Cancel"
        footer={[
          <>
            <Button
              key="back"
              onClick={() => {
                close();
                form.resetFields();
              }}
            >
              Cancel
            </Button>
            <Button
              key="submit"
              type="primary"
              loading={btnLoading}
              onClick={() => {
                setBtnLoading(true);

                form
                  .validateFields()
                  .then((values) => {
                    onCreate(values);
                    form.resetFields();
                    setBtnLoading(false);
                  })
                  .catch((info) => {
                    console.log("Validate Failed:", info);
                    setBtnLoading(false);
                  });
              }}
            >
              Create
            </Button>
          </>,
        ]}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{
            modifier: "public",
          }}
        >
          <Form.Item
            name="sku"
            label="SKU"
            rules={rules.sku}
          >
            <Input placeholder="SKU" />
          </Form.Item>
          <Form.Item
            name="product_name"
            label="Product Name"
            rules={rules.product_name}
          >
            <Input placeholder="Product Name" />
          </Form.Item>
          <Form.Item
            name="qty"
            label="QTY"
            rules={rules.qty}
          >
            <Input placeholder="Qty" />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={rules.price}
          >
            <Input placeholder="Price" />
          </Form.Item>
          <Form.Item
            name="unit"
            label="Unit"
            rules={rules.unit}
          >
            <Input placeholder="Unit" />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={rules.status}
          >
            <Input placeholder="Status" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductCreate;
