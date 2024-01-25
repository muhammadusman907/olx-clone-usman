import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button,Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import { auth , signInWithEmailAndPassword} from '../config/firbase';
export const Login  = () => {
  const onFinish = (values) => {
      const { email , password } = values ;
      console.log(email)
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in  
          const user = userCredential.user;
           console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    console.log('Received values of form:', values);
     

  };
  return (
    <> <div className='flex items-center justify-center w-full h-screen '>
      <Form 
      name="normal_login"
      className="login-form w-[400px]"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item >
        
      
        <Button type="primary" htmlType="submit" className="login-form-button bg-blue-500 w-full">
          Log in
        </Button>
        <div className="pt-3">
        Or <Link to="/signup">register now!</Link> 
        </div>
      </Form.Item>
    </Form>
    </div></>
   
    
  );
};
