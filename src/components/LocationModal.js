// src/components/LocationModal.js
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import MapComponent from './MapComponent';
import 'bootstrap/dist/css/bootstrap.min.css'; 

const LocationModal = ({ show, onHide, onAddLocation }) => {
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    const handleLocationSelect = (lat, lng) => {
        setLatitude(lat);
        setLongitude(lng);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (latitude && longitude) {
            onAddLocation({ latitude: parseFloat(latitude), longitude: parseFloat(longitude) });
            setLatitude('');
            setLongitude('');
            onHide();
        }
    };

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Выберите местоположение</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <MapComponent onLocationSelect={handleLocationSelect} />
                <Form onSubmit={handleFormSubmit} style={{ marginTop: '20px' }}>
                    <Form.Group controlId="latitude">
                        <Form.Label>Широта</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Введите широту"
                            value={latitude} 
                            onChange={(e) => setLatitude(e.target.value)} 
                            style={{ marginBottom: '10px' }} 
                        />
                    </Form.Group>
                    <Form.Group controlId="longitude">
                        <Form.Label>Долгота</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Введите долготу"
                            value={longitude} 
                            onChange={(e) => setLongitude(e.target.value)} 
                            style={{ marginBottom: '10px' }} 
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" style={{ marginRight: '10px' }}>
                        Добавить местоположение
                    </Button>
                    <Button variant="secondary" onClick={onHide}>
                        Закрыть
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default LocationModal;