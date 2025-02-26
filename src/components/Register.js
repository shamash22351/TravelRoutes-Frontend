import React, { useState } from 'react';
import './styleMainPage.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    middleName: '',
    birthdate: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/signup/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          lastName: formData.lastName,
          middleName: formData.middleName,
          birthdate: formData.birthdate,
          password: formData.password
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Успех:', data);
        // Перенаправление или дальнейшие действия могут быть выполнены здесь
      } else {
        const errorData = await response.json();
        console.error('Ошибка:', errorData);
      }
    } catch (error) {
      console.error('Ошибка сети:', error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="register-container border rounded p-4 shadow-lg" style={{ maxWidth: '400px', width: '100%', backgroundColor: '#30478C' }}>
        <h2 className="text-center mb-4 text-white">Регистрация</h2> {/* Белый текст заголовка */}
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="name" className="text-white">Имя:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="lastName" className="text-white">Фамилия:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="middleName" className="text-white">Отчество:</label>
            <input
              type="text"
              id="middleName"
              name="middleName"
              value={formData.middleName}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="birthdate" className="text-white">Дата рождения:</label>
            <input
              type="date"
              id="birthdate"
              name="birthdate"
              value={formData.birthdate}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password" className="text-white">Пароль:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-light w-100">Зарегистрироваться</button> {/* Белая кнопка */}
        </form>
      </div>
    </div>
  );
};

export default Register;
