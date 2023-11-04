import { lazy } from "react";
import {
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
    Route,
} from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import NotFound from "./pages/NotFound";

const Posts = lazy(() => import("./pages/Posts"));

const App = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<AppLayout />}>
                <Route path="/" element={<Posts />} />
                <Route path="*" element={<NotFound />} />
            </Route>,
        ),
    );
    return <RouterProvider router={router} />;
};

export default App;
