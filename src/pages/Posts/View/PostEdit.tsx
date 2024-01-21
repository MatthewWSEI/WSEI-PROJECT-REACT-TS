import { ChangeEvent, useEffect, useRef, useState } from "react";
import { PostType } from "../../../types/PostType";
import { getPost } from "../../../services/usePosts";
import { Link, useParams } from "react-router-dom";
import { getUser } from "../../../services/useUsers";
import { UserType } from "../../../types/UserType";

type MyParams = {
    id: "";
};

const PostEdit = () => {
    const { id } = useParams<MyParams>();
    const numberId = Number(id);
    const [formData, setFormData] = useState<PostType>({
        id: null,
        title: "",
        body: "",
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

    const [isLoading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (isLoading && numberId) {
            setLoading(true);
            Promise.all([getPost(numberId)])
                .then(([post]) => {
                    setFormData(post);
                    if (post.userId) {
                        return getUser(post.userId);
                    }
                })
                .then((user) => {
                    setUser(user);
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [numberId, isLoading]);

    const titleCharsLimit = 100;
    const aboutCharsLimit = 500;
    const [titleCharsCount, setTitleCharsCount] = useState(0);
    const [aboutCharsCount, setAboutCharsCount] = useState(0);

    const handleChange = (
        event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
        characterLimit: number,
    ) => {
        const { name, value } = event.target;
        const newCharacterCount = value.length;
        console.log(newCharacterCount);

        if (name === "title") {
            setTitleCharsCount(newCharacterCount);
            if (newCharacterCount <= characterLimit) {
                setFormData((prevState) => ({ ...prevState, [name]: value }));
            } else {
                const truncatedText = value.slice(0, characterLimit);
                setFormData((prevState) => ({ ...prevState, [name]: truncatedText }));
            }
        }

        if (name === "body") {
            setAboutCharsCount(newCharacterCount);
            if (newCharacterCount <= characterLimit) {
                setFormData((prevState) => ({ ...prevState, [name]: value }));
            } else {
                const truncatedText = value.slice(0, characterLimit);
                setFormData((prevState) => ({ ...prevState, [name]: truncatedText }));
            }
        }
    };

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    useEffect(() => {
        const { body, title } = formData;
        setTitleCharsCount(title.length);
        setAboutCharsCount(body.length);

        if (textareaRef.current) {
            textareaRef.current.style.height = "50px";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [formData]);
    return (
        <div className="w-full bg-slate-700 text-white flex flex-col rounded-lg py-[10px] px-[20px] ring-slate-900/5 shadow-lg gap-4">
            <div className="w-full">
                <Link className="w-auto flex flex-row items-center gap-1" to={"/test"}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5"
                    >
                        <path
                            fillRule="evenodd"
                            d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                            clipRule="evenodd"
                        />
                    </svg>

                    <div>{user && user.name}</div>
                </Link>
            </div>
            <form>
                <label className="flex gap-1 flex-col  mb-1">
                    <p>Title</p>
                    <input
                        className="w-full h-[1px] min-h-[50px] max-h-[300px] rounded-lg bg-slate-600 px-[10px] py-[5px]"
                        type="text"
                        name="title"
                        value={formData.title}
                        placeholder="Write something"
                        onChange={(e) => handleChange(e, titleCharsLimit)}
                    />
                    <span>
                        {titleCharsCount} / {titleCharsLimit}
                    </span>
                </label>
                <label className="flex gap-1 flex-col  mb-1">
                    <p>About</p>
                    <textarea
                        className="w-full h-[1px] min-h-[50px] max-h-[300px] rounded-lg bg-slate-600 px-[10px] py-[5px]"
                        ref={textareaRef}
                        name="body"
                        value={formData.body}
                        onChange={(e) => handleChange(e, aboutCharsLimit)}
                        placeholder="Write something"
                        style={{
                            resize: "none",
                        }}
                    />
                    <span>
                        {aboutCharsCount} / {aboutCharsLimit}
                    </span>
                </label>
            </form>
            <div className="w-full flex flex-row gap-1 justify-end">
                <button className="transition duration-700 ease-in-out bg-lime-700 hover:bg-slate-500 rounded-lg px-2 py-1 text-white flex justify-center flex-row items-center gap-1">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4"
                    >
                        <path
                            fillRule="evenodd"
                            d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
                            clipRule="evenodd"
                        />
                    </svg>

                    <span>Save</span>
                </button>
                <button className="transition duration-700 ease-in-out bg-red-700 hover:bg-slate-500 rounded-lg px-2 py-1 text-white flex justify-center flex-row items-center gap-1">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4"
                    >
                        <path
                            fillRule="evenodd"
                            d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <span>Delete</span>
                </button>
            </div>
        </div>
    );
};

export default PostEdit;
