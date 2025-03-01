import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/logo.jpg';
import './styleNavBar.css';

const NavBar = () => {
    const { userId } = useUser(); // Получаем userId из контекста
  
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="Логотип" width="40" height="40" className="d-inline-block align-text-top" />
          </Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Главная</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/routes">Маршруты</Link>
              </li>
              {userId && ( 
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/create">Создать маршрут</Link>
                  </li>
                </>
              )}
            </ul>
            <ul className="navbar-nav">
              {userId ? ( 
                <>
                <li className="nav-item">
                    <Link className="nav-link" to="/user">Профиль</Link>
                  </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/logout">Выйти</Link>
                </li>
                </>
              ) : ( 
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Войти</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signup">Регистрация</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
};

export default NavBar;