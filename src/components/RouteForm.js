import React, { useState } from 'react';
import { useRouteContext } from './RouteContext';
import RouteCreator from './RouteCreator';
const RouteForm = () => {
    const { addOrUpdateRoute } = useRouteContext();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [id, setId] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title && description && image) {
            const formData = new FormData();
            formData.append("id", id);
            formData.append("title", title);
            formData.append("description", description);
            formData.append("image", image);

            addOrUpdateRoute(formData);
            setTitle('');
            setDescription('');
            setImage(null);
            setId('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <RouteCreator />
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
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required
            />
            <button type="submit">Сохранить</button>
        </form>
    );
};

export default RouteForm;