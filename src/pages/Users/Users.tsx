import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserType } from "../../types/UserType";
import { getUsers } from "../../services/useUsers";

const Users = () => {
    const [users, setUsers] = useState<UserType[]>([]);

    const [isLoading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            if (isLoading) {
                setLoading(true);

                try {
                    const userData = await getUsers();
                    setUsers(userData);
                } catch (error) {
                    console.error(error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchData();
    }, [isLoading]);

    return (
        <>
            {isLoading ? (
                <div className="w-full h-[100px] bg-slate-700 rounded-lg py-[10px] px-[20px] ring-slate-900/5 shadow-lg text-white flex justify-center items-center">
                    Loading...
                </div>
            ) : (
                users.map((user) => (
                    <div className="post postFlex postContainer__sb bg-slate-700" key={user.id}>
                        <div className="texts">
                            <div className="w-full flex flex-row items-start text-white gap-1">
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
                                <div>{user.name}</div>
                            </div>
                            <div className="w-full flex flex-col items-start justify-start text-white gap-1 px-[20px] py-[10px]">
                                <h1 className="text-2xl">Username: {user.username}</h1>
                                <p className="text-slate-400">Emial: {user.email}</p>
                            </div>
                        </div>
                        <Link
                            className="link bg-slate-600 hover:bg-slate-500"
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
