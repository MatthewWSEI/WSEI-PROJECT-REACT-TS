import React from "react";
import { UserType } from "../types/UserType";
import { Link } from "react-router-dom";

type UserCardProps = {
    user: UserType;
    show: boolean;
};

const UserCard: React.FC<UserCardProps> = ({ user, show }) => {
    return (
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
            {show ? (
                <div className="w-full h-[50px] my-1">
                    <Link
                        className="w-fit h-full flex flex-row items-center justify-start gap-1 text-white font-bold transition duration-700 ease-in-out bg-slate-600 hover:bg-slate-500 rounded-lg px-2 py-1"
                        to={`/User/${user.id}`}
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
                                    d="M7.5 3.75A1.5 1.5 0 0 0 6 5.25v13.5a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5V15a.75.75 0 0 1 1.5 0v3.75a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V5.25a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3V9A.75.75 0 0 1 15 9V5.25a1.5 1.5 0 0 0-1.5-1.5h-6Zm10.72 4.72a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06l1.72-1.72H9a.75.75 0 0 1 0-1.5h10.94l-1.72-1.72a.75.75 0 0 1 0-1.06Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <div>Show</div>
                    </Link>
                </div>
            ) : null}
        </div>
    );
};

export default UserCard;
