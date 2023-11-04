import { UserType } from "../types/UserType";
import { callApi } from "./useApi";

const API_URL: string = "https://jsonplaceholder.typicode.com";

const getUsers = async (
    onSuccess: (data: UserType[]) => void,
    onError: (error: unknown) => void
) => {
    const url = `${API_URL}/users`;

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

export{getUsers};