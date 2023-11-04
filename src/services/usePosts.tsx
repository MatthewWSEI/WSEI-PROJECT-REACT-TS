import { callApi } from "./useApi";
import { PostType } from "../types/PostType";

const API_URL: string = "https://jsonplaceholder.typicode.com";

const getPosts = async (
    onSuccess: (data: PostType[]) => void,
    onError: (error: unknown) => void
) => {
    const url = `${API_URL}/posts`;

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

export{getPosts};