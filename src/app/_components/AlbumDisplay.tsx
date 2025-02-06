"use client";

import { useState } from "react";
import { type IAlbum } from "~/core/photo/photo.model";
import { Carousel } from "~/ui/carousel";
import Image from "next/image";
import { useDebounce } from "~/hooks/use-debounce.hook";

interface AlbumDisplayProps {
  albums: IAlbum[];
}

export const AlbumDisplay = ({ albums }: AlbumDisplayProps) => {
  const [selectedAlbum, setSelectedAlbum] = useState<IAlbum | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const debouncedSearch = useDebounce(activeSearch, 300);

  const handleAlbumClick = (album: IAlbum) => {
    setSelectedAlbum(album);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveSearch(searchTerm);
  };

  const filteredAlbums = albums.map(album => ({
    ...album,
    photos: album.photos.filter(photo => 
      photo.title.toLowerCase().includes(debouncedSearch.toLowerCase())
    )
  })).filter(album => album.photos.length > 0);

  if (selectedAlbum) {
    const slides = selectedAlbum.photos
      .filter(photo => 
        photo.title.toLowerCase().includes(debouncedSearch.toLowerCase())
      )
      .map((photo) => ({
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
              {slides.length > 0 ? (
                <Carousel slides={slides} />
              ) : (
                <div className="flex items-center justify-center h-full bg-white/10 rounded-lg">
                  <p className="text-white/70">No photos found matching your search</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <form onSubmit={handleSearch} className="flex gap-2 w-full max-w-md mb-8 z-10">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search photos..."
          className="flex-1 px-4 py-2 bg-white/10 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
        <button
          type="submit"
          className="px-4 py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
        >
          Search
        </button>
      </form>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
        {filteredAlbums.length > 0 ? (
          filteredAlbums.map((album) => (
            <div
              key={album.albumId}
              onClick={() => handleAlbumClick(album)}
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20 z-10 cursor-pointer"
            >
              <h3 className="text-2xl font-bold">Album {album.albumId}</h3>
              <div className="text-lg">{album.photos.length} photos</div>
              <Image
                height={200}
                width={200}
                className="rounded-md h-48 w-full object-cover"
                src={album.photos[0]?.url ?? ""}
                alt={album.photos[0]?.title ?? ""}
              />
            </div>
          ))
        ) : (
          <div className="col-span-full flex items-center justify-center h-48 bg-white/10 rounded-lg">
            <p className="text-white/70">No albums found matching your search</p>
          </div>
        )}
      </div>
    </>
  );
};
