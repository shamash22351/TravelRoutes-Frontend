import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Импортируем хук для перенаправления
import { ToastContainer, toast } from 'react-toastify'; // Импортируем необходимые элементы для уведомлений
import 'react-toastify/dist/ReactToastify.css'; // Импортируем стили для уведомлений
import './styleMainPage.css';
const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

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
      alert('Пароли не совпадают!');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/signup/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.name,
          email: formData.email,
          password: formData.password
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Успех:', data);
        toast.success('Вы успешно зарегистрированы!');
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
      <ToastContainer /> { }
      <div className="register-container">
        <h2>Регистрация</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Имя:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.name}
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
      </div>
    </div>
  );
};

export default Register;