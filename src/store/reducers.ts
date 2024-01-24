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

const user: UserType ={
    id: 13636,
    name: "Mateusz Dynur",
    username: "matthew",
    email: "mateusz.dynur@microsoft.wsei.edu.pl",
    address: {
        street: "Unknow",
        suite: "Unknow",
        city: "Unknow",
        zipcode: "00-000",
        geo: {
            lat: "Unknow",
            lng: "Unknow",
        },
    },
    phone: "+48 000 000 000",
    website: "Unknow",
    company: {
        name: "Unknow",
        catchPhrase: "Unknow",
        bs: "Unknow",
    },
};

const initialState: State = {
    users: [user],
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
        if(Array.isArray(action.payload)){
            const uniqueUsers = action.payload.filter((newUser: UserType) => !state.users.some(existingElement => existingElement.id === newUser.id));
            return { ...state, users: [...state.users, ...uniqueUsers] };
        }
        return { ...state, users: [...state.users, action.payload] };
    }
    case "ADD_POST":
    {
        if(Array.isArray(action.payload)){
            const uniquePost = action.payload.filter((newPost: PostType) => !state.posts.some(existingElement => existingElement.id === newPost.id));
            return { ...state, posts: [...state.posts, ...uniquePost] };
        }
        return { ...state, posts: [...state.posts, action.payload] };

    }
    case "ADD_COMMENT":
    {
        if(Array.isArray(action.payload)){
            const uniqueComment = action.payload.filter((newComment: CommentType) => !state.comments.some(existingElement => existingElement.id === newComment.id));
            return { ...state, comments: [...state.comments, ...uniqueComment] };
        }
        return { ...state, comments: [...state.comments, action.payload] };
    }
    case "ADD_TODO":
    {
        if(Array.isArray(action.payload)){
            const uniqueTodo = action.payload.filter((newTodo: TodoType) => !state.todos.some(existingElement => existingElement.id === newTodo.id));
            return { ...state, todos: [...state.todos, ...uniqueTodo] };
        }
        return { ...state, todos: [...state.todos, action.payload] };
    }
    case "ADD_ALBUM":
    {
        if(Array.isArray(action.payload)){
            const uniqueAlbum = action.payload.filter((newAlbum: AlbumType) => !state.albums.some(existingElement => existingElement.id === newAlbum.id));
            return { ...state, albums: [...state.albums, ...uniqueAlbum] };
        }
        return { ...state, albums: [...state.albums, action.payload] };
    }
    case "ADD_PHOTO":
    {
        if(Array.isArray(action.payload)){
            const uniquePhoto = action.payload.filter((newPhoto: PhotoType) => !state.photos.some(existingElement => existingElement.id === newPhoto.id));
            return { ...state, photos: [...state.photos, ...uniquePhoto] };
        }
        return { ...state, photos: [...state.photos, action.payload] };
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
