import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useUser } from '../context/UserContext';    

const Authorization = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState(null);
    const navigate = useNavigate(); 
    const { setUserId } = useUser(); 

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
        if (!formData.email || !formData.password) {
            setError("Пожалуйста, заполните все обязательные поля.");
            return;
        }
    
        try {
            const response = await fetch('http://localhost:8000/api/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    identifier: formData.email,
                    password: formData.password
                })
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Ошибка при авторизации. Попробуйте еще раз.");
            }
    
            const data = await response.json();
            if (data.userId && data.token) {  
                setUserId(data.userId); 
                localStorage.setItem('token', data.token);
                alert('Авторизация успешна!');
                navigate('/routes'); 
            } else {
                throw new Error("Не удалось получить идентификатор пользователя или токен.");
            }
            console.log("Полученный токен:", data.token);
            localStorage.setItem('token', data.token);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="body-container">
            <div className="container d-flex justify-content-center align-items-center vh-100">
                <div className="login-container border rounded p-4 shadow-lg bg-light">
                    <h2 className="text-center mb-4">Авторизация</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <label htmlFor="email">Почта:</label>
                            <input 
                                type="text"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="form-control"
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="password">Пароль:</label>
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
                        {error && <p className="text-danger">{error}</p>}
                        <div className="button-container d-flex justify-content-between">
                            <button type="submit" className="btn btn-primary">Авторизоваться</button>
                            <Link to="/signup" className="btn btn-link">Регистрация</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Authorization;