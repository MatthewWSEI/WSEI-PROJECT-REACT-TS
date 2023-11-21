import { useState, useEffect } from "react";
import { PostType } from "../../../types/PostType";
import { getPost } from "../../../services/usePosts";
import { useParams } from "react-router-dom";
import { getUser } from "../../../services/useUsers";
import { UserType } from "../../../types/UserType";
import { CommentType } from "../../../types/CommentType";
import { getComments } from "../../../services/useComments";

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

    const [comments, setComments] = useState<CommentType[]>([]);

    const [isLoading, setLoading] = useState<boolean>(false);

    const onSuccessPost = (data: PostType) => {
        setPost(data);
    };

    const onSuccessUser = (data: UserType) => {
        setUser(data);
    };

    const onSuccessComments = (data: CommentType[]) => {
        setComments(data);
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

        post.userId ? getComments(onSuccessComments, onError) : "";
    }, [post, isLoading, numberId]);

    return (
        <>
            {!isLoading || !post.id || !user.id || comments.length < 0 ? (
                <div className="w-full h-[100px] bg-slate-700 rounded-lg py-[10px] px-[20px] ring-slate-900/5 shadow-lg text-white flex justify-center items-center">
                    Loading...
                </div>
            ) : (
                <div className="postContainer postContainer__fs bg-slate-700">
                    <div className="w-full flex flex-row items-start text-white text-xl gap-1">
                        <div>img</div>
                        <div>{user.name}</div>
                    </div>
                    <h1 className="text-white text-xl">{post.title}</h1>
                    <p className="text-slate-400">{post.body}</p>
                </div>
            )}
        </>
    );
};

export default Post;
