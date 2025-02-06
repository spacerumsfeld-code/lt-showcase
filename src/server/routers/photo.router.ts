import { TRPCError } from "@trpc/server";
import { photoService } from "~/core/photo/photo.service";
import { createTRPCRouter, publicProcedure } from "~/server/_internals/trpc";
import { handleAsync } from '~/utils/async'

export const photoRouter = createTRPCRouter({
  getAlbums: publicProcedure
    .query(async () => {
      const [albums, getAlbumsError] = await handleAsync(
        photoService.getAlbums()
      )
      if (getAlbumsError) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch albums",
        });
      }

      return {
        albums,
      };
    }),
});
