import { callApi } from "./useApi";
import { PhotoType } from "../types/PhotoType";
const API_URL: string = "https://jsonplaceholder.typicode.com";

const getPhotos = async (
    onSuccess: (data: PhotoType[]) => void,
    onError: (error: unknown) => void
) => {
    const url = `${API_URL}/photos`;

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

export{getPhotos};