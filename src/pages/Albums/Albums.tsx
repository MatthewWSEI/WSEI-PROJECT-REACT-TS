import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import { AlbumType } from "../../types/AlbumType";
import { PhotoType } from "../../types/PhotoType";
import { UserType } from "../../types/UserType";
import { getAlbums } from "../../services/useAlbums";
import { getPhotos } from "../../services/usePhotos";
import { getUsers } from "../../services/useUsers";
import AlbumCard from "../../components/AlbumCard";

const Albums = () => {
    const [searchText, setSearchText] = useState<string>("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setSearchText(event.target.value);
    };

    const [data, setData] = useState<{
        albums: AlbumType[];
        photos: PhotoType[];
        users: UserType[];
    }>({ albums: [], photos: [], users: [] });

    const filteredAlbums = data.albums.filter((album) =>
        album.title.toLowerCase().includes(searchText.toLowerCase()),
    );

    const [isLoading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (isLoading) {
            setLoading(true);
            Promise.all([getAlbums(), getPhotos(), getUsers()])
                .then(([albums, photos, users]) => {
                    setData({ albums, photos, users });
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                    setLoading(false);
                });
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
                    to="/Album/NewAlbum"
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
                    {filteredAlbums.map((album) => (
                        <AlbumCard key={album.id} album={album} data={data} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Albums;
