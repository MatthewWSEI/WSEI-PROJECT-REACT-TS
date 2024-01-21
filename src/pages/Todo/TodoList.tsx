import { useState, useEffect, useRef, ChangeEvent } from "react";
import { TodoType } from "../../types/TodoType";
import { Link } from "react-router-dom";
import { UserType } from "../../types/UserType";
import { getUsers } from "../../services/useUsers";
import { getTodos } from "../../services/useTodos";

const TodoList = () => {
    const [searchText, setSearchText] = useState<string>("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setSearchText(event.target.value);
    };

    const [isLoading, setLoading] = useState<boolean>(true);

    const [data, setData] = useState<{
        todos: TodoType[];
        users: UserType[];
    }>({ todos: [], users: [] });

    const filteredTodos = data.todos.filter((todo) =>
        todo.title.toLowerCase().includes(searchText.toLowerCase()),
    );

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

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "50px";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [searchText]);

    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-full h-full bg-slate-700 rounded-lg py-[10px] px-[20px] ring-slate-900/5 shadow-lg text-white flex flex-col justify-center items-center mb-[10px]">
                <div className="w-full flex flex-row gap-1">
                    <div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    <textarea
                        className="w-full h-[1px] min-h-[50px] max-h-[300px] rounded-lg bg-slate-600 px-[20px] py-[10px]"
                        ref={textareaRef}
                        value={searchText}
                        onChange={handleChange}
                        placeholder="Write something"
                        style={{
                            resize: "none",
                        }}
                    />
                </div>
            </div>
            <div className="w-full h-[50px] flex justify-start  mb-1">
                <Link
                    className="w-fit flex flex-row items-center justify-start gap-1 text-white font-bold transition duration-700 ease-in-out bg-slate-600 hover:bg-slate-500 rounded-lg px-2 py-1"
                    to="TodoNew"
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
            </div>
            <div className="containerPosts">
                {isLoading ? (
                    <div className="w-full h-[100px] bg-slate-700 rounded-lg py-[10px] px-[20px] ring-slate-900/5 shadow-lg text-white flex justify-center items-center">
                        Loading...
                    </div>
                ) : (
                    filteredTodos.map((todo) => (
                        <div className="post postContainer__sb bg-slate-700" key={todo.id}>
                            <div className="w-full flex flex-col items-start  gap-1">
                                <div className="w-full h-[50px] flex flex-row justify-between items-center mb-2">
                                    <Link
                                        className="w-auto flex flex-row items-center gap-1"
                                        to={`/User/${data.users
                                            .filter((user) => user.id === todo.userId)
                                            .map((user) => user.id)}`}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="w-5 h-5"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>

                                        <div>
                                            {data.users
                                                .filter((user) => user.id === todo.userId)
                                                .map((user) => (
                                                    <div key={user.id}>{user.name}</div>
                                                ))}
                                        </div>
                                    </Link>
                                </div>
                                <div
                                    className={
                                        "w-fit px-[10px] py-[5px] rounded-md " +
                                        (todo.completed ? "bg-green-900" : "bg-red-900")
                                    }
                                >
                                    Completed
                                </div>
                                <div className="w-full flex flex-col items-start justify-start text-white gap-1 py-[10px]">
                                    <h1 className="text-xl">{todo.title}</h1>
                                </div>
                            </div>
                            {/* <Link className="link" to={`/Todo/${todo.id}`}>
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
                            </Link> */}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default TodoList;
