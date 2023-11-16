// import { lazy } from "react";
import {
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
    Route,
} from "react-router-dom";
import AppLayout from "./layouts/AppLayout/AppLayout";

import Posts from "./pages/Posts";
import Todo from "./pages/Todo";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import PostsLayout from "./layouts/PostLayout";

// const Posts = lazy(() => import("./pages/Posts"));
// const Todo = lazy(() => import("./pages/Todo"));
// const Profile = lazy(() => import("./pages/Profile"));

const App = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<AppLayout />}>
                <Route index element={<Posts />} />
                <Route path="Post/:id" element={<PostsLayout />}>
                    <Route index element={<p>Post</p>} />
                    <Route path="Edit" element={<p>Post</p>} />
                </Route>
                <Route path="/Todo" element={<Todo />} />
                <Route path="/Profile" element={<Profile />} />
                <Route path="*" element={<NotFound />} />
            </Route>,
        ),
    );
    return <RouterProvider router={router} />;
};

export default App;
