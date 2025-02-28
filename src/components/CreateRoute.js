import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/style.css';
import LocationModal from './LocationModal'; 
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import NavBar from './NavBar'; 

const CreateRoute = () => {
    const [title, setTitle] = useState(''); 
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);
    const [locations, setLocations] = useState([]);
    const [is_private, setis_private] = useState(false);
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        const points = locations.map(loc => [parseFloat(loc.longitude), parseFloat(loc.latitude)]);
        
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }
    
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('points', JSON.stringify(points));
            formData.append('is_private', is_private);
    
            images.forEach((image, index) => {
                formData.append('photos', image);
            });
    
            const routeResponse = await fetch('http://localhost:8000/api/routes/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData,
            });
    
            if (!routeResponse.ok) {
                const errorData = await routeResponse.json();
                throw new Error(errorData.detail || 'Ошибка создания маршрута');
            }
    
            const createdRoute = await routeResponse.json();
    
            navigate('/routes', {
                state: {
                    id: createdRoute.id,
                    title: createdRoute.title,
                    description: createdRoute.description,
                    images: images, 
                    points: createdRoute.points,
                    is_private: createdRoute.is_private
                }
            });
        } catch (error) {
            console.error('Ошибка:', error.message);
            alert(`Ошибка: ${error.message}`);
        }
    };
    
    return (
        <div>
            <header>
                <NavBar />
            </header>
            <div className="container">
                <h2>Создать маршрут</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Заголовок маршрута:</label>
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
                                checked={is_private}
                                onChange={() => setis_private(!is_private)}
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
        </div>
    );
};

export default CreateRoute;