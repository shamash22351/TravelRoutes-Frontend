import React, { useEffect, useState } from 'react';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error("Токен отсутствует. Пожалуйста, выполните вход.");
                }

                const response = await fetch('http://localhost:8000/api/user/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });

                if (!response.ok) {
                    const errorMessage = await response.text(); // Получение текстовой информации об ошибке
                    throw new Error(`Ошибка ${response.status}: ${errorMessage}`);
                }

                const data = await response.json();
                setUser(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div className="text-danger">{error}</div>;
    }

    return (
        <div className="container">
            <h1>Профиль пользователя</h1>
            {user && (
                <div className="profile-info">
                    <img
                        src={user.avatar || 'URL_К_УМОЛЧАНИЮ_АВАТАРКИ'}
                        alt="Аватарка"
                        className="img-fluid rounded-circle mb-3"
                        width="100"
                        height="100"
                    />
                    <h2>{user.firstName} {user.lastName}</h2>
                    <p>Email: {user.email}</p>
                </div>
            )}
            <form onSubmit={(e) => { }}>
                { }
                <button type="submit" className="btn btn-primary">Сохранить изменения</button>
            </form>
        </div>
    );
};

export default Profile;