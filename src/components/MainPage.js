import React from "react";
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styleMainPage.css';
import MapComponentMain from "./MapComponentMain";
import logo from "../assets/logo.jpg";
import kab from "../assets/kab.png";
import NavBar from './NavBar';

const MainPage = () => {
    return (
        <div className="bg-light">
            <header>
                <NavBar />
            </header>
            <div className="map-container">
                <MapComponentMain />
            </div>
        </div>
    );
};

export default MainPage;