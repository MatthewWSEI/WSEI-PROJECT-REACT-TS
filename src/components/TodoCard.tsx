import React from "react";
import { TodoType } from "../types/TodoType";
import { UserType } from "../types/UserType";
import { Link } from "react-router-dom";

type TodoCardProps = {
    todo: TodoType;
    data: {
        todos: TodoType[];
        users: UserType[];
    };
    deleteTodo: (postId: number) => void;
    changeStatus: (postId: number) => void;
};

const TodoCard: React.FC<TodoCardProps> = ({ todo, data, deleteTodo, changeStatus }) => {
    return (
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
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4 cursor-pointer"
                        onClick={() => deleteTodo(todo.id)}
                    >
                        <path
                            fillRule="evenodd"
                            d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
                <div
                onClick={()=>changeStatus(todo.id)}
                    className={
                        "w-fit px-[10px] py-[5px] rounded-md cursor-pointer " +
                        (todo.completed ? "bg-green-900" : "bg-red-900")
                    }
                >
                    {todo.completed ? "completed":"uncompleted"}
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
    );
};

export default TodoCard;
