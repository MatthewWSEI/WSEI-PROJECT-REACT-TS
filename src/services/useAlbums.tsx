import { callApi } from "./useApi";
import { AlbumType } from "../types/AlbumType";

const API_URL: string = "https://jsonplaceholder.typicode.com";

const getAlbums = async (
    onSuccess: (data: AlbumType[]) => void,
    onError: (error: unknown) => void,
) => {
    const url = `${API_URL}/albums`;

    try {
        const responseData = await callApi(url, null, null, "GET");
        onSuccess(responseData);
        console.log(responseData);
    } catch (error) {
        onError(error);
    }
};

export { getAlbums };
