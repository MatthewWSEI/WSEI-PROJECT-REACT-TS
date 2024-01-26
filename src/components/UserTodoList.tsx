import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TodoType } from "../types/TodoType";
import { UserType } from "../types/UserType";
import { getTodos } from "../services/useTodos";
import { getUsers } from "../services/useUsers";
import Loading from "./Loading";
import TodoCard from "./TodoCard";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addTodo } from "../store/actions";

type MyParams = {
    id: "";
};

interface State {
    todos: TodoType[];
    users: UserType[];
}

const UserTodoList = () => {
    const globalState = useSelector((state: State) => state);
    const dispatch = useDispatch();
    const { id } = useParams<MyParams>();
    const numberId = Number(id);
    const [isLoading, setLoading] = useState<boolean>(true);

    const [data, setData] = useState<{
        todos: TodoType[];
        users: UserType[] | UserType;
    }>({ todos: [], users: [] });

    useEffect(() => {
        if (isLoading) {
            setLoading(true);
            Promise.all([getTodos(), getUsers()])
                .then(([todos, users]) => {
                    setData({ todos, users });
                    dispatch(addTodo(todos));

                })
                .catch((error) => {
                    const foundTodo = globalState.todos.filter(
                        (todo: TodoType) => todo.userId === numberId,
                    );
                    const foundUser = globalState.users.find(
                        (user: UserType) => user.id === numberId,
                    );
                    if (foundTodo && foundUser) {
                        setData({ todos: foundTodo, users: foundUser });
                    }
                    console.log(error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [isLoading]);

    const filteredTodos = globalState.todos.filter((todo) => todo.userId === numberId);

    const deleteTodo = (id: number) => {
        const newArrayWithoutRemovedItem = globalState.todos.filter(
            (task: TodoType) => task.id !== id,
        );
        dispatch(addTodo(newArrayWithoutRemovedItem));
        console.log(newArrayWithoutRemovedItem);
    };

    const changeStatus = (id: number) => {
        const updatedTodos = globalState.todos.map((task: TodoType) =>
            task.id === id ? { ...task, completed: !task.completed } : task,
        );
        dispatch(addTodo(updatedTodos));
    };

    return (
        <div>
            {isLoading ? (
                <Loading />
            ) : (
                <div className="containerPosts">
                    {filteredTodos.map((todo) => (
                        <TodoCard
                            key={todo.id}
                            todo={todo}
                            data={globalState}
                            deleteTodo={deleteTodo}
                            changeStatus={changeStatus}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserTodoList;
