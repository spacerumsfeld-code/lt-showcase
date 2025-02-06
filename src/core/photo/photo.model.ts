export interface IAlbum {
    albumId: number;
    photos: IPhoto[];
}

export interface IPhoto {
    photoId: number;
    url: string;
    albumId: number;
    title: string;
}
