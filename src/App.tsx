// import { lazy } from "react";
import {
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
    Route,
} from "react-router-dom";
import AppLayout from "./layouts/AppLayout/AppLayout";

import Posts from "./pages/Posts/Posts";
import PostLayout from "./layouts/PostLayout";
import Post from "./pages/Posts/View/Post";
import PostEdit from "./pages/Posts/View/PostEdit";
import PostNew from "./pages/Posts/View/PostNew";

import TodoList from "./pages/Todo/TodoList";
import TodoLayout from "./layouts/TodoLayout";
import Todo from "./pages/Todo/View/Todo";
import TodoEdit from "./pages/Todo/View/TodoEdit";

import Users from "./pages/Users/Users";
import UserLayout from "./layouts/UserLayout";

import NotFound from "./pages/NotFound";
import User from "./pages/Users/View/User";
import UserPostsList from "./components/UserPostsList";
import UserAlbumsList from "./components/UserAlbumsList";
import UserTodoList from "./components/UserTodoList";
// const Posts = lazy(() => import("./pages/Posts"));
// const Todo = lazy(() => import("./pages/Todo"));
// const Profile = lazy(() => import("./pages/Profile"));

const App = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<AppLayout />}>
                <Route index element={<Posts />} />
                <Route path="Post/:id" element={<PostLayout />}>
                    <Route index element={<Post />} />
                    <Route path="Edit" element={<PostEdit />} />
                </Route>
                <Route path="PostNew" element={<PostNew />} />

                <Route path="/Todos" element={<TodoList />} />
                <Route path="Todo/:id" element={<TodoLayout />}>
                    <Route index element={<Todo />} />
                    <Route path="Edit" element={<TodoEdit />} />
                </Route>

                <Route path="/Users" element={<Users />} />
                <Route path="User/:id" element={<UserLayout />}>
                    <Route index element={<User />} />
                    <Route path="Posts" element={<User />}>
                        <Route index element={<UserPostsList />} />
                    </Route>
                    <Route path="Albums" element={<User />}>
                        <Route index element={<UserAlbumsList />} />
                    </Route>
                    <Route path="Todo" element={<User />}>
                        <Route index element={<UserTodoList />} />
                    </Route>

                    <Route path="Edit" element={<div>Edit</div>} />
                </Route>

                <Route path="*" element={<NotFound />} />
            </Route>,
        ),
    );
    return <RouterProvider router={router} />;
};

export default App;
