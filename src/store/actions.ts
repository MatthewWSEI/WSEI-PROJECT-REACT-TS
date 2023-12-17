import { PostType } from "../types/PostType";
import { UserType } from "../types/UserType";

export const ADD_USER = "ADD_USER";
export const ADD_POST = "ADD_POST";
export const ADD_COMMENT = "ADD_COMMENT";
export const CLEAR_USERS = "CLEAR_USERS";
export const CLEAR_POSTS = "CLEAR_POSTS";
export const CLEAR_COMMENTS = "CLEAR_COMMENTS";

export const addUser = (user: UserType) => ({
    type: ADD_USER,
    payload: user,
});

export const addPost = (post: PostType) => ({
    type: ADD_POST,
    payload: post,
});

export const addComment = (comment: PostType) => ({
    type: ADD_COMMENT,
    payload: comment,
});

export const clearUsers = () => ({
    type: CLEAR_USERS,
});

export const clearPosts = () => ({
    type: CLEAR_POSTS,
});

export const clearComments = () => ({
    type: CLEAR_COMMENTS,
});
