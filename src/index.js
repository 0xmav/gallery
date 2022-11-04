import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { FavouritesContextProvider } from "./store/favourite-context";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <FavouritesContextProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </FavouritesContextProvider>
);
