import { callApi } from "./useApi";

const API_URL: string = "https://jsonplaceholder.typicode.com";

const getComments = async (
    onSuccess: (data: any) => void,
    onError: (error: any) => void
) => {
    const url = `${API_URL}/comments`;

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

export{getComments};