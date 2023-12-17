import { CommentType } from "../types/CommentType";
import { PostType } from "../types/PostType";
import { UserType } from "../types/UserType";

type Action =
    | { type: "ADD_USER"; payload: UserType }
    | { type: "ADD_POST"; payload: PostType }
    | { type: "ADD_COMMENT"; payload: CommentType }
    | { type: "CLEAR_USERS" }
    | { type: "CLEAR_POSTS" }
    | { type: "CLEAR_COMMENTS" };

interface State {
    users: UserType[];
    posts: PostType[];
    comments: CommentType[];
}

const initialState: State = {
    users: [],
    posts: [],
    comments: [],
};

export const rootReducer = (state: State = initialState, action: Action) => {
    switch (action.type) {
    case "ADD_USER":
        return { ...state, users:  action.payload };
    case "ADD_POST":
        return { ...state, posts: action.payload };
    case "ADD_COMMENT":
        return { ...state, comments: action.payload };
    case "CLEAR_USERS":
        return { ...state, users: [] };
    case "CLEAR_POSTS":
        return { ...state, posts: [] };
    case "CLEAR_COMMENTS":
        return { ...state, comments: [] };
    default:
        return state;
    }
};
