import { callApi } from "./useApi";

const API_URL: string = "https://jsonplaceholder.typicode.com";

const getAlbums = async () => {
    const url = `${API_URL}/albums`;

    try {
        const responseData = await callApi(url, null, null, "GET");
        // console.log(responseData);
        return await responseData;
    } catch (error) {
        // console.error(error);
        throw new Error("Albums NotFound");
    }
};

const getAlbum = async (id: unknown,) => {
    const url = `${API_URL}/albums/${id}`;

    try {
        const responseData = await callApi(url, null, null, "GET");
        // console.log(responseData);
        return await responseData;
    } catch (error) {
        // console.error(error);
        throw new Error("Album NotFound");
    }
};

export { getAlbums, getAlbum };
