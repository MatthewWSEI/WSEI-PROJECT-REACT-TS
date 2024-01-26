import React, { useEffect, useState } from "react";
import { PostType } from "../types/PostType";
import { CommentType } from "../types/CommentType";
import { UserType } from "../types/UserType";
import { getPosts } from "../services/usePosts";
import { getUser } from "../services/useUsers";
import { getComments } from "../services/useComments";
import Loading from "./Loading";
import PostCard from "./PostCard";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addPost } from "../store/actions";

type MyParams = {
    id: "";
};
interface State {
    users: UserType[];
    posts: PostType[];
    comments: CommentType[];
}

const UserPostsList = () => {
    const navigate = useNavigate();

    const globalState = useSelector((state: State) => state);
    const dispatch = useDispatch();
    const { id } = useParams<MyParams>();
    const numberId = Number(id);

    const [isLoading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<{
        posts: PostType[];
        comments: CommentType[];
        users: UserType;
    }>({
        posts: [],
        comments: [],
        users: {
            id: null,
            name: "",
            username: "",
            email: "",
            address: {
                street: "",
                suite: "",
                city: "",
                zipcode: "",
                geo: {
                    lat: "",
                    lng: "",
                },
            },
            phone: "",
            website: "",
            company: {
                name: "",
                catchPhrase: "",
                bs: "",
            },
        },
    });
    useEffect(() => {
        if (isLoading && numberId) {
            setLoading(true);
            Promise.all([getPosts(), getUser(numberId), getComments()])
                .then(([posts, users, comments]) => {
                    setData({ posts, users, comments });
                })
                .catch((error) => {
                    const foundPosts = globalState.posts.filter(
                        (post: PostType) => post.userId === numberId,
                    );
                    const foundUser = globalState.users.find(
                        (user: UserType) => user.id === numberId,
                    );
                    if (foundPosts && foundUser) {
                        setData({ posts: foundPosts, users: foundUser, comments: [] });
                    }
                    console.log(error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
        // if (!isLoading) {
        //     console.log(globalState);
        // }
    }, [isLoading, numberId]);

    const deletePost = (id: number) => {
        const newArrayWithoutRemovedItem = globalState.posts.filter(
            (post: PostType) => post.id !== id,
        );
        dispatch(addPost(newArrayWithoutRemovedItem));
    };
    const filteredPosts = data.posts.filter((post) => post.userId === numberId);
    return (
        <div>
            {isLoading ? (
                <Loading />
            ) : (
                <div className="containerPosts">
                    {filteredPosts.map((post) => (
                        <PostCard
                            key={post.id}
                            post={post}
                            data={data}
                            deletePost={deletePost}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserPostsList;
