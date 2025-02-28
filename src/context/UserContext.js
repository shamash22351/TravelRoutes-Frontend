import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);
    const [update, setUpdate] = useState(false); // Добавлено состояние для обновления

    const changeUserId = (id) => {
        setUserId(id);
        setUpdate(prev => !prev); // Переключаем состояние для обновления
    };

    return (
        <UserContext.Provider value={{ userId, setUserId: changeUserId }}>
            {children}
        </UserContext.Provider>
    );
};

const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

export { UserProvider, useUser };
