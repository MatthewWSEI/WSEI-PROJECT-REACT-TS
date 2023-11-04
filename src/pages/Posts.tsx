import { useState, useEffect } from "react";
import { getPosts } from "../services/usePosts";
import { PostType } from "../types/PostType";

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
        <div className="bg-slate-800 w-full min-h-screen h-full p-6">
            {!isLoading ? (
                <div className="bg-slate-700 rounded-lg px-2 py-1 mb-2 ring-slate-900/5 shadow-lg text-white flex justify-center">
                    Loading...
                </div>
            ) : (
                posts &&
                posts.map((post) => (
                    <div
                        className="bg-slate-700 rounded-lg px-2 py-1 mb-2 ring-slate-900/5 shadow-lg"
                        key={post.id}
                    >
                        <h1 className="text-white">{post.title}</h1>
                        <p className="text-slate-400">{post.body}</p>
                    </div>
                ))
            )}
        </div>
    );
};
export default Posts;
