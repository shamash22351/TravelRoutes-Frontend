import React, { useState } from 'react';
import { useRouteContext } from './RouteContext';

const RouteForm = () => {
    const { addOrUpdateRoute } = useRouteContext();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [id, setId] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title && description && imageUrl) {
            addOrUpdateRoute({ id, title, description, imageUrl });
            setTitle('');
            setDescription('');
            setImageUrl('');
            setId('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{id ? 'Изменить маршрут' : 'Добавить маршрут'}</h2>
            <input 
                type="text"
                placeholder="ID маршрута (для редактирования)"
                value={id}
                onChange={(e) => setId(e.target.value)}
            />
            <input 
                type="text" 
                placeholder="Название" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                required 
            />
            <textarea 
                placeholder="Описание" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                required 
            />
            <input 
                type="text" 
                placeholder="URL изображения" 
                value={imageUrl} 
                onChange={(e) => setImageUrl(e.target.value)} 
                required 
            />
            <button type="submit">Сохранить</button>
        </form>
    );
};

export default RouteForm;