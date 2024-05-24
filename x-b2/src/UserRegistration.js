import React, { useState } from 'react';
import Parse from 'parse/dist/parse.min.js';
import './App.css';
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import { Button,  Form, Input, message } from 'antd';


const app_id = process.env.REACT_APP_PARSE_APP_ID;
const javascript_key = process.env.REACT_APP_PARSE_APP_JAVASCRIPT_KEY
const REACT_APP_PARSE_HOST_URL = 'https://parseapi.back4app.com/parse';

// Inicializar Parse
Parse.initialize(app_id, javascript_key);
Parse.serverURL = REACT_APP_PARSE_HOST_URL; 


export const UserRegistration = () => {
  // Variables de estado
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);

    if (password.length < minLength) {
      return 'La contraseña debe tener al menos 8 caracteres.';
    }
    if (!hasSpecialChar) {
      return 'La contraseña debe contener al menos un carácter especial.';
    }
    if (!hasUpperCase) {
      return 'La contraseña debe contener al menos una letra mayúscula.';
    }
    return '';
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setPassword(value);
    setError(validatePassword(value));
  };

  const isPasswordValid = () => {
    return validatePassword(password) === '';
  };



  // Función para registrar al usuario
  const doUserRegistration = async function () {
    // Valores del estado
    const usernameValue = username;
    const emailValue = email;
    const passwordValue = password;
    const nameValue = name; // Asegúrate de que 'name' está definido en tu estado y formulario
  
    try {
      // Crear una nueva instancia de Parse.User
      const user = new Parse.User();
      user.set("username", usernameValue);
      user.set("password", passwordValue);
      user.set("email", emailValue);
      user.set("name", nameValue); // Esto se guarda en el Parse.User
  
      // Registrar al usuario
      const createdUser = await user.signUp();
  
      // Crear una nueva instancia de la clase DB_B2
      const UserProfile = Parse.Object.extend("DB_B2");
      const userProfile = new UserProfile();
  
      // Establecer los campos adicionales
      userProfile.set("username", usernameValue);
      userProfile.set("email", emailValue);
      userProfile.set("name", nameValue);
  
      // Guardar el perfil del usuario en DB_B2
      await userProfile.save();
  
      alert(`Success! User ${createdUser.getUsername()} was successfully created!`);
      message.info(`Welcome ${createdUser.getUsername()}`);
      return true;
    } catch (error) {
      // Manejo de errores
      alert(`Error! ${error.message}`);
      return false;
    }
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
        name="name"
        rules={[
          {
            required: true,
            message: 'Please input your Name!',
          },
        ]}
      >
        <Input
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Name"
        size="large"
        className="form_input"
         prefix={<UserOutlined />}/>
      </Form.Item>
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
        name="email"        
        rules={[
          {
            required: true,
            message: 'Please input your Email!',
          },
        ]}
      >
        <Input
          prefix={<MailOutlined />}
          value={email}
          
          onChange={(event) => setEmail(event.target.value)}
          size="large"
          type="email"
          placeholder="Email"
        />
      </Form.Item>
      <Form.Item
       validateStatus={error ? 'error' : ''}
       help={error}
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
          
          onChange={handleChange}
          size="large"
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
        <Button
        disabled={!isPasswordValid()}
         onClick={doUserRegistration}
         type="primary"
         className="form_button"
         color="#208AEC"
         size="large"
         block
         htmlType="submit">
          Sign Up
        </Button>
      </Form.Item>
    </Form>
  );
};