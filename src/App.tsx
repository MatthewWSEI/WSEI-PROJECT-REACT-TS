import { useState, useEffect } from "react";
import { getPosts } from "./services/usePosts";

interface Posts {
    body: string
    id: number
    title: string
    userId: number
}

const App = () => {
    const [posts, setPosts] = useState<Posts[]>([]);
    const [isLoading, setLoading] = useState<boolean>(false);

    const onSuccess = (data: any) => {
        setPosts(data);
    };

    const onError = (data: any) => {
        console.log(data);
    };

    useEffect(() => {
        if (!isLoading) {
            getPosts(onSuccess, onError);
            setLoading(true);
        }
        // posts.length && console.log(posts)
    }, [posts, isLoading]);

    return (
        <div className="bg-slate-800 w-full h-screen p-6">
            <div className="bg-slate-700 rounded-lg px-2 py-1 ring-slate-900/5 shadow-lg">
                <h1 className="text-white">My app</h1>
                <p className="text-slate-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum alias quibusdam doloribus, hic vero facere quis veniam minima deleniti soluta, dolorem aut. Ad consequatur tempora alias dicta facilis reprehenderit sunt?</p>
                {/* {isLoading && <div>Loading...</div>}
                {!isLoading && posts && (
                    <div>{posts.map((post) => post.title)}</div>
                )} */}
            </div>
        </div>
    );
};

export default App;
