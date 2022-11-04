import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { FavouritesContextPrvider } from "./store/favourite-context";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <FavouritesContextPrvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </FavouritesContextPrvider>
);
