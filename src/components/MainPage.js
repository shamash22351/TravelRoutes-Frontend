import React from "react";
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styleMainPage.css';
import MapComponent from "./MapComponent";
import logo from "../assets/logo.jpg"
import kab from "../assets/kab.png"
const MainPage = () => {
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
            <section>
                <MapComponent />
            </section>
        </div>

    )
}
export default MainPage