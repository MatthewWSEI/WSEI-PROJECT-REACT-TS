import AlbumCard from "./AlbumCard";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import { useEffect, useState } from "react";
import { AlbumType } from "../types/AlbumType";
import { PhotoType } from "../types/PhotoType";
import { UserType } from "../types/UserType";
import { getAlbums } from "../services/useAlbums";
import { getPhotos } from "../services/usePhotos";
import { getUsers } from "../services/useUsers";

type MyParams = {
    id: "";
};

const UserAlbumsList = () => {
    const { id } = useParams<MyParams>();
    const numberId = Number(id);
    const [isLoading, setLoading] = useState<boolean>(true);

    const [data, setData] = useState<{
        albums: AlbumType[];
        photos: PhotoType[];
        users: UserType[] | UserType;
    }>({ albums: [], photos: [], users: [] });

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
    }, [isLoading, numberId]);

    const filteredAlbums = data.albums.filter((album) => album.userId === numberId);

    return (
        <div>
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

export default UserAlbumsList;
