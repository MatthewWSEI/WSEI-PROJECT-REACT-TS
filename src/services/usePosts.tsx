import { callApi } from "./useApi";

const API_URL: string = "https://jsonplaceholder.typicode.com";

const getPosts = async () => {
    const url = `${API_URL}/posts`;

    try {
        const responseData = await callApi(url, null, null, "GET");
        // console.log(responseData);
        return await responseData;
    } catch (error) {
        // console.error(error);
        throw new Error("Posts NotFound");
    }
};

const getPost = async (id: unknown) => {
    const url = `${API_URL}/posts/${id}`;

    try {
        const responseData = await callApi(url, null, null, "GET");
        // console.log(responseData);
        return await responseData;
    } catch (error) {
        // console.error(error);
        throw new Error("Post NotFound");
    }
};

export { getPosts, getPost };
