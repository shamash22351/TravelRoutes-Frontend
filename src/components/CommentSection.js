import React, { useState, useEffect } from 'react';
import './styleTypeFeedPage.css';

const CommentSection = ({ routeId }) => {
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState('');
    const [rating, setRating] = useState(0);
    const [error, setError] = useState('');

    // Загрузка отзывов для конкретного маршрута
    const fetchReviews = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/routes/${routeId}/reviews/`);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Не удалось загрузить отзывы');
            }
            const data = await response.json();
            setReviews(data);
        } catch (error) {
            console.error('Ошибка:', error);
            setError(error.message);
        }
    };

    // Добавление нового отзыва
    const handleAddReview = async () => {
        setError('');
        const token = localStorage.getItem('token');
    
        if (!token) {
            setError('Требуется авторизация');
            return;
        }
    
        if (!newReview.trim()) {
            setError('Введите текст отзыва');
            return;
        }
        if (rating === 0) {
            setError('Укажите рейтинг');
            return;
        }
    
        try {
            const url = `http://localhost:8000/api/routes/${routeId}/reviews/`;
            const body = JSON.stringify({ 
                text: newReview,
                rating: rating
            });
    
            console.log('Отправляемые данные:', body); // Логируем тело запроса
    
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: body,
            });
    
            const responseData = await response.json(); // Пытаемся получить JSON-ответ
            console.log('Ответ сервера:', responseData); // Логируем ответ сервера
    
            if (!response.ok) {
                throw new Error(responseData.detail || 'Не удалось добавить отзыв');
            }
    
            setReviews([...reviews, responseData]);
            setNewReview('');
            setRating(0);
        } catch (error) {
            console.error('Ошибка:', error);
            setError(error.message);
        }
    }; //Выводит айдишку, не нейм

    useEffect(() => {
        fetchReviews();
    }, [routeId]);

    return (
        <div className="comment-section mt-4">
            <h5>Отзывы:</h5>
            {reviews.length > 0 ? (
                <ul className="list-group mb-3">
                    {reviews.map((review) => (
                        <li key={review.id} className="list-group-item">
                            <div className="d-flex justify-content-between align-items-start">
                                <div>
                                    <strong>Пользователь #{review.user_id}</strong>
                                    <div className="rating">
                                        {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                                    </div>
                                    <div>{review.text}</div>
                                </div>
                                <small className="text-muted">
                                    {new Date(review.created_at).toLocaleDateString()}
                                </small>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div>Нет отзывов</div>
            )}

            {/* Форма для добавления нового отзыва */}
            <div className="mb-3">
                <div className="rating-stars mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            className={`btn btn-star ${star <= rating ? 'text-warning' : 'text-secondary'}`}
                            onClick={() => setRating(star)}
                            style={{ fontSize: '1.5rem', background: 'none', border: 'none' }}
                        >
                            ★
                        </button>
                    ))}
                </div>
                
                <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Напишите ваш отзыв..."
                    value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}
                ></textarea>
                
                {error && <div className="text-danger mt-1">{error}</div>}
                
                <button
                    className="btn btn-primary mt-2"
                    onClick={handleAddReview}
                >
                    Опубликовать отзыв
                </button>
            </div>
        </div>
    );
};

export default CommentSection;