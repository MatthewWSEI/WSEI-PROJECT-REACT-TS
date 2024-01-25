import { useState, useEffect, ChangeEvent, useRef } from "react";
import { Link } from "react-router-dom";
import { UserType } from "../../types/UserType";
import { getUsers } from "../../services/useUsers";
import Loading from "../../components/Loading";
import UserCard from "../../components/UserCard";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addUser } from "../../store/actions";

interface State {
    users: UserType[];
}

const Users = () => {
    const globalState = useSelector((state: State) => state);
    const dispatch = useDispatch();

    const [searchText, setSearchText] = useState<string>("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setSearchText(event.target.value);
    };

    // const [users, setUsers] = useState<UserType[]>([]);

    const [isLoading, setLoading] = useState<boolean>(true);

    const filteredUsers = globalState.users.filter((user) =>
        user.name.toLowerCase().includes(searchText.toLowerCase()),
    );

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
        const fetchData = async () => {
            if (isLoading && globalState.users.length === 0) {
                setLoading(true);
                try {
                    const usersData = await getUsers();
                    const userAlreadyExists = usersData.some(
                        (user: UserType) => user.id === initialUser.id,
                    );

                    const newUserTab: UserType[] = userAlreadyExists
                        ? usersData
                        : [...usersData, initialUser];

                    // setUsers(userData);
                    dispatch(addUser(newUserTab));
                } catch (error) {
                    console.error(error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchData();
        // if (!isLoading) {
        //     console.log(globalState);
        // }
        if (globalState.users.length !== 0) {
            setLoading(false);
        }
    }, [isLoading]);

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
            <div className="w-full h-[50px] flex justify-start mb-1">
                <Link
                    className="w-fit flex flex-row items-center justify-start gap-1 text-white font-bold transition duration-700 ease-in-out bg-slate-600 hover:bg-slate-500 rounded-lg px-2 py-1"
                    to="/User/NewUser"
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
                    {filteredUsers.map((user) => (
                        <UserCard key={user.id} user={user} show={true} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Users;
