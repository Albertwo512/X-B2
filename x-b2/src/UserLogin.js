import React, { useState, useEffect } from 'react';
import Parse from 'parse/dist/parse.min.js';
import './App.css';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Divider, message } from 'antd';

export const UserLogin = () => {
  // State variables
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();
  
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  useEffect(() => {
    // Check if there is a logged-in user when the component mounts
    getCurrentUser();
  }, []);

  const doUserLogIn = async function () {
    try {
      const loggedInUser = await Parse.User.logIn(username, password);
      messageApi
      .open({
        type: 'loading',
        content: `Searching... ${loggedInUser.getUsername()}`,
        duration: 2.5,
      })
      .then(() => getCurrentUser())
      .then(() => message.success(`Welcome ${loggedInUser.getUsername()}`, 2.5))

      
      setUsername('');
      setPassword('');
      
      
      return true;
    } catch (error) {
      alert(`Error! ${error.message}`);
      return false;
    }
  };

  const doUserLogOut = async function () {
    try {
      await Parse.User.logOut();
      alert('Success! No user is logged in anymore!');
      getCurrentUser();
      return true;
    } catch (error) {
      alert(`Error! ${error.message}`);
      return false;
    }
  };

  const getCurrentUser = async function () {
    const currentUser = await Parse.User.current();
    setCurrentUser(currentUser);
    return currentUser;
  };

  return (  
      


    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
        <div className='header_logo'>
        <img
          className="header_logo"
          alt="Back4App Logo"
          src={
            'https://i.ibb.co/54LZ3s4/IMG-2865.png'
          }
        />
        </div>
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        placeholder="Username"
        size="large"
        className="form_input"
         prefix={<UserOutlined />}/>
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
          value={password}
            onChange={(event) => setPassword(event.target.value)}
            size="large"
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
      {contextHolder}
        <Button
         onClick={doUserLogIn}
         type="primary"
         className="form_button"
         color="#208AEC"
         size="large"
         block
         htmlType="submit">
          Log in
        </Button>
        Or <a href="/UserRegistration">Register now!</a>
      </Form.Item>
      {currentUser !== null && (
        <div className="container">
          <h2 className="heading">User Screen</h2>
          <Divider />
          <h2 className="heading">{`Hello ${currentUser.get('username')}!`}</h2>
          <div className="form_buttons">
            <Button
              onClick={doUserLogOut}
              type="primary"
              className="form_button"
              color="#3f6600"
              size="large"
            >
              Log Out
            </Button>
          </div>
        </div>
      )}
    
    </Form>
  );
};