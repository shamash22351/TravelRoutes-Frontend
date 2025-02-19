import React, { useState } from 'react';

const Registration = () => {
  const [formData, setFormData] = useState({
    userName: '',
    mail: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!formData.userName || !formData.mail || !formData.password || !formData.confirmPassword) {
      setError("Пожалуйста, заполните все обязательные поля."); //Валидация
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }

    try {
      const response = await fetch('localhost/api/signup', { //Здесь можно будет сделать api, можно в другом файле
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error("Ошибка при регистрации. Попробуйте еще раз.");
      }
      // Обработка успешной регистрации, можно ридерект добавить, хз
      alert('Регистрация успешна!');

    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="register-container">
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="userName">Имя пользователя:</label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="mail">Почта:</label>
          <input
            type="text"
            id="mail"
            name="mail"
            value={formData.mail}
            onChange={handleChange}
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
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
}

export default Registration;