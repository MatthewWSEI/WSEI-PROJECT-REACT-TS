import React from "react";
import ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
    Route
} from "react-router-dom";

import App from "./App";
import AppLayout from "./layouts/AppLayout";
import NotFound from "./pages/NotFound";
import "./assets/styles/index.scss";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<AppLayout />}>
            <Route path="/" element={<App />} />
            <Route path="*" element={<NotFound />} />
        </Route>
    )
);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
