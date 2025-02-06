"use client";

import { useState } from "react";
import { type IAlbum } from "~/core/photo/photo.model";
import { Carousel } from "~/ui/carousel";
import Image from "next/image";

interface AlbumDisplayProps {
  albums: IAlbum[];
}

export const AlbumDisplay = ({ albums }: AlbumDisplayProps) => {
  const [selectedAlbum, setSelectedAlbum] = useState<IAlbum | null>(null);

  const handleAlbumClick = (album: IAlbum) => {
    setSelectedAlbum(album);
  };

  if (selectedAlbum) {
    const slides = selectedAlbum.photos.map((photo) => ({
      title: photo.title,
      button: "Go To Link",
      src: photo.url,
    }));

    return (
      <div className="w-full max-w-4xl mx-auto z-10 px-16 h-[85vh] flex flex-col pt-4">
        <button
          onClick={() => setSelectedAlbum(null)}
          className="mb-4 px-4 py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
        >
          ← Back to Albums
        </button>
        <div className="flex-1 min-h-0 relative">
          <div className="absolute inset-0 flex items-center justify-center pb-20">
            <div className="w-full h-[50vh]">
              <Carousel slides={slides} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
      {albums.map((album) => (
            <div
            key={album.albumId}
            onClick={() => handleAlbumClick(album)}
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20 z-10 cursor-pointer"
          >
            <h3 className="text-2xl font-bold">
                Album {album.albumId}
            </h3>
            <div className="text-lg">
                {album.photos.length} photos
            </div>
            <Image
            height={200}
            width={200}
            className="rounded-md h-48 w-full object-cover"
                src={album.photos[0]?.url ?? ""}
                alt={album.photos[0]?.title ?? ""}
              />
            </div>
        ))}
    </div>
  );
};
