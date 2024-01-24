import { Link, Outlet, useParams } from "react-router-dom";
import { UserType } from "../../../types/UserType";
import { useEffect, useState } from "react";
import { getUser } from "../../../services/useUsers";
import Loading from "../../../components/Loading";
import UserCard from "../../../components/UserCard";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

interface State {
    users: UserType;
}

type MyParams = {
    id: "";
};

const User = () => {
    const globalState = useSelector((state: State) => state);
    const dispatch = useDispatch();
    console.log(globalState);

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
                    console.log(user);
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
                    const foundUser = globalState.users.find((user) => user.id === numberId);
                    if (foundUser) {
                        setUser(foundUser);
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [numberId, isLoading, globalState.users]);

    // const filteredUsers = globalState.users.filter((user: UserType) => {
    //     if (user.id === numberId) {
    //         console.log(user);

    //         return user;
    //     }
    // });

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <div className="containerUser text-white">
                    <div className="flex flex-col gap-[10px]">
                        <UserCard user={user} show={false} />
                        {/* <div className="bg-slate-700 rounded-lg py-[10px] px-[20px] ring-slate-900/5 shadow-lg text-white ">
                            <label>
                                <h3>Email:</h3>
                                <p className="text-slate-400">{filteredUsers.email}</p>
                            </label>
                            <label>
                                <h3>Phone:</h3>
                                <p className="text-slate-400">{filteredUsers.phone}</p>
                            </label>
                            <label>
                                <h3>Address:</h3>
                                <p className="text-slate-400">{`${filteredUsers.address.street}, ${filteredUsers.address.suite}, ${filteredUsers.address.city}, ${filteredUsers.address.zipcode}`}</p>
                            </label>
                        </div>
                        <div className="bg-slate-700 rounded-lg py-[10px] px-[20px] ring-slate-900/5 shadow-lg text-white">
                            <label>
                                <h3>Website:</h3>
                                <p className="text-slate-400">{filteredUsers.website}</p>
                            </label>
                        </div> */}
                    </div>
                    <div>
                        <div className="w-full min-h-[50px] flex flex-row flex-wrap gap-1 mb-[10px]">
                            <Link
                                className="w-fit h-[50px] flex flex-row items-center justify-start gap-1 text-white font-bold transition duration-700 ease-in-out bg-slate-600 hover:bg-slate-500 rounded-lg px-2 py-1"
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
                                            d="M4.125 3C3.089 3 2.25 3.84 2.25 4.875V18a3 3 0 0 0 3 3h15a3 3 0 0 1-3-3V4.875C17.25 3.839 16.41 3 15.375 3H4.125ZM12 9.75a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H12Zm-.75-2.25a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5H12a.75.75 0 0 1-.75-.75ZM6 12.75a.75.75 0 0 0 0 1.5h7.5a.75.75 0 0 0 0-1.5H6Zm-.75 3.75a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5H6a.75.75 0 0 1-.75-.75ZM6 6.75a.75.75 0 0 0-.75.75v3c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75v-3A.75.75 0 0 0 9 6.75H6Z"
                                            clipRule="evenodd"
                                        />
                                        <path d="M18.75 6.75h1.875c.621 0 1.125.504 1.125 1.125V18a1.5 1.5 0 0 1-3 0V6.75Z" />
                                    </svg>
                                </div>
                                <div>Posts</div>
                            </Link>
                            <Link
                                className="w-fit h-[50px] flex flex-row items-center justify-start gap-1 text-white font-bold transition duration-700 ease-in-out bg-slate-600 hover:bg-slate-500 rounded-lg px-2 py-1"
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
                                            d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <div>Albums</div>
                            </Link>
                            <Link
                                className="w-fit h-[50px] flex flex-row items-center justify-start gap-1 text-white font-bold transition duration-700 ease-in-out bg-slate-600 hover:bg-slate-500 rounded-lg px-2 py-1"
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
