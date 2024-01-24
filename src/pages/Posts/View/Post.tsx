import { useState, useEffect } from "react";
import { PostType } from "../../../types/PostType";
import { getPost } from "../../../services/usePosts";
import { useParams } from "react-router-dom";
import { getUser } from "../../../services/useUsers";
import { UserType } from "../../../types/UserType";
import { CommentType } from "../../../types/CommentType";
import { getComments } from "../../../services/useComments";
import { useSelector } from "react-redux";
import Loading from "../../../components/Loading";

type MyParams = {
    id: "";
};
interface State {
    users: UserType[];
    posts: PostType[];
    comments: CommentType[];
}

const Post = () => {
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const globalState = useSelector((state: State) => state);
    console.log(globalState);

    // const commentsState = true ? globalState.comments : sss.comments;
    // const filteredComments = commentsState.filter((comment) => comment.postId === data.post.id);
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const { id } = useParams<MyParams>();
    const numberId = Number(id);

    const [data, setData] = useState<{
        post: PostType;
        comments: CommentType[];
        user: UserType;
    }>({
        post: {
            body: "",
            id: null,
            title: "",
            userId: null,
        },
        comments: [],
        user: {
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

    const [isLoading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (isLoading) {
            setLoading(true);
            Promise.all([getPost(numberId), getUser(numberId), getComments()])
                .then(([post, user, comments]) => {
                    setData({ post, user, comments });
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [isLoading, numberId]);

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <div className="post postContainer__fs bg-slate-700">
                    <div className="w-full flex flex-row items-center text-white text-xl gap-1">
                        <div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-4 h-4"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <div>{data.user.name}</div>
                    </div>
                    <div className="w-full flex flex-col items-start justify-start text-white gap-1 px-[20px] py-[10px]">
                        <h1 className="text-2xl">{data.post.title}</h1>
                        <p className="text-slate-400">{data.post.body}</p>
                    </div>
                    <div className="comments">
                        <span>Comments:</span>
                        {data.comments
                            .filter((comment) => comment.postId === data.post.id)
                            .map((e) => (
                                <div
                                    key={e.id}
                                    className="w-full bg-slate-600 rounded-lg  py-[10px] px-[20px] mb-1"
                                >
                                    {e.name}
                                </div>
                            ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default Post;
