import { AlbumDisplay } from "./AlbumDisplay";
import { api, HydrateClient } from "~/clients/api.client";

export const Home = async () => {
  const data = await api.photo.getAlbums();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Nick&apos;s <span className="text-[hsl(280,100%,70%)]">LT Showcase</span>
          </h1>
          <AlbumDisplay albums={data.albums!} />
        </div>
      </main>
    </HydrateClient>
  );
}
