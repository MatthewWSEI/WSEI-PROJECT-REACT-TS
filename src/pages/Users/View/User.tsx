import { Link, Outlet, useParams } from "react-router-dom";
import { UserType } from "../../../types/UserType";
import { useEffect, useState } from "react";
import { getUser } from "../../../services/useUsers";
import Loading from "../../../components/Loading";

type MyParams = {
    id: "";
};

const User = () => {
    const { id } = useParams<MyParams>();
    const numberId = Number(id);
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
            Promise.all([getUser(numberId)])
                .then(([user]) => {
                    setUser(user);
                    // if (post.userId) {
                    //     return getUser(post.userId);
                    // }
                })
                // .then((user) => {
                //     setUser(user);
                // })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [numberId, isLoading]);

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <div className="containerUser text-white">
                    <div className="flex flex-col gap-[10px]">
                        <div className="bg-slate-700 rounded-lg py-[10px] px-[20px] ring-slate-900/5 shadow-lg text-white flex flex-col">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-7 h-7"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <div></div>
                            <h2 className="text-2xl">{user.name}</h2>
                            <p className="text-xl mb-2 text-slate-400">({user.username})</p>
                            <label>
                                <h3>Company:</h3>
                                <p className="text-slate-400 mb-1">{user.company.name}</p>
                            </label>
                            <label>
                                <h3>Position:</h3>
                                <p className="text-slate-400">{user.company.catchPhrase}</p>
                            </label>
                        </div>
                        <div className="bg-slate-700 rounded-lg py-[10px] px-[20px] ring-slate-900/5 shadow-lg text-white ">
                            <label>
                                <h3>Email:</h3>
                                <p className="text-slate-400">{user.email}</p>
                            </label>
                            <label>
                                <h3>Phone:</h3>
                                <p className="text-slate-400">{user.phone}</p>
                            </label>
                            <label>
                                <h3>Address:</h3>
                                <p className="text-slate-400">{`${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`}</p>
                            </label>
                        </div>
                        <div className="bg-slate-700 rounded-lg py-[10px] px-[20px] ring-slate-900/5 shadow-lg text-white">
                            <label>
                                <h3>Website:</h3>
                                <p className="text-slate-400">{user.website}</p>
                            </label>
                        </div>
                    </div>
                    <div>
                        <div className="w-full h-[50px] flex flex-row gap-1 mb-[10px]">
                            <Link
                                className="w-fit flex flex-row items-center justify-start gap-1 text-white font-bold transition duration-700 ease-in-out bg-slate-600 hover:bg-slate-500 rounded-lg px-2 py-1"
                                to={`/User/${numberId}/Posts`}
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
                                <div>Posts</div>
                            </Link>
                            <Link
                                className="w-fit flex flex-row items-center justify-start gap-1 text-white font-bold transition duration-700 ease-in-out bg-slate-600 hover:bg-slate-500 rounded-lg px-2 py-1"
                                to={`/User/${numberId}/Albums`}
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
                                <div>Albums</div>
                            </Link>
                            <Link
                                className="w-fit flex flex-row items-center justify-start gap-1 text-white font-bold transition duration-700 ease-in-out bg-slate-600 hover:bg-slate-500 rounded-lg px-2 py-1"
                                to={`/User/${numberId}/Todo`}
                            >
                                <div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="w-4 h-6"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M7.5 5.25a3 3 0 0 1 3-3h3a3 3 0 0 1 3 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0 1 12 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 0 1 7.5 5.455V5.25Zm7.5 0v.09a49.488 49.488 0 0 0-6 0v-.09a1.5 1.5 0 0 1 1.5-1.5h3a1.5 1.5 0 0 1 1.5 1.5Zm-3 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                                            clipRule="evenodd"
                                        />
                                        <path d="M3 18.4v-2.796a4.3 4.3 0 0 0 .713.31A26.226 26.226 0 0 0 12 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.49-.189.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.427a49.19 49.19 0 0 1-6.477-.427C4.047 21.128 3 19.852 3 18.4Z" />
                                    </svg>
                                </div>
                                <div>Todo</div>
                            </Link>
                        </div>
                        <Outlet />
                    </div>
                </div>
            )}
        </>
    );
};

export default User;
