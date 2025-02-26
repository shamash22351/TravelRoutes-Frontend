import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styleMainPage.css';
import logo from "../assets/logo.jpg"
import kab from "../assets/kab.png"
import heart from "../assets/heart.svg"
import komm from "../assets/chat-square.svg"
const TapeFeedPage = () => {
    return (
        <div className="bg-light">
            <header>
                <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">
                            <img src={logo} alt="Логотип" />
                        </Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/">Главная</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/create">Создать маршрут</Link>
                                </li>
                            </ul>
                            <div className="d-flex justify-content-center mt-0">
                                <div className="input-group w-75">
                                    <span className="input-group-text bg-white text-black border-secondary">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="black" className="bi bi-search" viewBox="0 0 16 16">
                                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001a1 1 0 0 0 .058.07l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.07-.058zm-5.44.656a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z" />
                                        </svg>
                                    </span>
                                    <input type="text" className="form-control bg-white text-black border-secondary fs-5 py-2" placeholder="Поиск..." aria-label="Поле поиска" />
                                </div>
                            </div>
                            <div className="dropdown">
                                <button className="menu-btn btn">
                                    <img src={kab} alt="Меню" className='menu-imgg' />
                                </button>
                                <div className="dropdown-content">
                                    <Link aria-current="page" to="/Profile">Профиль</Link>
                                    <Link aria-current="page" to="/Logout">Выйти</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
            <section className="my-4">
                <div className="container-fluid-flu">
                    <div className="row justify-content-center">
                        <div className="col-lg-6 col-md-8 col-sm-10 mx-auto">  {/* Контейнер с меньшей шириной */}
                            <div className="card shadow-sm mb-4">
                                <Link to="/route">
                                    <div style={{ position: 'relative', overflow: 'hidden' }}>
                                        <a href="https://yandex.ru/maps?utm_medium=mapframe&utm_source=maps"
                                            style={{ color: '#eee', fontSize: '12px', position: 'absolute', top: '0' }}>
                                            Яндекс Карты
                                        </a>
                                        <iframe
                                            src="https://yandex.ru/map-widget/v1/?ll=86.382558%2C52.546487&mode=routes&rtext=48.447651%2C135.097840~55.774034%2C37.651587&rtt=auto&ruri=~ymapsbm1%3A%2F%2Forg%3Foid%3D224760168580&z=3.92"
                                            frameBorder="0" allowFullScreen="true"
                                            style={{ width: '100%', height: '200px' }} className="mapa-yandex">
                                        </iframe>
                                    </div>
                                </Link>
                                <div className="card-body">
                                    <h5 className="card-title">ТЕМА</h5>
                                    <p className="card-text">
                                        ААААААААААААААААААААААААААААААААААА...
                                    </p>
                                    <div className="d-flex align-items-center justify-content-start">
                                        <button className="heart border-0 bg-transparent d-flex align-items-center me-2" style={{ cursor: 'pointer' }}>
                                            <img id="heart-id" src={heart} alt="Сердце" />
                                        </button>
                                        <Link to="/comm">
                                            <img src={komm} alt="Комментарии" width="20" height="20" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="bg-white py-3 mt-4 shadow-sm">
                <div className="container text-center">
                    <p className="mb-0">© 2024 Пудж.</p>
                </div>
            </footer>
        </div>
    );
};

export default TapeFeedPage;