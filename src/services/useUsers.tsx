import { callApi } from "./useApi";

const API_URL: string = "https://jsonplaceholder.typicode.com";

const getUsers = async () => {
    const url = `${API_URL}/users`;

    try {
        const responseData = await callApi(url, null, null, "GET");
        // console.log(responseData);
        return await responseData;
    } catch (error) {
        console.error(error);
    }
};

const getUser = async (id: unknown) => {
    const url = `${API_URL}/users/${id}`;

    try {
        const responseData = await callApi(url, null, null, "GET");
        // console.log(responseData);
        return await responseData;
    } catch (error) {
        console.error(error);
        throw new Error("Parameter NotFound");
    }
};

export { getUsers, getUser };
