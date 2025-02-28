import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styleTypeFeedPage.css';
import NavBar from './NavBar';
import CommentSection from './CommentSection'; 

const TapeFeedPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { id, title, description, images, points, is_private } = location.state || {};
    const [likes, setLikes] = useState({}); 
    const [userLikes, setUserLikes] = useState({}); 
    const [routes, setRoutes] = useState([]);
    const [selectedRouteId, setSelectedRouteId] = useState(null);
    
    const fetchRoutes = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/routes/?expand=photos');
            if (!response.ok) throw new Error('Не удалось загрузить маршруты');
            const data = await response.json();
            console.log('Ответ сервера:', data); 
            setRoutes(data);
        } catch (error) {
            console.error('Ошибка:', error);
        }
    };

    useEffect(() => { fetchRoutes(); }, []);

    useEffect(() => {
        console.log('Routes updated:', routes); 
    }, [routes]);


    const handleLike = async (routeId) => {
        try {
            const response = await fetch(`http://localhost:8000/api/routes/${routeId}/like/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, 
                },
            });
            if (!response.ok) throw new Error('Ошибка при обработке лайка');
            const data = await response.json();
    
            const updatedLikes = { ...likes };
            const updatedUserLikes = { ...userLikes };
    
            if (data.message === "Лайк добавлен") {
                updatedLikes[routeId] = (updatedLikes[routeId] || 0) + 1;
                updatedUserLikes[routeId] = true;
            } else if (data.message === "Лайк удален") {
                updatedLikes[routeId] = (updatedLikes[routeId] || 1) - 1;
                updatedUserLikes[routeId] = false;
            }
    
            setLikes(updatedLikes);
            setUserLikes(updatedUserLikes);
        } catch (error) {
            console.error('Ошибка:', error);
        }
    };

    const fetchLikes = async (routeId) => {
        try {
            const response = await fetch(`http://localhost:8000/api/routes/${routeId}/like/`);
            if (!response.ok) throw new Error('Не удалось загрузить лайки');
            const data = await response.json();
            setLikes((prevLikes) => ({ ...prevLikes, [routeId]: data.likes_count }));
        } catch (error) {
            console.error('Ошибка:', error);
        }
    };
    
    useEffect(() => {
        routes.forEach((route) => fetchLikes(route.id));
    }, [routes]);

    const renderRouteCard = (route, isCreated = false) => (
        <div className="card mb-4 shadow-sm" key={route.id}>
            <div className="card-body">
                <h5 className="card-title">{route.title}</h5>
                <p className="card-text">{route.description}</p>
    
                {/* Карусель для изображений */}
                {route.photos?.length > 0 && (
                    <div id={`carousel-${route.id}`} className="carousel slide mb-3" data-bs-ride="carousel">
                        <div className="carousel-inner">
                            {route.photos.map((photo, index) => (
                                <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={photo.id}>
                                    <img
                                        src={`${photo.image}`}
                                        alt={`Изображение ${index + 1}`}
                                        className="d-block w-100"
                                        style={{ height: '300px', objectFit: 'cover', borderRadius: '8px' }}
                                    />
                                </div>
                            ))}
                        </div>
                        <button
                            className="carousel-control-prev"
                            type="button"
                            data-bs-target={`#carousel-${route.id}`}
                            data-bs-slide="prev"
                        >
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Предыдущее</span>
                        </button>
                        <button
                            className="carousel-control-next"
                            type="button"
                            data-bs-target={`#carousel-${route.id}`}
                            data-bs-slide="next"
                        >
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Следующее</span>
                        </button>
                    </div>
                )}
    
                {/* Точки маршрута */}
                {route.points?.length > 0 && (
                    <div className="mb-3">
                        <h6>Точки маршрута:</h6>
                        <ul className="list-group">
                            {route.points.map((point, index) => (
                                <li key={index} className="list-group-item">
                                    Широта: {point[1]}, Долгота: {point[0]}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
    
                {/* Статус маршрута, лайки и кнопка */}
                <div className="d-flex justify-content-between align-items-center">
                    <span className={`badge ${route.is_private ? 'bg-warning' : 'bg-success'}`}>
                        {route.is_private ? 'Приватный' : 'Публичный'}
                    </span>
                    <div>
                        <button 
                            className={`btn ${userLikes[route.id] ? 'btn-danger' : 'btn-outline-danger'} me-2`}
                            onClick={() => handleLike(route.id)}
                        >
                            ❤️ {likes[route.id] || 0}
                        </button>
                        <button 
                            className="btn btn-primary"
                            onClick={() => setSelectedRouteId(route.id)}
                        >
                            Комментировать
                        </button>
                    </div>
                </div>
    
                {/* Отображение секции комментариев, если маршрут выбран */}
                {selectedRouteId === route.id && (
                    <CommentSection routeId={route.id} />
                )}
            </div>
        </div>
    );

    return (
        <div className="body-class">
            <header>
                <NavBar />
            </header>

            <main className="container my-4">
                {/* Отображение только что созданного маршрута */}
                {id && renderRouteCard({
                    id,
                    title,
                    description,
                    images: images?.map(img => ({
                        image: URL.createObjectURL(img) // Для новых изображений
                    })),
                    points,
                    is_private
                }, true)}

                {/* Список всех маршрутов */}
                <h4 className="mb-3">Маршруты:</h4>
                {routes.length > 0 ? (
                    routes.map(route => renderRouteCard(route))
                ) : (
                    <div className="alert alert-info">Нет доступных маршрутов</div>
                )}
            </main>

            <footer className="bg-white py-3">
                <div className="container text-center">
                    <p className="mb-0">© 2024 Пудж.</p>
                </div>
            </footer>
        </div>
    );
};

export default TapeFeedPage;