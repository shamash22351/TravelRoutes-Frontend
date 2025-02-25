// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Authorization from './components/Authorization';
import Register from './components/Register';
import TapeFeedPage from './components/TapeFeedPage';
import CreateRoute from './components/CreateRoute'; // Импортируем новый компонент
import MainPage from './components/MainPage'
import MapComponent from './components/MapComponent';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path='/Map' element={<MapComponent />} />
        <Route path='/' element={<MainPage />} />
        <Route path="/routes" element={<TapeFeedPage />} />
        <Route path="/login" element={<Authorization />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/create" element={<CreateRoute />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;