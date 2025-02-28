import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Authorization from './components/Authorization';
import Register from './components/Register';
import TapeFeedPage from './components/TapeFeedPage';
import CreateRoute from './components/CreateRoute';
import Profile from './components/Profile';
import Logout from './components/Logout';
import MainPage from "./components/MainPage";
import RouteDetails from './components/RouteDetails';

import { UserProvider } from './context/UserContext';

const AppRouter = () => {
    return (
        <UserProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/routes/:id" element={<RouteDetails />} />
                    <Route path="/user" element={<Profile />} />
                    <Route path="/routes" element={<TapeFeedPage />} />
                    <Route path="/login" element={<Authorization />} />
                    <Route path="/signup" element={<Register />} />
                    <Route path="/create" element={<CreateRoute />} />
                    <Route path="/logout" element={<Logout />} /> 
                </Routes>
            </Router>
        </UserProvider>
    );
};

export default AppRouter;
