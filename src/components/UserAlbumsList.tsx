import AlbumCard from "./AlbumCard";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import { useEffect, useState } from "react";
import { AlbumType } from "../types/AlbumType";
import { PhotoType } from "../types/PhotoType";
import { UserType } from "../types/UserType";
import { getAlbums } from "../services/useAlbums";
import { getPhotos } from "../services/usePhotos";
import { getUser } from "../services/useUsers";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

type MyParams = {
    id: "";
};

const UserAlbumsList = () => {
    const globalState = useSelector((state: State) => state);
    const dispatch = useDispatch();
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
            Promise.all([getAlbums(), getPhotos(), getUser(numberId)])
                .then(([albums, photos, users]) => {
                    setData({ albums, photos, users });
                })
                .catch((error) => {
                    const foundAlbums = globalState.albums.filter(
                        (album: AlbumType) => album.userId === numberId,
                    );
                    // const foundPhotos = globalState.albums.filter(
                    //     (album: PhotoType) => album.albumId === data.al,
                    // );
                    const foundUser = globalState.users.find(
                        (user: UserType) => user.id === numberId,
                    );
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
