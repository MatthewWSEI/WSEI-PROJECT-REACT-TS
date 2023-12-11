import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserType } from "../../types/UserType";
import { getUsers } from "../../services/useUsers";

const Users = () => {
    const [users, setUsers] = useState<UserType[]>([]);

    const [isLoading, setLoading] = useState<boolean>(false);

    const onSuccessUsers = (data: UserType[]) => {
        setUsers(data);
    };

    const onError = (data: unknown) => {
        console.log(data);
    };

    useEffect(() => {
        if (!isLoading) {
            getUsers(onSuccessUsers, onError);
            setLoading(true);
        }
    }, [users, isLoading]);

    return (
        <>
            {!isLoading || users.length <= 0 ? (
                <div className="w-full h-[100px] bg-slate-700 rounded-lg py-[10px] px-[20px] ring-slate-900/5 shadow-lg text-white flex justify-center items-center">
                    Loading...
                </div>
            ) : (
                users &&
                users.map((user) => (
                    <div
                        className="postContainer postsList postContainer__sb bg-slate-700"
                        key={user.id}
                    >
                        <div className="texts">
                            <div className="w-full flex flex-row items-start text-white gap-1">
                                <div>img</div>
                                <div>{user.name}</div>
                            </div>
                            <h1 className="text-xl">
                                UserName: {user.username}
                            </h1>
                            <p className="text-slate-400">{user.email}</p>
                        </div>
                        <Link
                            className="link hover:bg-slate-600"
                            to={`/User/${user.id}`}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-5 h-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                                />
                            </svg>
                        </Link>
                    </div>
                ))
            )}
        </>
    );
};

export default Users;
