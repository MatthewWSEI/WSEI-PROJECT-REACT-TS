import { useState, useEffect } from "react";
import { getPosts } from "../../services/usePosts";
import { PostType } from "../../types/PostType";
import { Link } from "react-router-dom";
import { CommentType } from "../../types/CommentType";
import { getComments } from "../../services/useComments";

const Posts = () => {
    const [posts, setPosts] = useState<PostType[]>([]);
    const [comments, setComments] = useState<CommentType[]>([]);

    const [isLoading, setLoading] = useState<boolean>(false);

    const onSuccessPosts = (data: PostType[]) => {
        setPosts(data);
    };

    const onSuccessComments = (data: CommentType[]) => {
        setComments(data);
    };

    const onError = (data: unknown) => {
        console.log(data);
    };

    useEffect(() => {
        if (!isLoading) {
            getPosts(onSuccessPosts, onError);
            setLoading(true);
        }
        posts.length > 0 && getComments(onSuccessComments, onError);
    }, [posts, isLoading]);

    return (
        <>
            {!isLoading || posts.length <= 0 || comments.length <= 0 ? (
                <div className="w-full h-[100px] bg-slate-700 rounded-lg py-[10px] px-[20px] ring-slate-900/5 shadow-lg text-white flex justify-center items-center">
                    Loading...
                </div>
            ) : (
                posts &&
                posts.map((post) => (
                    <div
                        className="postContainer postsList postContainer__sb bg-slate-700"
                        key={post.id}
                    >
                        <div className="texts">
                            <h1 className="text-xl">{post.title}</h1>
                            <p className="text-slate-400">{post.body}</p>
                            <div className="inline-flex gap-1">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-4 h-4 text-white"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97zM6.75 8.25a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H7.5z"
                                        clipRule="evenodd"
                                    />
                                </svg>

                                {comments.filter(
                                    (comment) => comment.postId === post.id
                                ).length || "0"}
                            </div>
                        </div>
                        <Link
                            className="link hover:bg-slate-600"
                            to={`Post/${post.id}`}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-5 h-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                                />
                            </svg>
                        </Link>
                    </div>
                ))
            )}
        </>
    );
};
export default Posts;
