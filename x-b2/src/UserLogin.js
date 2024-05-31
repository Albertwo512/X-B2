// UserLogin.js
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Divider, Form, Input, message } from 'antd';
import Parse from 'parse/dist/parse.min.js';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './App.css';
import { useAuth } from './Auth';

export const UserLogin = () => {
  // State variables
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const auth = useAuth();
  const history = useHistory();
  console.log('welcome to login')

  const handleLogin = async () => {
    try {
      const loggedInUser = await Parse.User.logIn(username, password);
      auth.signin(() => {
        setCurrentUser(loggedInUser);
        console.log('The next:' + getCurrentUser);
        history.push("/home");
      });
      message.success(`Welcome ${loggedInUser.getUsername()}`, 2.5);
      setUsername('');
      setPassword('');
    } catch (error) {
      alert(`Error! ${error.message}`);
    }
  };

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    console.log(values)
    handleLogin();
  };

  useEffect(() => {
    // Check if there is a logged-in user when the component mounts
    getCurrentUser();
  }, []);

  const doUserLogOut = async function () {
    try {
      await Parse.User.logOut();
      alert('Success! No user is logged in anymore!');
      auth.signout(() => {
        setCurrentUser(null);
        history.push("/home");
      });
    } catch (error) {
      alert(`Error! ${error.message}`);
    }
  };

  const getCurrentUser = async function (values) {
    const currentUser = await Parse.User.current();
    setCurrentUser(currentUser);
    return currentUser;
  };

  return (
    <Form
      name="normal_login"
      className="App-header"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <div className='header_logo'>
        <img
          className="header_logo"
          alt="Back4App Logo"
          src='https://i.ibb.co/54LZ3s4/IMG-2865.png'
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
          prefix={<UserOutlined />}
        />
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

        <a className="login-form-forgot" href='/'>
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button
          onClick={handleLogin}
          type="primary"
          className="form_button"
          color="#208AEC"
          size="large"
          block
          htmlType="submit">
          Log in
        </Button>
        Or <a href="/signup">Register now!</a>
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
