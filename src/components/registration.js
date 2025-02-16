import React, { useState } from 'react';

const Registration = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mail: '',
    birthdate: '',
    password: ''
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
    if (!formData.firstName || !formData.mail || !formData.lastName || !formData.birthdate || !formData.password) {
      setError("Пожалуйста, заполните все обязательные поля."); //Валидация
      return;
    }

    try {
      const response = await fetch('', { //Здесь можно будет сделать api, можно в другом файле
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
          <label htmlFor="firstName">Имя:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Фамилия:</label>
          <input 
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
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
          <label htmlFor="birthdate">Дата рождения:</label>
          <input 
            type="date"
            id="birthdate"
            name="birthdate"
            value={formData.birthdate}
            onChange={handleChange}
            required
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
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
}

export default Registration;