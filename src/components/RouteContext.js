import React, { createContext, useState, useContext } from 'react';

const RouteContext = createContext();

export const RouteProvider = ({ children }) => {
    const [routes, setRoutes] = useState([]);

    const addOrUpdateRoute = (newRoute) => {
        setRoutes((prevRoutes) => {
            const existingRouteIndex = prevRoutes.findIndex(route => route.id === newRoute.id);
            if (existingRouteIndex > -1) {
                const updatedRoute = {
                    ...prevRoutes[existingRouteIndex],
                    ...newRoute,
                    history: [
                      ...prevRoutes[existingRouteIndex].history,
                      { ...newRoute, timestamp: new Date().toISOString() }
                    ]
                };
                return [
                    ...prevRoutes.slice(0, existingRouteIndex),
                    updatedRoute,
                    ...prevRoutes.slice(existingRouteIndex + 1)
                ];
            }
            return [...prevRoutes, { ...newRoute, history: [{ ...newRoute, timestamp: new Date().toISOString() }] }];
        });
    };

    return (
        <RouteContext.Provider value={{ routes, addOrUpdateRoute }}>
            {children}
        </RouteContext.Provider>
    );
};

export const useRouteContext = () => {
    return useContext(RouteContext);
};