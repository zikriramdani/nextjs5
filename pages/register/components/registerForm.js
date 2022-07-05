import React from "react";
import styles from '../../../styles/Home.module.css';
import { Button, Form, Input, message, Modal } from 'antd';
import Link from "next/link";

import axios from 'axios';
import { API_BASE_URL } from '../../../config/AppConfig';
import { useRouter } from 'next/router';

const LoginForm = () => {
  const router = useRouter();

  const onFinish = async (values) => {
    console.log('Success:', values);

    const formData = new FormData();
    formData.append('email', values.email)
    formData.append('password', values.password)

    axios
      .post(API_BASE_URL + '/register', formData)
      .then((response) => {
        console.log('RESPONSE', response)
        message.success({
          content: `Successfully Register`,
          duration: 2,
        });
        router.push('/login');
      })
      .catch((error) => {
        console.log('error', error)
        Modal.error({
          title: "Message",
          content: "" + error.response.data.email + "",
          okButtonProps: { },
        });
      });
  };

  const onFinishFailed = async (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <div>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{}}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your email!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Daftar
            </Button>
          </Form.Item>
        </Form>
      </div>

      <Link href="/">
        <a>
          <p className={styles.description}>Back to Home</p>
        </a>
      </Link>
    </div>
  )
}

export default LoginForm;