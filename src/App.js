// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Authorization from './components/Authorization';
import Register from './components/Register';
import TapeFeedPage from './components/TapeFeedPage';
import CreateRoute from './components/CreateRoute';
import Profile from './components/Profile';
import { UserProvider } from './context/UserContext';
import MainPage from "./components/MainPage";

const AppRouter = () => {
  return (
    <UserProvider> { }
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/routes" element={<TapeFeedPage />} />
          <Route path="/login" element={<Authorization />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/create" element={<CreateRoute />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default AppRouter;