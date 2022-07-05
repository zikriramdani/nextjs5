import React from "react";
import { Drawer } from "antd";

const ProductView = ({ data, visible, close }) => {
  return (
    <Drawer
      width={300}
      placement="right"
      onClose={close}
      closable={false}
      visible={visible}
    >
      <div className="">
        <h6 className="text-muted text-uppercase mb-3">Product details</h6>
        <p>
          <small>SKU : </small>
          <br />
          {data?.sku ? (
            <>
              <span className="text-dark">{data?.sku}</span>
            </>
          ) : (
            <>
              <span>-</span>
            </>
          )}
        </p>
        <p>
          <small>Product Name : </small>
          <br />
          {data?.product_name ? (
            <>
              <span className="text-dark">{data?.product_name}</span>
            </>
          ) : (
            <>
              <span>-</span>
            </>
          )}
        </p>
        <p>
          <small>Qty : </small>
          <br />
          {data?.qty ? (
            <>
              <span className="text-dark">{data?.qty}</span>
            </>
          ) : (
            <>
              <span>-</span>
            </>
          )}
        </p>
        <p>
          <small>Price : </small>
          <br />
          {data?.price ? (
            <>
              <span className="text-dark">{data?.price}</span>
            </>
          ) : (
            <>
              <span>-</span>
            </>
          )}
        </p>
        <p>
          <small>Unit : </small>
          <br />
          {data?.unit ? (
            <>
              <span className="text-dark">{data?.unit}</span>
            </>
          ) : (
            <>
              <span>-</span>
            </>
          )}
        </p>
        <p>
          <small>Status : </small>
          <br />
          {data?.status ? (
            <>
              <span className="text-dark">{data?.status}</span>
            </>
          ) : (
            <>
              <span>-</span>
            </>
          )}
        </p>
      </div>
    </Drawer>
  );
};

export default ProductView;