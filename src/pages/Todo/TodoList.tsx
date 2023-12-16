import { useState, useEffect } from "react";
import { TodoType } from "../../types/TodoType";
import { Link } from "react-router-dom";
import { UserType } from "../../types/UserType";
import { getUsers } from "../../services/useUsers";
import { getTodos } from "../../services/useTodos";

const TodoList = () => {
    const [isLoading, setLoading] = useState<boolean>(true);

    const [data, setData] = useState<{
        todos: TodoType[];
        users: UserType[];
    }>({ todos: [], users: [] });

    useEffect(() => {
        if (isLoading) {
            setLoading(true);
            Promise.all([getTodos(), getUsers()])
                .then(([todos, users]) => {
                    setData({ todos, users });
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [isLoading]);

    return (
        <div className="w-full flex flex-col">
            <Link
                className="w-fit flex flex-row items-center gap-1 text-white font-bold transition duration-700 ease-in-out hover:bg-slate-500 rounded-lg px-2 py-1 mb-1"
                to="/Todos"
            >
                <div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4"
                    >
                        <path
                            fillRule="evenodd"
                            d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
                <div>Add</div>
            </Link>
            {isLoading ? (
                <div className="w-full h-[100px] bg-slate-700 rounded-lg py-[10px] px-[20px] ring-slate-900/5 shadow-lg text-white flex justify-center items-center">
                    Loading...
                </div>
            ) : (
                data.todos.map((todo) => (
                    <div className="post post--animation postFlex postContainer__sb bg-slate-700" key={todo.id}>
                        <div className="texts">
                            <div className="w-full flex flex-row items-start text-white gap-1">
                                <div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="w-4 h-4"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    {data.users
                                        .filter((user) => user.id === todo.userId)
                                        .map((user) => (
                                            <div key={user.id}>{user.name}</div>
                                        ))}
                                </div>
                            </div>
                            <div className="w-full flex flex-col items-start justify-start text-white gap-1 px-[20px] py-[10px]">
                                <h1 className="text-2xl">{todo.title}</h1>
                                <div
                                    className={
                                        "px-[20px] py-[10px] rounded-lg " +
                                        (todo.completed ? "bg-green-900" : "bg-red-900")
                                    }
                                >
                                    Completed
                                </div>
                            </div>
                        </div>
                        <Link
                            className="link"
                            to={`/Todo/${todo.id}`}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-5 h-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                                />
                            </svg>
                        </Link>
                    </div>
                ))
            )}
        </div>
    );
};

export default TodoList;
