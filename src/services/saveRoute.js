const saveRoute = async (route) => {
    const response = await fetch('', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(route),
    });
    
    if (response.ok) {
        const data = await response.json();
        console.log('Маршрут успешно сохранен', data);
    } else {
        console.error('Ошибка при сохранении маршрута');
    }
};