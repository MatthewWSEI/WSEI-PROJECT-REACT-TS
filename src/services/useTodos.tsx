import { callApi } from "./useApi";
import { TodoType } from "../types/TodoType";
const API_URL: string = "https://jsonplaceholder.typicode.com";

const getTodos = async (
    onSuccess: (data: TodoType[]) => void,
    onError: (error: unknown) => void
) => {
    const url = `${API_URL}/todos`;

    try {
        const responseData = await callApi(
            url,
            null,
            null,
            "GET"
        );
        onSuccess(responseData);
        console.log(responseData);
    } catch (error) {
        onError(error);
    }
};

export{getTodos};