import React, { useEffect } from "react";
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
    .post(API_BASE_URL + '/auth/login', formData)
      .then((response) => {
        console.log('RESPONSE', response.data.token);
        message.success({
          content: `Welcome, ${values.email}`,
          duration: 2,
        });

        // set token on localstorage
        localStorage.setItem('token', response.data.token)

        router.push('/');
      })
      .catch((error) => {
        console.log('error', error)
        Modal.error({
          title: "Message",
          content: "" + error.response.data.error + "",
          okButtonProps: { },
        });
      });
  };

  const onFinishFailed = async (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    // check token
    if(localStorage.getItem('token')) {
      router.push('/');
    }
  }, []);

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
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>

      <div className={styles.grid}>
        <div className={styles.card}>
          <p>Belum punya akun? <br/><Link href="/register">Sign Up.</Link></p>
        </div>
      </div>
    </div>
  )
}

export default LoginForm;