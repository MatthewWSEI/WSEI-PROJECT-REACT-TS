import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AlbumType } from "../../../types/AlbumType";
import { PhotoType } from "../../../types/PhotoType";
import { UserType } from "../../../types/UserType";
import { getAlbum } from "../../../services/useAlbums";
import { getUsers } from "../../../services/useUsers";
import { getPhotos } from "../../../services/usePhotos";
import Loading from "../../../components/Loading";

type MyParams = {
    id: "";
};

interface CustomImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    className?: string;
}

const CustomImage: React.FC<CustomImageProps> = ({ src, className, ...props }) => (
    <img src={src} className={className} {...props} />
);

const Album = () => {
    const { id } = useParams<MyParams>();
    const numberId = Number(id);

    const [data, setData] = useState<{
        album: AlbumType;
        users: UserType[];
        photos: PhotoType[];
    }>({
        album: { userId: null, id: null, title: "" },
        users: [],
        photos: [],
    });

    const [isLoading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (isLoading) {
            setLoading(true);
            Promise.all([getAlbum(numberId), getUsers(), getPhotos()])
                .then(([album, users, photos]) => {
                    setData({ album, users, photos });
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [isLoading, numberId]);

    const getUser = data.users.filter((user) => user.id === data.album.id);

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <div className="post postContainer__fs bg-slate-700">
                    <div className="w-full h-[50px] flex flex-row justify-between items-center mb-2">
                        <Link
                            className="w-auto flex flex-row items-center gap-1"
                            to={`/User/${data.album.userId}`}
                        >
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
                            <div>{getUser.map((user) => user.name)}</div>
                        </Link>
                    </div>
                    <div className="w-full py-[10px]">
                        <label>
                            <p>Title:</p>
                            <div className="text-slate-400">{data.album.title}</div>
                        </label>
                    </div>
                    <span>Comments:</span>
                    <div className="gallery">
                        {data.photos
                            .filter((photo) => photo.albumId === numberId)
                            .map((e) => (
                                <div
                                    key={e.id}
                                    className=" bg-slate-600 rounded-lg py-[10px] px-[20px]"
                                >
                                    <div className="w-full h-[50px]">{e.title}</div>
                                    <CustomImage src={e.url} className="" />
                                </div>
                            ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default Album;
