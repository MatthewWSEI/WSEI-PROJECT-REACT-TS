import React, { useEffect, useState } from "react";
import { PostType } from "../types/PostType";
import { CommentType } from "../types/CommentType";
import { UserType } from "../types/UserType";
import { getPosts } from "../services/usePosts";
import { getUser } from "../services/useUsers";
import { getComments } from "../services/useComments";
import Loading from "./Loading";
import PostCard from "./PostCard";
import { useParams } from "react-router-dom";

type MyParams = {
    id: "";
};

const UserPostsList = () => {
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
                    console.log(error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [isLoading, numberId]);

    const filteredPosts = data.posts.filter((post) =>
        post.userId === numberId,
    );
    return (
        <div>
            {isLoading ? (
                <Loading />
            ) : (
                <div className="containerPosts">
                    {filteredPosts.map((post) => (
                        <PostCard key={post.id} post={post} data={data} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserPostsList;
