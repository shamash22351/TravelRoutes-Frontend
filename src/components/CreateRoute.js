import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/style.css';
import LocationModal from './LocationModal';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const CreateRoute = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);
    const [locations, setLocations] = useState([]);
    const [isPrivate, setIsPrivate] = useState(false);
    const [showLocationForm, setShowLocationForm] = useState(false);
    const navigate = useNavigate();
    const { userId } = useUser();

    const handleImageChange = (event) => {
        const files = Array.from(event.target.files);
        if (files.length + images.length > 5) {
            alert('Вы можете загрузить не более 5 изображений.');
        } else {
            setImages([...images, ...files]);
        }
    };

    const handleAddLocation = (location) => {
        setLocations([...locations, location]);
    };

    const submitToBackend = async (formData) => {
        try {
            const response = await fetch('http://localhost:8000/api/routes/', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Ошибка: ${response.status}, ${JSON.stringify(errorData)}`);
            }

            const data = await response.json();
            console.log('Данные успешно отправлены на бэкенд:', data);
            navigate('/routes', { state: { title, description, images: Array.from(images), locations, isPrivate } });
        } catch (error) {
            console.error('Ошибка при отправке данных:', error);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);

        images.forEach((image) => {
            formData.append('images', image);
        });

        formData.append('points', JSON.stringify(locations.map(loc => [loc.longitude, loc.latitude])));
        formData.append('user_id', userId);
        formData.append('is_private', isPrivate);

        submitToBackend(formData);
    };

    return (
        <div className="container">
            <h2>Создать маршрут</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Заголовок маршрута:</label> { }
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Описание маршрута:</label>
                    <textarea
                        className="form-control"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="images">Загрузить изображения (до 5):</label>
                    <input
                        type="file"
                        className="form-control"
                        id="images"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                    />
                </div>

                {images.length > 0 && (
                    <div className="mt-3">
                        <h5>Добавленные изображения:</h5>
                        <ul>
                            {images.map((img, index) => (
                                <li key={index}>{img.name}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <button type="button" className="btn btn-primary" onClick={() => setShowLocationForm(true)}>
                    Добавить место
                </button>

                {locations.length > 0 && (
                    <div className="mt-3">
                        <h5>Добавленные места:</h5>
                        <ul>
                            {locations.map((loc, index) => (
                                <li key={index}>
                                    Широта: {loc.latitude}, Долгота: {loc.longitude}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className="form-group">
                    <label>
                        <input
                            type="checkbox"
                            checked={isPrivate}
                            onChange={() => setIsPrivate(!isPrivate)}
                        />
                        Сделать маршрут приватным
                    </label>
                </div>

                <button type="submit" className="btn btn-success">
                    Создать маршрут
                </button>
            </form>

            <LocationModal
                show={showLocationForm}
                onHide={() => setShowLocationForm(false)}
                onAddLocation={handleAddLocation}
            />
        </div>
    );
};

export default CreateRoute;