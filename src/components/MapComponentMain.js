import React, { useEffect, useState } from "react";
import { YMaps, Map, Placemark, GeolocationControl, SearchControl, RouteButton, RoutePanel } from "react-yandex-maps";

const MapComponent = () => {
    const [userLocation, setUserLocation] = useState(null); // Координаты пользователя
    const [places, setPlaces] = useState([]); // Список мест рядом

    // Получаем текущее местоположение пользователя
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation([latitude, longitude]);
                },
                (error) => {
                    console.error("Ошибка при получении геолокации:", error);
                }
            );
        } else {
            console.error("Геолокация не поддерживается вашим браузером.");
        }
    }, []);

    // Поиск мест рядом с пользователем
    useEffect(() => {
        if (userLocation) {
            const ymaps = window.ymaps;

            ymaps.ready(() => {
                // Используем API Яндекс.Геокодера для поиска мест
                ymaps.geocode(userLocation, { kind: "locality" }).then((res) => {
                    const firstGeoObject = res.geoObjects.get(0);
                    const cityName = firstGeoObject.getLocalities()[0]; // Название города

                    // Поиск мест рядом (например, кафе)
                    ymaps.geocode(cityName, { kind: "biz" }).then((result) => {
                        const places = result.geoObjects.toArray();
                        setPlaces(places);
                    });
                });
            });
        }
    }, [userLocation]);

    return (
        <YMaps query={{ apikey: "267fc93d-9157-4589-beac-453c6fda3041" }}>
            <Map
                defaultState={{ center: userLocation || [55.75, 37.57], zoom: 12 }}
                width="100%"
                height="900px"
            >
                {/* Отображение местоположения пользователя */}
                {userLocation && <Placemark geometry={userLocation} />}

                {/* Отображение мест рядом */}
                {places.map((place, index) => (
                    <Placemark
                        key={index}
                        geometry={place.geometry.getCoordinates()}
                        properties={{
                            balloonContent: place.getAddress(),
                        }}
                    />
                ))}

                {/* Элементы управления картой */}
                <GeolocationControl options={{ float: "left" }} />
                <SearchControl options={{ float: "right", provider: "yandex#search" }} />
                <RouteButton options={{ float: "right" }} />
                <RoutePanel options={{ float: "right" }} />
            </Map>
        </YMaps>
    );
};

export default MapComponent;