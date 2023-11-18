import { useState, useEffect } from "react";
import { getPosts } from "../services/usePosts";
import { PostType } from "../types/PostType";
import { Link } from "react-router-dom";

const Posts = () => {
    const [posts, setPosts] = useState<PostType[]>([]);
    const [isLoading, setLoading] = useState<boolean>(false);

    const onSuccess = (data: PostType[]) => {
        setPosts(data);
    };

    const onError = (data: unknown) => {
        console.log(data);
    };

    useEffect(() => {
        if (!isLoading) {
            getPosts(onSuccess, onError);
            setLoading(true);
        }
    }, [posts, isLoading]);


    return (
        <div>
            {!isLoading || posts.length <= 0 ? (
                <div className="w-full h-[100px] bg-slate-700 rounded-lg py-[10px] px-[20px] ring-slate-900/5 shadow-lg text-white flex justify-center items-center">
                    Loading...
                </div>
            ) : (
                posts &&
                posts.map((post) => (
                    <div
                        className="flex flex-row bg-slate-700 rounded-lg py-[10px] px-[20px] mb-2 ring-slate-900/5 shadow-lg"
                        key={post.id}
                    >
                        <div>
                            <h1 className="text-white text-xl mb-1">{post.title}</h1>
                            <p className="text-slate-400">{post.body}</p>
                        </div>
                        <Link
                            className="w-[50px] min-w-[50px] flex justify-center items-center my-[-10px] mr-[-20px] px-[10px] rounded-lg hover:bg-slate-600"
                            to={`Post/${post.id}`}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-full h-full text-white"
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
        </div>
    );
};
export default Posts;
