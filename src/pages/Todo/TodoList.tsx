import { useState, useEffect, useRef, ChangeEvent } from "react";
import { TodoType } from "../../types/TodoType";
// import { Link } from "react-router-dom";
import { UserType } from "../../types/UserType";
import { getUsers } from "../../services/useUsers";
import { getTodos } from "../../services/useTodos";
import Loading from "../../components/Loading";
import TodoCard from "../../components/TodoCard";
import { addTodo } from "../../store/actions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

interface State {
    todos: TodoType[];
    users: UserType[];
}
const TodoList = () => {
    const globalState = useSelector((state: State) => state);
    const dispatch = useDispatch();
    const [searchText, setSearchText] = useState<string>("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setSearchText(event.target.value);
    };
    const [task, setTask] = useState<TodoType>({
        id: null,
        title: "",
        completed: false,
        userId: null,
    });
    const [isLoading, setLoading] = useState<boolean>(true);

    const [data, setData] = useState<{
        todos: TodoType[];
        users: UserType[];
    }>({ todos: [], users: [] });

    const filteredTodos = globalState.todos.filter((todo) =>
        todo.title.toLowerCase().includes(searchText.toLowerCase()),
    );

    const handleChangeTodo = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const { name, value } = event.target;
        setTask((prevState) => ({ ...prevState, [name]: value }));
    };

    useEffect(() => {
        if (isLoading) {
            setLoading(true);
            Promise.all([getTodos(), getUsers()])
                .then(([todos, users]) => {
                    setData({ todos, users });
                    dispatch(addTodo(todos));
                    // dispatch(addTodo(users));
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
        if (!isLoading) {
            console.log(globalState);
        }
        if ( globalState.todos.length === 0) {
            setLoading(false);
        }
    }, [isLoading]);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "50px";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [searchText]);

    const generateRandomInteger = (min: number, max: number): number => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const addNewTask = () => {
        const id = generateRandomInteger(999, 10000);
        const todosGet = globalState.todos;
        const initialTask: TodoType = {
            id: id,
            title: task.title,
            completed: false,
            userId: 13636,
        };
        const newTodos: TodoType[] | TodoType = [...todosGet, initialTask];
        dispatch(addTodo(newTodos));
    };

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
            <div className="w-full min-h-[50px] flex justify-start bg-slate-700 mb-1 py-[10px] px-[20px] gap-1 text-white rounded-lg">
                <textarea
                    className="w-full h-[1px] min-h-[50px] max-h-[300px] rounded-lg bg-slate-600 px-[20px] py-[10px]"
                    ref={textareaRef}
                    value={task.title}
                    name="title"
                    onChange={handleChangeTodo}
                    placeholder="New task"
                    style={{
                        resize: "none",
                    }}
                />
                <button
                    className="w-fit h-[50px] flex flex-row items-center justify-start gap-1  font-bold transition duration-700 ease-in-out bg-slate-600 hover:bg-slate-500 rounded-lg px-2 py-1"
                    onClick={addNewTask}
                    // to="/Todo/NewTodo"
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
                </button>
            </div>
            <div className="containerPosts">
                {isLoading ? (
                    <Loading />
                ) : (
                    filteredTodos.map((todo) => (
                        <TodoCard key={todo.id} todo={todo} data={globalState} />
                    ))
                )}
            </div>
        </div>
    );
};

export default TodoList;
