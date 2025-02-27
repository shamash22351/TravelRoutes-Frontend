import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styleMainPage.css';
import logo from '../assets/logo.jpg';
import kab from '../assets/kab.png';
import heart from '../assets/heart.svg';
import komm from '../assets/chat-square.svg';
import heartFilled from '../assets/heart-fill.svg';

const TapeFeedPage = () => {
    const [liked, setLiked] = useState(false);

    const handleLikeClick = () => {
        setLiked(!liked);
    };

    return (
        <div>
            <header>
                <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">
                            <img src={logo} alt="Логотип" className='img-class-cl' />
                        </Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link active" to="/">Главная</Link>
                                </li>
                                <li>
                                    <Link className='nav-link' to="/routes">Маршруты</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/create">Создать маршрут</Link>
                                </li>
                            </ul>
                            <div className="d-flex justify-content-center">
                                <div className="input-group w-75">
                                    <span className="input-group-text bg-white text-black border-secondary">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="black" className="bi bi-search" viewBox="0 0 16 16">
                                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001a1 1 0 0 0 .058.07l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.07-.058zm-5.44.656a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z" />
                                        </svg>
                                    </span>
                                    <input type="text" className="form-control bg-white text-black border-secondary fs-5 py-2" placeholder="Поиск..." />
                                </div>
                            </div>
                            <div className="dropdown">
                                <button className="menu-btn btn">
                                    <img src={kab} alt="Меню" className='img-class' />
                                </button>
                                <div className="dropdown-content">
                                    <Link to="/Profile">Профиль</Link>
                                    <Link to="/Logout">Выйти</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>

            <section className="post-section">
                <div className="container">
                    <div className="row d-flex justify-content-center">
                        <div className="col-lg-8">
                            <div className="card post-card mx-auto">
                                <Link to="/route">
                                    <div style={{ position: 'relative', overflow: 'hidden' }}>
                                        <iframe
                                            src="https://yandex.ru/map-widget/v1/?ll=86.382558%2C52.546487&mode=routes&rtext=48.447651%2C135.097840~55.774034%2C37.651587&rtt=auto&ruri=~ymapsbm1%3A%2F%2Forg%3Foid%3D224760168580&z=3.92"
                                            frameBorder="0" allowFullScreen={true}
                                            className="mapa-yandex">
                                        </iframe>
                                    </div>
                                </Link>
                                <div className="card-body">
                                    <h5 className="card-title">ТЕМА</h5>
                                    <p className="card-text">
                                        ААААААААААААААААААААААААААААААААААА...
                                    </p>
                                    <div className="d-flex align-items-center">
                                        <button className="heart border-0 bg-transparent d-flex align-items-center me-2"
                                            onClick={handleLikeClick}>
                                            <img src={liked ? heartFilled : heart} alt="Сердце" />
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

            <footer className="footer">
                <div className="container text-center">
                    <p>© 2024 Пудж.</p>
                </div>
            </footer>
        </div>
    );
};

export default TapeFeedPage;
