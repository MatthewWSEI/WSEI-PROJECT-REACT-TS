import { useState, ChangeEvent, useRef, useEffect } from "react";
import { getPosts } from "../../services/usePosts";
import { PostType } from "../../types/PostType";
import { CommentType } from "../../types/CommentType";
import { getComments } from "../../services/useComments";
import { UserType } from "../../types/UserType";
import { getUsers } from "../../services/useUsers";
import PostCard from "../../components/PostCard";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";

import { useSelector, useDispatch } from "react-redux";
import { addComment, addPost, addUser } from "../../store/actions";

interface State {
    users: UserType[];
    posts: PostType[];
    comments: CommentType[];
}

const Posts = () => {
    const globalState = useSelector((state: State) => state);
    const dispatch = useDispatch();

    const [searchText, setSearchText] = useState<string>("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setSearchText(event.target.value);
    };

    const deletePost = (id: number) => {
        const newArrayWithoutRemovedItem = globalState.posts.filter(
            (post: PostType) => post.id !== id,
        );
        dispatch(addPost(newArrayWithoutRemovedItem));
        console.log(newArrayWithoutRemovedItem);
    };
    // const [data, setData] = useState<{
    //     posts: PostType[];
    //     comments: CommentType[];
    //     users: UserType[];
    // }>({ posts: [], comments: [], users: [] });

    const filteredPosts = globalState.posts.filter((post) =>
        post.title.toLowerCase().includes(searchText.toLowerCase()),
    );

    const [isLoading, setLoading] = useState<boolean>(true);

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

    useEffect(() => {
        if (
            isLoading &&
            globalState.posts.length === 0 &&
            globalState.users.length === 0 &&
            globalState.comments.length === 0
        ) {
            setLoading(true);
            Promise.all([getPosts(), getUsers(), getComments()])
                .then(([posts, users, comments]) => {
                    // setData({ posts, users, comments });

                    const userAlreadyExists = users.some(
                        (user: UserType) => user.id === initialUser.id,
                    );

                    const newUserTab: UserType[] = userAlreadyExists
                        ? users
                        : [...users, initialUser];

                    dispatch(addPost(posts));
                    dispatch(addUser(newUserTab));
                    dispatch(addComment(comments));
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
        // if (!isLoading) {
        //     console.log(globalState);
        // }
        if (
            globalState.posts.length !== 0 ||
            globalState.users.length !== 0 ||
            globalState.comments.length !== 0
        ) {
            setLoading(false);
        }
    }, [isLoading]);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "50px";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [searchText]);

    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-full h-full bg-slate-700 rounded-lg py-[10px] px-[20px] ring-slate-900/5 shadow-lg text-white flex flex-col justify-center items-center mb-[10px]">
                <div className="w-full flex flex-row gap-1">
                    <div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    <textarea
                        className="w-full h-[1px] min-h-[50px] max-h-[300px] rounded-lg bg-slate-600 px-[20px] py-[10px]"
                        ref={textareaRef}
                        value={searchText}
                        onChange={handleChange}
                        placeholder="Write something"
                        style={{
                            resize: "none",
                        }}
                    />
                </div>
            </div>
            <div className="w-full h-[50px] flex justify-start  mb-1">
                <Link
                    className="w-fit flex flex-row items-center justify-start gap-1 text-white font-bold transition duration-700 ease-in-out bg-slate-600 hover:bg-slate-500 rounded-lg px-2 py-1"
                    to="Post/NewPost"
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
                </Link>
            </div>
            {isLoading ? (
                <Loading />
            ) : (
                <div className="containerPosts">
                    {filteredPosts.map((post) => (
                        <PostCard
                            key={post.id}
                            post={post}
                            data={globalState}
                            deletePost={deletePost}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
export default Posts;
