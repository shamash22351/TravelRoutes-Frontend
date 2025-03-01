import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import '../style/style.css';
import { useUser } from '../context/UserContext';  
import './styleMainPage.css';

const Register = () => {
  const { setUserId } = useUser(); 
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [registrationConfirmed, setRegistrationConfirmed] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Пароли не совпадают!');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/signup/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          username: formData.username, 
          email: formData.email,
          password: formData.password
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setUserId(data.id); 
        setRegistrationConfirmed(true);
        toast.success('Регистрация успешна!');
        navigate('/routes');
      } else {
        const errorData = await response.json();
        console.error('Ошибка:', errorData);
        toast.error('Ошибка регистрации, попробуйте снова.');
      }
    } catch (error) {
      console.error('Ошибка сети:', error);
      toast.error('Ошибка сети, попробуйте снова позже.'); 
    }
  };

  return (
    <div className="body-container">
      <ToastContainer />
      <div className="register-container">
        <h2>Регистрация</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Имя:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username} 
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Электронная почта:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Пароль:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Повторите пароль:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
          <button type="submit">Зарегистрироваться</button>
        </form>
        {registrationConfirmed && 
          <p>Регистрация прошла успешно! Пожалуйста, войдите в систему.</p>
        }
      </div>
    </div>
  );
};

export default Register;