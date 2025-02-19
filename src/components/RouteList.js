import React from 'react';
import { useRouteContext } from './RouteContext';

const RouteList = () => {
    const { routes } = useRouteContext();

    return (
        <div>
            <h2>Список маршрутов</h2>
            {routes.map(route => (
                <div key={route.id}>
                    <h3>{route.title}</h3>
                    <p>{route.description}</p>
                    <img src={route.imageUrl} alt={route.title} width="200" />
                    <h4>История изменений</h4>
                    {route.history.map((entry, index) => (
                        <div key={index}>
                            <p>{entry.description}</p>
                            <small>{new Date(entry.timestamp).toLocaleString()}</small>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default RouteList;