import { useState, useEffect, ChangeEvent, useRef } from "react";
import { PostType } from "../../../types/PostType";
import { getPost } from "../../../services/usePosts";
import { useParams } from "react-router-dom";
import { getUsers } from "../../../services/useUsers";
import { UserType } from "../../../types/UserType";
import { CommentType } from "../../../types/CommentType";
import { getComments } from "../../../services/useComments";
import { useSelector } from "react-redux";
import Loading from "../../../components/Loading";
import { addComment } from "../../../store/actions";
import { useDispatch } from "react-redux";

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
    const dispatch = useDispatch();

    // console.log(globalState);

    // const commentsState = true ? globalState.comments : sss.comments;
    // const filteredComments = commentsState.filter((comment) => comment.postId === data.post.id);
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const initialUser: UserType = {
        id: 13636,
        name: "Mateusz Dynur",
        username: "matthew",
        email: "mateusz.dynur@microsoft.wsei.edu.pl",
        address: {
            street: "Unknow",
            suite: "Unknow",
            city: "Unknow",
            zipcode: "00-000",
            geo: {
                lat: "Unknow",
                lng: "Unknow",
            },
        },
        phone: "+48 000 000 000",
        website: "Unknow",
        company: {
            name: "Unknow",
            catchPhrase: "Unknow",
            bs: "Unknow",
        },
    };
    const { id } = useParams<MyParams>();
    const numberId = Number(id);

    const [data, setData] = useState<{
        post: PostType;
        comments: CommentType[];
        users: UserType[];
    }>({
        post: {
            body: "",
            id: null,
            title: "",
            userId: null,
        },
        comments: [],
        users: [],
    });

    const [isLoading, setLoading] = useState<boolean>(true);
    const getUsertoPost = (id: number) => data.users.find((user) => user.id === id);
    const getUsertoComment = (email: string) => data.users.find((user) => user.email === email);

    const getPostGlobal = (id: number) => globalState.posts.find((post) => post.id === id);
    const getUserGlobal = (id: number) => globalState.users.find((user) => user.id === id);
    const getCommentsGlobal = (id: number) =>
        globalState.comments.filter((comment) => comment.postId === id);
    useEffect(() => {
        if (
            isLoading
            //  &&
            // globalState.posts.length === 0 &&
            // globalState.users.length === 0 &&
            // globalState.comments.length === 0
        ) {
            setLoading(true);
            Promise.all([getPost(numberId), getUsers(), getComments()])
                .then(([post, users, comments]) => {
                    const userAlreadyExists = users.some(
                        (user: UserType) => user.id === initialUser.id,
                    );

                    const newUserTab: UserType[] = userAlreadyExists
                        ? users
                        : [...users, initialUser];
                    setData({ post, users:newUserTab, comments });
                })
                .catch((error) => {
                    if (numberId) {
                        const getPostPromise = getPostGlobal(numberId);
                        const commentsPromise = getCommentsGlobal(numberId);
                        console.log("numberId", numberId);
                        console.log("getPostPromise", getPostPromise);
                        console.log("commentsPromise", commentsPromise);

                        Promise.all([getPostPromise, commentsPromise])
                            .then(([getPostResult, commentsResult]) => {
                                if (getPostResult.userId) {
                                    console.log(
                                        "getUserGlobal",
                                        getUserGlobal(getPostResult.userId),
                                    );
                                    return getUserGlobal(getPostResult.userId).then(
                                        (getUserResult) => ({
                                            post: getPostResult,
                                            users: getUserResult,
                                            comments: commentsResult,
                                        }),
                                    );
                                } else {
                                    return {
                                        post: getPostResult,
                                        users: null,
                                        comments: commentsResult,
                                    };
                                }
                            })
                            .then(({ post, user, comments }) => {
                                // console.log(post, user, comments);
                                console.log("Jestem tu");
                                setData({ post, users, comments });
                            })
                            .catch((innerError) => {
                                console.log("Błąd", innerError);
                            })
                            .finally(() => {
                                setLoading(false);
                            });
                    } else {
                        console.log(error);
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        }
        // if (
        //     globalState.posts.length !== 0 ||
        //     globalState.users.length !== 0 ||
        //     globalState.comments.length !== 0
        // ) {
        //     setLoading(false);
        // }
    }, [isLoading, numberId]);

    

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const [comment, setComment] = useState<CommentType>({
        postId: numberId,
        id: null,
        name: "",
        email: initialUser.email,
        body: "",
    });

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "50px";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [comment.body]);

    const generateRandomInteger = (min: number, max: number): number => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const handleChangeComment = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const { name, value } = event.target;
        setComment((prevState) => ({ ...prevState, [name]: value }));
    };

    const addNewComment = () => {
        const id = generateRandomInteger(999, 10000);
        const commentsGet = globalState.comments;
        const initialTask: CommentType = {
            postId: comment.postId,
            id: id,
            name: comment.name,
            email: comment.email,
            body: comment.body,
        };
        const newTComment: CommentType[] | CommentType = [...commentsGet, initialTask];
        dispatch(addComment(newTComment));
        setData((prevData) => ({
            ...prevData,
            comments: [...prevData.comments, initialTask],
        }));
    };

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
                        <div>{getUsertoPost(data.post.userId)?.name || "Unknow"}</div>
                    </div>
                    <div className="w-full flex flex-col items-start justify-start text-white gap-1 px-[20px] py-[10px]">
                        <h1 className="text-2xl">{data.post.title}</h1>
                        <p className="text-slate-400">{data.post.body}</p>
                    </div>
                    <div className="comments">
                        <span>Comments:</span>
                        <div className="w-full min-h-[50px] flex justify-start bg-slate-700 mb-1 py-[10px] gap-1 text-white rounded-lg">
                            <textarea
                                className="w-full h-[1px] min-h-[50px] max-h-[300px] rounded-lg bg-slate-600 px-[20px] py-[10px]"
                                ref={textareaRef}
                                value={comment.body}
                                name="body"
                                onChange={handleChangeComment}
                                placeholder="New Comment"
                                style={{
                                    resize: "none",
                                }}
                            />
                            <button
                                className="w-fit h-[50px] flex flex-row items-center justify-start gap-1  font-bold transition duration-700 ease-in-out bg-slate-600 hover:bg-slate-500 rounded-lg px-2 py-1"
                                onClick={addNewComment}
                                // to="/Todo/NewTodo"
                            >
                                <div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="w-4 h-4"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <div>Add</div>
                            </button>
                        </div>
                        {data.comments
                            .filter((comment) => comment.postId === data.post.id)
                            .map((comment) => (
                                <div
                                    key={comment.id}
                                    className="flex flex-col w-full bg-slate-600 rounded-lg  py-[10px] px-[20px] mb-1"
                                >
                                    <div className="flex flex-row gap-1">
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
                                        <div>
                                            {getUsertoComment(comment.email)?.name || "Unknow"}
                                        </div>
                                    </div>
                                    {comment.body}
                                </div>
                            ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default Post;
