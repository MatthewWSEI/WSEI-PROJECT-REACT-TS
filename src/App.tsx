// import { lazy } from "react";
import {
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
    Route,
} from "react-router-dom";
import AppLayout from "./layouts/AppLayout/AppLayout";

import PostLayout from "./layouts/PostLayout";
import Posts from "./pages/Posts/Posts";
import Post from "./pages/Posts/View/Post";
import PostEdit from "./pages/Posts/View/PostEdit";
import PostNew from "./pages/Posts/View/PostNew";

import TodoLayout from "./layouts/TodoLayout";
import TodoList from "./pages/Todo/TodoList";
import Todo from "./pages/Todo/View/Todo";
import TodoEdit from "./pages/Todo/View/TodoEdit";
import TodoNew from "./pages/Todo/View/TodoNew";

import UserLayout from "./layouts/UserLayout";
import Users from "./pages/Users/Users";
import User from "./pages/Users/View/User";
import UserPostsList from "./components/UserPostsList";
import UserAlbumsList from "./components/UserAlbumsList";
import UserTodoList from "./components/UserTodoList";

import AlbumsLayout from "./layouts/AlbumsLayout";
import Albums from "./pages/Albums/Albums";
import Album from "./pages/Albums/View/Album";
import AlbumNew from "./pages/Albums/View/AlbumNew";

import NotFound from "./pages/NotFound";
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
                <Route path="Post/" element={<PostLayout />}>
                    <Route path="NewPost" element={<PostNew />} />
                </Route>

                <Route path="/Todos" element={<TodoList />} />
                <Route path="Todo/:id" element={<TodoLayout />}>
                    <Route index element={<Todo />} />
                    <Route path="Edit" element={<TodoEdit />} />
                </Route>
                <Route path="Todo/" element={<TodoLayout />}>
                    <Route path="NewTodo" element={<TodoNew />} />
                </Route>

                <Route path="/Users" element={<Users />} />
                <Route path="User/:id" element={<UserLayout />}>
                    <Route index element={<User />} />
                    <Route path="Edit" element={<div>Edit</div>} />
                    <Route path="Posts" element={<User />}>
                        <Route index element={<UserPostsList />} />
                    </Route>
                    <Route path="Albums" element={<User />}>
                        <Route index element={<UserAlbumsList />} />
                    </Route>
                    <Route path="Todo" element={<User />}>
                        <Route index element={<UserTodoList />} />
                    </Route>
                </Route>
                <Route path="User/" element={<UserLayout />}>
                    <Route path="NewUser" element={<div>UserNew</div>} />
                </Route>

                <Route path="/Albums" element={<Albums />} />
                <Route path="Album/:id" element={<AlbumsLayout />}>
                    <Route index element={<Album />} />
                    <Route path="Edit" element={<TodoEdit />} />
                </Route>
                <Route path="Album/" element={<AlbumsLayout />}>
                    <Route path="NewAlbum" element={<AlbumNew />} />
                </Route>

                <Route path="*" element={<NotFound />} />
            </Route>,
        ),
    );
    return <RouterProvider router={router} />;
};

export default App;
