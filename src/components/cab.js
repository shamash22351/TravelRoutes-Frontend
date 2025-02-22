import React from "react";
import RouteForm from './RouteForm.js'
const cab = () => {
    const handleClick = () => {
        <RouteForm />
    }
    return (
        <div>
            <head>
                <meta charset="UTF-8"></meta>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
                <title>Document</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
                    integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous"></link>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
                    integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"
                    defer></script>
                <link rel="stylesheet" href="style.css"></link>
            </head>
            <body>
                <header>
                    <nav class="navbar navbar-expand-lg bg-body-tertiary">
                        <div class="container-fluid">
                            <a class="navbar-brand"><img src="../assets/logo2.png" alt="Logo"></img></a>
                            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li class="nav-item">
                                        <a class="nav-link active" aria-current="page" href="MainPage.html">Главная</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" OnClick="{handleClick}">Создать Маршрут</a>
                                    </li>
                                </ul>
                                <div class="d-flex justify-content-center mt-0">
                                    <div class="input-group w-75">
                                        <span class="input-group-text bg-white text-black border-secondary">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="black" class="bi bi-search" viewBox="0 0 16 16">
                                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001a1 1 0 0 0 .058.07l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.07-.058zm-5.44.656a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z" />
                                            </svg>
                                        </span>
                                        <input type="text" class="form-control bg-white text-black border-secondary fs-5 py-2" placeholder="Поиск..." aria-label="Поле поиска"></input>
                                    </div>
                                </div>

                                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
                                <div class="dropdown">
                                    <button class="menu-btn">
                                        <img src="../assets/kab.png" alt="Меню"></img>
                                    </button>
                                    <div class="dropdown-content">
                                        <a href="https://www.google.com" target="_blank">text</a>
                                        <a href="https://www.openai.com" target="_blank">text2</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                </header>
            </body>
        </div >
    )
}
export default cab