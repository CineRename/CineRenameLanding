import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'CineRename — Media Renamer & Library Organizer',
    short_name: 'CineRename',
    description:
      'Fast, local-first media renamer and organizer for movies, TV shows, anime and subtitles. Compatible with Plex, Jellyfin and Emby.',
    start_url: '/',
    display: 'standalone',
    background_color: '#090a0f',
    theme_color: '#F97316',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/favicon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  };
}
