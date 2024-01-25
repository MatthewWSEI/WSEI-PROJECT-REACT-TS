import { AlbumType } from "../types/AlbumType";
import { PhotoType } from "../types/PhotoType";
import { PostType } from "../types/PostType";
import { TodoType } from "../types/TodoType";
import { UserType } from "../types/UserType";

export const ADD_USER = "ADD_USER";
export const ADD_POST = "ADD_POST";
export const ADD_COMMENT = "ADD_COMMENT";
export const ADD_TODO = "ADD_TODO";
export const ADD_ALBUM = "ADD_ALBUM";
export const ADD_PHOTO = "ADD_PHOTO";
export const CLEAR_USER = "CLEAR_USER";
export const CLEAR_POST = "CLEAR_POST";
export const CLEAR_COMMENT = "CLEAR_COMMENT";

export const addUser = (user: UserType | UserType[]) => ({
    type: ADD_USER,
    payload: user,
});

export const addPost = (post: PostType | PostType) => ({
    type: ADD_POST,
    payload: post,
});

export const addComment = (comment: PostType) => ({
    type: ADD_COMMENT,
    payload: comment,
});

export const addTodo = (todo: TodoType) => ({
    type: ADD_TODO,
    payload: todo,
});

export const addAlbum = (album: AlbumType) => ({
    type: ADD_ALBUM,
    payload: album,
});

export const addPhoto = (photo: PhotoType) => ({
    type: ADD_PHOTO,
    payload: photo,
});

export const clearUsers = () => ({
    type: CLEAR_USER,
});

export const clearPosts = () => ({
    type: CLEAR_POST,
});

export const clearComments = () => ({
    type: CLEAR_COMMENT,
});
