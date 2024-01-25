import { AlbumType } from "../types/AlbumType";
import { CommentType } from "../types/CommentType";
import { PhotoType } from "../types/PhotoType";
import { PostType } from "../types/PostType";
import { TodoType } from "../types/TodoType";
import { UserType } from "../types/UserType";

type Action =
    | { type: "ADD_USER"; payload: UserType }
    | { type: "ADD_POST"; payload: PostType }
    | { type: "ADD_COMMENT"; payload: CommentType }
    | { type: "ADD_TODO"; payload: TodoType }
    | { type: "ADD_ALBUM"; payload: AlbumType }
    | { type: "ADD_PHOTO"; payload: PhotoType }
    | { type: "CLEAR_USER" }
    | { type: "CLEAR_POST" }
    | { type: "CLEAR_COMMENT" };

interface State {
    users: UserType[];
    posts: PostType[];
    comments: CommentType[];
    todos: TodoType[];
    albums: AlbumType[];
    photos: PhotoType[];
}

const initialState: State = {
    users: [],
    posts: [],
    comments: [],
    todos: [],
    albums: [],
    photos: [],
};


export const rootReducer = (state: State = initialState, action: Action) => {
    switch (action.type) {
    case "ADD_USER":
    {
        return { ...state, users:  action.payload };
    }
    case "ADD_POST":
    {
        return { ...state, posts:  action.payload };

    }
    case "ADD_COMMENT":
    {
        return { ...state, comments:  action.payload };
    }
    case "ADD_TODO":
    {
        return { ...state, todos:  action.payload };
    }
    case "ADD_ALBUM":
    {
        return { ...state, albums:  action.payload };
    }
    case "ADD_PHOTO":
    {
        return { ...state, photos:  action.payload };
    }
    case "CLEAR_USER":
        return { ...state, users: [] };
    case "CLEAR_POST":
        return { ...state, posts: [] };
    case "CLEAR_COMMENT":
        return { ...state, comments: [] };
    default:
        return state;
    }
};
