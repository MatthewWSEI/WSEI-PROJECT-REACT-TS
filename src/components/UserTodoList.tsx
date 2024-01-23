import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TodoType } from "../types/TodoType";
import { UserType } from "../types/UserType";
import { getTodos } from "../services/useTodos";
import { getUsers } from "../services/useUsers";
import Loading from "./Loading";
import TodoCard from "./TodoCard";

type MyParams = {
    id: "";
};

const UserTodoList = () => {
    const { id } = useParams<MyParams>();
    const numberId = Number(id);
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

    const filteredTodos = data.todos.filter((todo) => todo.userId === numberId);

    return (
        <div>
            {isLoading ? (
                <Loading />
            ) : (
                <div className="containerPosts">
                    {filteredTodos.map((todo) => (
                        <TodoCard key={todo.id} todo={todo} data={data} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserTodoList;
