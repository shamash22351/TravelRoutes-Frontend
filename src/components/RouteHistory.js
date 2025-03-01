import React, { useEffect, useState } from 'react';

const RouteHistory = ({ user_id }) => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/history_routes/${user_id}/`);
                if (!response.ok) throw new Error('Не удалось загрузить историю изменений');
                const data = await response.json();
                setHistory(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, [user_id]);

    if (loading) return <div>Загрузка истории изменений...</div>;
    if (error) return <div className="text-danger">{error}</div>;

    return (
        <div className="mt-4">
            <h5>История изменений:</h5>
            <ul className="list-group">
                {history.map((change, index) => (
                    <li key={index} className="list-group-item">
                        <div>
                            <strong>Дата изменения:</strong> {new Date(change.history_date).toLocaleString()}
                        </div>
                        <div>
                            <strong>Изменения:</strong>
                            <pre>{JSON.stringify(change.changes, null, 2)}</pre>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RouteHistory;