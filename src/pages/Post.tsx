import { useState, useEffect } from "react";
import { PostType } from "../types/PostType";
import { getPost } from "../services/usePosts";
import { useParams } from "react-router-dom";
import { getUser } from "../services/useUsers";
import { UserType } from "../types/UserType";

type MyParams = {
    id: "";
};

const Post = () => {
    const { id } = useParams<MyParams>();
    const numberId = Number(id);
    const [post, setPost] = useState<PostType>({
        body: "",
        id: null,
        title: "",
        userId: null,
    });
    const [user, setUser] = useState<UserType>({
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
    });
    const [isLoading, setLoading] = useState<boolean>(false);

    const onSuccessPost = (data: PostType) => {
        setPost(data);
    };

    const onSuccessUser = (data: UserType) => {
        setUser(data);
    };

    const onError = (data: unknown) => {
        console.log(data);
    };

    useEffect(() => {
        if (!isLoading && numberId && numberId !== 0) {
            getPost(numberId, onSuccessPost, onError);
            setLoading(true);
        }
        post.userId ? getUser(post.userId, onSuccessUser, onError) : "";
    }, [post, isLoading, numberId]);

    console.log(Boolean(post.id));
    return (
        <>
            {!isLoading || !post.id ? (
                <div className="w-full h-[100px] bg-slate-700 rounded-lg py-[10px] px-[20px] ring-slate-900/5 shadow-lg text-white flex justify-center items-center">
                    Loading...
                </div>
            ) : (
                <div className="bg-slate-700 rounded-lg py-[10px] px-[20px] mb-2 ring-slate-900/5 shadow-lg">
                    <div className="w-full flex flex-row items-start text-white py-[10px] gap-1">
                        <div>img</div>
                        <div>{user.name}</div>
                    </div>
                    <h1 className="text-white">{post.title}</h1>
                    <p className="text-slate-400">{post.body}</p>
                </div>
            )}
        </>
    );
};

export default Post;
