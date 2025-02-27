// src/components/LocationModal.js
import React, { useState } from 'react';
import LocationForm from './LocationForm';
import MapComponent from './MapComponent';
import { Modal, Button } from 'react-bootstrap';

const LocationModal = ({ show, onHide, onAddLocation }) => {
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    const handleLocationSelect = (lat, lng) => {
        setLatitude(lat);
        setLongitude(lng);
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Добавить место</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <MapComponent onLocationSelect={handleLocationSelect} />
                <LocationForm
                    show={true}
                    onHide={onHide}
                    onAddLocation={({ latitude, longitude }) => {
                        onAddLocation({ latitude, longitude });
                        setLatitude('');
                        setLongitude('');
                        onHide();
                    }}
                />
            </Modal.Body>
        </Modal>
    );
};

export default LocationModal;