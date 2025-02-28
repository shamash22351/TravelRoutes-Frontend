import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const RouteDetails = () => {
    const { id } = useParams(); // Получаем ID маршрута из URL
    const [route, setRoute] = useState(null);

    useEffect(() => {
        const fetchRoute = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/routes/${id}/`);
                if (!response.ok) {
                    throw new Error('Маршрут не найден');
                }
                const data = await response.json();
                setRoute(data);
            } catch (error) {
                console.error('Ошибка при загрузке маршрута:', error);
            }
        };

        fetchRoute();
    }, [id]);

    if (!route) {
        return <p>Загрузка...</p>;
    }

    const { title, description, image, points, is_private } = route;

    return (
        <div className="container my-4">
            <div className="alert alert-info">
                <h3>{title}</h3>
                <p>{description}</p>
                {image && image.length > 0 && (
                    <div id="imageCarousel" className="carousel slide" data-ride="carousel">
                        <div className="carousel-inner">
                            {image.map((img, index) => (
                                <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                                    <img 
                                        src={URL.createObjectURL(img)} 
                                        className="d-block w-100" 
                                        alt={`Изображение ${index + 1}`} 
                                        style={{ maxHeight: '400px', objectFit: 'cover' }} 
                                    />
                                </div>
                            ))}
                        </div>
                        <a className="carousel-control-prev" href="#imageCarousel" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="sr-only">Предыдущее</span>
                        </a>
                        <a className="carousel-control-next" href="#imageCarousel" role="button" data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="sr-only">Следующее</span>
                        </a>
                    </div>
                )}
                {points && points.length > 0 && (
                    <div>
                        <h5>Места:</h5>
                        <ul>
                            {points.map((loc, index) => (
                                <li key={index}>
                                    Широта: {loc.latitude}, Долгота: {loc.longitude}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                <p>{is_private ? 'Маршрут приватный' : 'Маршрут публичный'}</p>
                <button className="btn btn-primary mt-3">
                    Оставить комментарий
                </button>
            </div>
        </div>
    );
};

export default RouteDetails;