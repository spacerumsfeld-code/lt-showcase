import { describe, it, expect, vi } from 'vitest';
import { createTRPCContext } from '~/server/_internals/trpc';
import { createCaller } from '~/server/root';
import { photoService } from '~/core/photo/photo.service';

vi.mock('~/core/photo/photo.service', () => ({
  photoService: {
    getAlbums: vi.fn(),
  },
}));

const mockAlbums = [
  {
    albumId: 2,
    photos: [
      {
        photoId: 1,
        url: "https://example.com/photo1.jpg",
        albumId: 2,
        title: "Test Photo 1"
      }
    ]
  },
  {
    albumId: 1,
    photos: [
      {
        photoId: 2,
        url: "https://example.com/photo2.jpg",
        albumId: 1,
        title: "Test Photo 2"
      }
    ]
  }
];

describe('Photo Router', () => {
  it('should get and sort albums', async () => {
    // Assemble
    const ctx = await createTRPCContext({ headers: new Headers() });
    const caller = createCaller(ctx);

    vi.mocked(photoService.getAlbums).mockResolvedValueOnce(mockAlbums);

    // Act
    const result = await caller.photo.getAlbums();

    // Assert
    expect(result.albums).toBeDefined();
    expect(result.albums).toHaveLength(2);
    expect(result.albums[0]?.albumId).toBe(1);
    expect(result.albums[1]?.albumId).toBe(2);
    expect(photoService.getAlbums).toHaveBeenCalledTimes(1);
  });

  it('should handle service errors', async () => {
    const ctx = await createTRPCContext({ headers: new Headers() });
    const caller = createCaller(ctx);

    vi.mocked(photoService.getAlbums).mockRejectedValueOnce(new Error('Service error'));

    await expect(caller.photo.getAlbums()).rejects.toThrow('Failed to fetch albums');
  });
});