import { callApi } from "./useApi";

const API_URL: string = "https://jsonplaceholder.typicode.com";

const getPhotos = async (
) => {
    const url = `${API_URL}/photos`;

    try {
        const responseData = await callApi(url, null, null, "GET");
        // console.log(responseData);
        return await responseData;
    } catch (error) {
        console.error(error);
    }
};

export { getPhotos };
