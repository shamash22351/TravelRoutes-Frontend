import React, { useState } from 'react';

const authorization = () => {
  const [formData, setFormData] = useState({
    mail: '',
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
    if (!formData.mail || !formData.password) {
      setError("Пожалуйста, заполните все обязательные поля.");
      return;
    }

    try {
      const response = await fetch('', { //API
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error("Ошибка при авторизации. Попробуйте еще раз.");
      }
      alert('Авторизация успешна!');

    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="register-container">
      <h2>Авторизация</h2>
      <form onSubmit={handleSubmit}>
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
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Авторизоваться</button>
      </form>
    </div>
  );
}

export default authorization;