import { ChangeEvent, useEffect, useRef, useState } from "react";
// import { UserType } from "../../../types/UserType";
import { PostType } from "../../../types/PostType";

const PostNew = () => {
    const [formData, setFormData] = useState<PostType>({
        id: null,
        title: "",
        body: "",
        userId: null,
    });

    // const [user, setUser] = useState<UserType>({
    //     id: null,
    //     name: "",
    //     username: "",
    //     email: "",
    //     address: {
    //         street: "",
    //         suite: "",
    //         city: "",
    //         zipcode: "",
    //         geo: {
    //             lat: "",
    //             lng: "",
    //         },
    //     },
    //     phone: "",
    //     website: "",
    //     company: {
    //         name: "",
    //         catchPhrase: "",
    //         bs: "",
    //     },
    // });

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
            <form>
                <label className="flex gap-1 flex-col  mb-1">
                    <p>Title</p>
                    <textarea
                        className="w-full h-[1px] min-h-[50px] max-h-[300px] rounded-lg bg-slate-600 px-[10px] py-[5px]"
                        ref={textareaRef}
                        name="title"
                        value={formData.title}
                        placeholder="Write something"
                        style={{
                            resize: "none",
                        }}
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
            </div>
        </div>
    );
};

export default PostNew;
