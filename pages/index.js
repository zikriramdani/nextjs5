import React, { useState, useEffect, useContext } from "react";

import { useRouter } from 'next/router';

import styles from '../styles/Home.module.css';
import Heads from '../components/Heads';
import Footer from '../components/Footer';
import Link from "next/link";
import { Button, Input, Row, Col, Table, Tooltip, Popconfirm, message, Modal } from 'antd';
import { EyeOutlined, DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";

import ProductView from "./home/productView";
import ProductUpdate from "./home/productUpdate";
import ProductCreate from "./home/productCreate";

import axios from 'axios';
import { API_BASE_URL } from '../config/AppConfig';

const Home = () => {
  // token
  if (typeof window !== 'undefined') {
    console.log('we are running on the client')
    var token = localStorage.getItem('token');
  } else {
    console.log('we are running on the server');
  }
  
  const [products, setProducts] = useState([]);
  const [filteredData, setFilteredData] = useState(products);
  const [loadingTable, setLoadingTable] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productVisibleShow, setProductVisibleShow] = useState(false);

  const [productVisibleUpdate, setProductVisibleUpdate] = useState(false);
  const [confirmLoadingUpdate, setConfirmLoadingUpdate] = useState(false);

  const [productVisibleCreate, setProductVisibleCreate] = useState(false);
  const [confirmLoadingCreate, setConfirmLoadingCreate] = useState(false);

  const router = useRouter();

  const showProduct = async (productInfo) => {
    console.log('SHOW PRODUCT', productInfo)
    setProductVisibleShow(true);
    setSelectedProduct(productInfo);
  }

  const updateProduct = async (productInfo) => {
    console.log('UPDATE PRODUCT', productInfo)
    setProductVisibleUpdate(true);
    setSelectedProduct(productInfo);
  }

  const handleUpdate = async (values) => {
    setConfirmLoadingUpdate(true);

    const changeProduct = {
      sku: values.sku,
      product_name: values.product_name,
      qty: values.qty,
      price: values.price,
      unit: values.unit,
      status: values.status
    };

    axios
      .post(API_BASE_URL + "/item/update", changeProduct, { headers: { Authorization: "Bearer " + token }}, {
        mode: "cors",
      })
      .then((response) => {
        console.log("Update PRODUCT", response);
        setProductVisibleUpdate(false);
        setConfirmLoadingUpdate(false);
        message.success({
          content: response.data.message,
          duration: 2,
        });
        fetchProduct();
      })
      .catch((error) => {
        console.log("error", error);
        setProductVisibleUpdate(false);
        setConfirmLoadingUpdate(false);
        Modal.error({
          title: "Message",
          content: "" + error + "",
          okButtonProps: { },
        });
        if (error.response.status == 401) {
          localStorage.clear();
          router.push('/login');
        }
      });
  };

  const deleteProduct = async (id) => {
    axios
      .post(API_BASE_URL + "/item/add", { headers: { Authorization: "Bearer " + token }}, { 
        mode: "cors" 
      })
      .then((response) => {
        console.log("DELETE PRODUCT", response);
        Message.success({
          content: response.data.error,
          duration: 2,
        });
        fetchProduct();
      })
      .catch((error) => {
        console.log("error", error);
        Modal.error({
          title: "Message",
          content: "" + error + "",
          okButtonProps: { },
        });
        if (error.response.status == 401) {
          localStorage.clear();
          router.push('/login');
        }
      });
  }

  const addShowModal = async () => {
    setProductVisibleCreate(true);
  };

  const handleCreate = async (values) => {
    setConfirmLoadingCreate(true);

    const createProduct = {
      sku: values.sku,
      product_name: values.product_name,
      qty: values.qty,
      price: values.price,
      unit: values.unit,
      status: values.status
    };

    axios
      .post(API_BASE_URL + "/item/add", createProduct, { headers: { Authorization: "Bearer " + token } })
      .then((response) => {
        console.log("CREATE PRODUCT", response);
        setProductVisibleCreate(false);
        setConfirmLoadingCreate(false);
        message.success({
          content: `Successfully add product data`,
          duration: 2,
        });
        fetchProduct();
      })
      .catch((error) => {
        console.log("error", error);
        setProductVisibleCreate(false);
        setConfirmLoadingCreate(false);
        Modal.error({
          title: "Message",
          content: "" + error + "",
          okButtonProps: { },
        });
        if (error.response.status == 401) {
          localStorage.clear();
          router.push('/login');
        }
      });
  };

  const closeProduct = async () => {
    setProductVisibleShow(false);
    setProductVisibleUpdate(false);
    setProductVisibleCreate(false);
  };

  const onSearch = async (e) => {
    let keywords = e.target.value;
    if(keywords !== '') {
      const result = products.filter((items) => {
        return items.sku.toLowerCase().startsWith(keywords.toLowerCase()) || items.product_name.toLowerCase().startsWith(keywords.toLowerCase())
      })

      setFilteredData(result);
    } else {
      setFilteredData(products);
    }
  };

  const fetchProduct = async () => {
    setLoadingTable(true);

    axios
      .get(API_BASE_URL + "/items", { mode: "cors" })
      .then((response) => {
        console.log('DATA PRODUCT', response.data);
        setLoadingTable(false);
        setProducts(response.data);
        setFilteredData(response.data);
      })
      .catch((error) => {
        console.log("error", error);
        Modal.error({
          title: "Message",
          content: "" + error + "",
          okButtonProps: { },
        });
      });
  };

  useEffect(() => {
    // check token kosong
    if(!token) {
      router.push('/login');
    }

    fetchProduct();
  }, []);

  const handleLogout = () => {   
    localStorage.removeItem('token')
    router.push('/login');
  }

  const tableColumns = [
    {
      title: 'SKU',
      dataIndex: 'sku',
    },
    {
      title: 'Product Name',
      dataIndex: 'product_name',
    },
    {
      title: 'Qty',
      dataIndex: 'qty',
    },
    {
      title: 'Price',
      dataIndex: 'price',
    },
    {
      title: 'Unit',
      dataIndex: 'unit',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: "Action",
      dataIndex: "actions",
      render: (_, elm) => (
        <div className="text-right">
          <Tooltip title="View">
            <Button
              type="primary"
              icon={<EyeOutlined />}
              onClick={() => {
                showProduct(elm);
              }}
            />
          </Tooltip>
          <Tooltip title="Edit">
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => {
                updateProduct(elm);
              }}
              style={{ background: "#28a745", borderColor: "#28a745", margin: "0px 5px 0px 5px" }}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => deleteProduct(elm.id)}
            >
              <Button danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className={styles.container}>
        <Heads />

        <main className={styles.mainContent}>
          <Row wrap={false} style={{ paddingBottom: "10px"}}>
            <Col flex="none">
              <div></div>
            </Col>
            <Col flex="auto" style={{ textAlign: "right"}}>
              {token ? (
                <>
                  <a onClick={handleLogout}>Logout</a> 
                </>
              ) : <><Link href="/register"><a>Register</a></Link> | <Link href="/login"><a>Login</a></Link></>}
            </Col>
          </Row>

          <Row wrap={false} style={{ paddingBottom: "15px"}}>
            <Col flex="auto" style={{ paddingRight: '16px' }}>
              <Input.Group compact>
                <Input.Search allowClear placeholder="Search SKU or Product Name" onChange={(e) => onSearch(e)} />
              </Input.Group>
            </Col>
            <Col flex="none">
              <Tooltip title="Add Data">
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  className="mb-3"
                  onClick={addShowModal}
                >
                  Add Data
                </Button>
              </Tooltip>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Table
                columns={tableColumns}
                dataSource={filteredData}
                rowKey="id"
                loading={loadingTable}
              />

              <ProductView
                data={selectedProduct}
                visible={productVisibleShow}
                close={closeProduct}
              />
              <ProductUpdate
                data={selectedProduct}
                visible={productVisibleUpdate}
                onUpdate={handleUpdate}
                confirmLoading={confirmLoadingUpdate}
                close={closeProduct}
              />
              <ProductCreate
                visible={productVisibleCreate}
                onCreate={handleCreate}
                confirmLoading={confirmLoadingCreate}
                close={closeProduct}
              />
            </Col>
          </Row>
        </main>

        <Footer />
      </div>
    </>
  )
}

export default Home;
