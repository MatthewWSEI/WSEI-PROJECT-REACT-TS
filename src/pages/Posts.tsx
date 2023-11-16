import { useState, useEffect } from "react";
import { getPosts } from "../services/usePosts";
import { PostType } from "../types/PostType";
import { useNavigate } from "react-router-dom";

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

    const navigate = useNavigate();

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
                        className="bg-slate-700 rounded-lg py-[10px] px-[20px] mb-2 ring-slate-900/5 shadow-lg cursor-pointer"
                        key={post.id}
                        onClick={() => navigate(`Post/${post.id}`)}
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
