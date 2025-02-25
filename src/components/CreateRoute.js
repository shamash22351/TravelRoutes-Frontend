// src/components/CreateRoute.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

const CreateRoute = () => { //Описание, превью, геолокация, кнопка - импортишь - создаешь сам(Название, описание, точка, компонент с точкой)
    return (
        <div className="container my-4">
            <h1 className="text-center mb-4">Создать маршрут</h1>
            <div className="card shadow">
                <div className="card-body">
                    <div className="mb-3">
                        <label htmlFor="inputRoute" className="form-label">Введите описание вашего маршрута</label>
                        <textarea id="inputRoute" className="form-control" rows="4" placeholder="Ваши заметки о маршруте..."></textarea>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <button className="btn btn-primary w-100">Создать маршрут</button>
                        </div>
                        <div className="col-lg-6">
                            <button className="btn btn-secondary w-100">Отмена</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateRoute;